// // 分配一个长度为6哥字节的buffer
// // 会把所有的字节设置为0
// // 可以提供默认值
// let buf1 = Buffer.alloc(6,2);
// console.log(buf1);

// // 分配一块没有初始化的内存
// let buf2 = Buffer.allocUnsafe(6);
// console.log(buf2);

// let buf3 = Buffer.from('珠峰');
// console.log(buf3);

// let buf4 = Buffer.alloc(6);
// // console.log(buf4)
// // buf4.fill(3,1,3);
// // console.log(buf4)
// // 1写的字符串 2填充的开始索引 3字节长度 4编码
// buf4.write('珠峰',0,3,'utf-8');
// console.log(buf4.toString())
// buf4.write('峰',3,3,'utf-8');
// console.log(buf4.toString())
let buf5 = Buffer.alloc(6);
buf5.writeInt8(0,0);
buf5.writeInt8(16,1);
buf5.writeInt8(32,2);
console.log(buf5)

// bigEndian 大头在前
// little endian 小头在前
let buf6 = Buffer.alloc(4);
buf6.writeInt16BE(256,0);
console.log(buf6.toString())

//长度为6 每个值为1
let buf7 = Buffer.alloc(6,1);
let buf8 = buf7.slice(2,6); //浅拷贝
buf8.fill(4)
console.log(buf8);

/** string_decoder
 * 
 * 它的出现是为了解决乱码问题
 * 
 */
let buf9 = Buffer.from('珠峰培训');
let buf10 = buf9.slice(0,5);//5
let buf11 = buf9.slice(5);//7
let {StringDecoder} = require('string_decoder');

let sd = new StringDecoder();
//write 就是读取buffer内容，返回一个字符串
console.log(sd.write(buf10))

console.log(sd.write(buf11))



