let fs = require('fs');
let EventEmitter = require('events');
class WriteStream extends EventEmitter{
    constructor(path, options){
        super(path, options);
        this.flags = options.flags || 'w';
        this.path = path;
        this.mode = options.mode || 0o666;
        this.start = options.start || 0;
        this.buffers = [];
        this.pos = this.start; //文件的写入索引
        this.encoding = options.encoding || 'utf-8';
        this.autoClose = options.autoClose;
        this.highWaterMark = options.highWaterMark || 16 * 1024;

        this.writing = false; //表示内部正在写入数据
        this.length = 0;//表示缓存区字节的长度
        this.open();
    }

    open(){
        fs.open(this.path,this.flags,this.mode,(err,fd) => {
            if(err) {
                if(this.autoClose){
                    this.destroy();
                }
                this.emit('error',err);
            }
            this.fd = fd;
        });
    }

    //如果底层已经在写入数据，则必须当前要写入的数据放到缓存区
    write(chunk,encoding,cb){
            let len = chunk.length;
            //缓冲区的长度加上当前写入的长度
            this.length += len;
        if(this.writing) { //表示正在向底层写数据，则当前数据必须放在缓存区里
            chunk = Buffer.isBuffer(chunk) ? chunk: Buffer.from(chunk,this.encoding);
            this.buffers.push({
                chunk,
                encoding,
                cb
            });
            //判断当前最新的缓存区大学是否小于最高水位线
            let ret = this.length < this.highWaterMark;

            return ret;
        } else { //直接调用底层的方法进行写入
            //底层写完当前数据后，要清空缓存区
            this.writing = true;
            this._write(thunk,encoding,()=>this.clearBuffer());
        }
    }

    _write(thunk,encoding,cb){
        if(typeof this.fd != 'number') {
            return this.once('open',()=>this._write(thunk,encoding,cb));
        }
        fs.write(this.fd,chunk,0,chunk.length,this.pos,(err,bytesWritten) => {
            if(err){
                if(this.autoClose){
                    this.destroy();
                    this.emit('error',err);
                }
            }
            this.pos += bytesWritten;
            //写入多少字节，缓存区要减少多少字节
            this.length -= bytesWritten;
            cb && cb();
        })
    }

    clearBuffer() {
        //取出缓存区的第一个字节
        let data = this.buffers.shift();
        if(data){
            this._write(data.chunk,data.encoding,()=>this.clearBuffer());
        } else {
            //  缓存区清空
            this.emit('drain');
            this.writing = false;
        }
    }

    destroy() {
        fs.close(this.fd,()=>{
            this.emit('close');
        })
    }
}

module.exports = WriteStream