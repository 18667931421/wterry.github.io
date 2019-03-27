let fs = require('fs');
let path = require('path');
/** 删除文件 fs.unlink
 * 删除文件夹 fs.rmdir这一定是一个空目录
 */
function rmdirSync(dir){
    let files = fs.readdirSync(dir);
    files.forEach(item => {
        let child = fs.statSync(path.join(dir,item));
        if(child.isDirectory()){
            rmdirSync(path.join(dir,item));
        } else {
            fs.unlinkSync(path.join(dir,item));
        }
    })
    fs.rmdirSync(dir);
}

//异步递归删除非空文件夹
function rmdir(dir){
    return new Promise(function(resolve,reject){
        fs.stat(dir,(err,stat)=>{
            if(stat.isDirectory()){
                fs.readdir(dir,(err,files) => { 
                    if(err) return reject(err);
                    Promise.all(files.map(item=>rmdir(path.join(dir,item)))).then(()=>{
                        console.log('-----');
                        fs.rmdir(dir,resolve);
                    });
                });
            } else {
                fs.unlink(dir,resolve);
            }
        })
        
        //先删除当前目录的子文件夹或者文件，再删除自己
    });
}
rmdirSync('d');