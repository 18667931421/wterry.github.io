let fs = require('fs');
// fs.readFile('1.txt',function(err,data){
//     if(data[0] == 0xef && data[1] == 0xbb && data[2] == 0xbf){
//         data = data.slice(3);
//     }
//     console.log(data.toString());
// })
fs.rmdir('./d/c',(err,data) => {
    console.log(err);
})

//iconv 实现转码操作，把一个gbk编码的buffer转换为utf-8