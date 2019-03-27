/** 可写流
 * 可以往里面写
 * 当你往可写流写数据的时候，不会立刻写入文件的，而是会先写入缓冲区，缓冲区
 * 的大小就是highWaterMark，默认值是16k,
 * 然后等缓存区满流后，真正写入文件
 */
let fs = require('fs');

let ws = fs.createWriteStream('./2.txt',{
    flags:'w',
    mode:0o666,
    start:0,
    highWaterMark:3,
});
//如果缓冲区已满，返回false,如果未满true
//如果能接着写返回true，如果不能写返回false
//如果返回false，就不能接着写，如果真写了，数据也不会丢失
//会缓存在内存里，等缓存区清空，再从内存读出来
let flag = ws.write('1');
console.log(flag);
flag = ws.write('2')
console.log(flag);
flag = ws.write('3')
console.log(flag);
flag = ws.write('4')
console.log(flag);
