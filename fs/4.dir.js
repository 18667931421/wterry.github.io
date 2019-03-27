//如何创建目录
let fs = require('fs');
// fs.mkdir('a',function(err){
//     console.log(err)
// })
// //判断一个文件或者目录  是否存在 fs.exist
// fs.access('a',fs.constants.R_OK,function(err){
//     console.log(err)
// ;});

//递归异步创建目录

function mkdirp(dir){
    let paths = dir.split('/');
    !function next(index){
        if(index > paths.length){
            return;
        };
        let current = paths.slice(0,index).join('/');
        console.log(current)   
        fs.access(current,fs.constants.R_OK,function (err){
            if(err){
                fs.mkdir(current,0o666,next.bind(null,index+1))
            }else {
                next(index+1);
            }
        });
    }(1);
}

mkdirp('a/b/c')