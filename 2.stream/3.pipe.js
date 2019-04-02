let fs = require('fs');

let ws = fs.createWriteStream('./2.txt');
let rs = fs.createReadStream('./1.txt');

// rs.on('data',function(data){
//     let flag = ws.write(data);
//     if(!flag) {
//         rs.pause();
//     }
// });

// ws.on('drain',function(){
//     rs.resume();
// })

// rs.on('end',function(){
//     ws.end();
// });
rs.pipe(ws);