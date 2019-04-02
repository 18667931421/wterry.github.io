let fs = require('fs');

let from = fs.createReadStream('./1.txt');
let to = fs.createWriteStream('./2.txt');

from.pipe(to);

setTimeout(()=>{
    console.log('关闭向2.txt的写入');
    from.unpipe(to);
    console.log('手工关闭文件流');
    to.end();
},1000);