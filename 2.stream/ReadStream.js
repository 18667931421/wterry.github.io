let EventEmitter = require('events');
let fs = require('fs');

class ReadStream extends EventEmitter{
    constructor(path, options){
        super(path, options);
        this.flags = options.flags || 'r';
        this.path = path;
        this.mode = options.mode || 0o666;
        this.start = options.start || 0;
        this.end = options.end;
        this.pos = this.start; //文件的写入索引
        this.encoding = options.encoding || 'utf-8';
        this.autoClose = options.autoClose;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.flowing = null;
        this.buffer = Buffer.alloc(this.highWaterMark);
        this.open();//打开文件读取

        //当给这个实列添加了任意的监听函数会触发newListener
        this.on('newListener',(type,listener)=>{
            //如果监听了data事件，流会自动切换到流动模式
            if(type == 'data'){
                this.flowing = true;
                this.read();
            }
        });
    }

    read() {
        if(typeof this.fd !== 'number'){
            return this.once('open',()=>{
                this.read();
            })
        }
        let howMuchToRead = this.end ? Math.min(this.end-this.pos+1,this.highWaterMark) : this.highWaterMark;
        //buffer并不是缓存区
        fs.read(this.fd,this.buffer,0,howMuchToRead,this.pos,(err,bytes) =>{ //bytes实际读到的字节数
            if(err){
                if(this.autoClose){
                    this.destroy();
                    return this.emit('error',err);
                }
            }
            if(bytes){
                let data = this.buffer.slice(0,bytes);
                this.pos += bytes;
                data = this.encoding ? data.toString(this.encoding) : data;
                this.emit('data',data);
                if(this.end && this.pos > this.end){
                    return this.endFn();
                } else {
                    if(this.flowing){
                    this.read();
                    }
                }
            } else {
                return this.endFn();
            }
        });
        
    }

    open() {
        fs.open(this.path,this.flags,this.mode,(err,fd)=>{
            if(err){
                if(this.autoClose){
                    this.destroy();
                    return this.emit('error',err);
                }
            }
            this.fd = fd;
            this.emit('open');
        });
    }



    destroy() {
        fs.close(this.fd,()=>{
            this.emit('close');
        });
    }

    endFn() {
        this.emit('end');
        this.destroy();
    }

    pipe(dest){
        this.on('data',(data)=>{
            let flag = dest.write(data);
            if(!flag) {
                this.pause();
            }
        });
        dest.on('drain',() =>{
            this.resume();
        })
    }

    //可读流会进入流动模式，当暂停的时候
    pause() {
        this.flowing = false;
    }

    resume() {
        this.flowing = true;
        this.read();
    }
}

module.exports = ReadStream