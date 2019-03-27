let str = '珠峰';

let fs = require('fs');


fs.open('./2.txt','x',0o666,(err,fd) =>{
    //当我们调用write方法写入文件的时候，并不会直接写入物理文件，而是会先写入缓存区，再批量写入物理文件
    fs.write(fd,Buffer.from(str),0,3,null,(err,bytesWritten)=>{
        console.log(bytesWritten);
        //迫使操作系统立刻马上把缓存区的内容写入物理文件
        fs.fsync(fd,()=>{
            fs.close(fd,()=>{
                console.log('关闭文件');
            })
        }) 
    })
}) 