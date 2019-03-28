let path = require('path');
let fs = require('fs');

function preDeep(dir,callback){
    console.log(dir);
    fs.readdir(dir,(err,files) => {
        !function next(i) {
            if(i >= files.length) return callback();
            let child = path.join(dir,files[i]);
            fs.stat(child,(err,stat)=>{
                if(stat.isDirectory()){
                    preDeep(child,()=>next(i+1));
                }else {
                    console.log(child);
                }
            })
        }(0)
    })
}