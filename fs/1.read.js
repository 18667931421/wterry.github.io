/** 
 * fs 核心模块读写文件
 * 
 *   */

 let fs = require('fs');
 //flag你将要对这个文件进行哪一种操作
//  fs.readFile('./1.txt',{encoding:'utf-8',flag:'w'},function(err,data){
//      if(err){
//          console.error(err);
//      } else {
//          console.log(data);
//      }
//  });
// 666权限位
// chmod 7772.txt
//在要写入的字符串转成buffer二进制用的
// fs.writeFile('./2.txt','data',{encoding:'utf-8',flag:'a',
// mode:0o666},
// function(err){
//     console.log(err);
// });

// fs.appendFile('./2.txt','data',
// function(err){
//     console.log(err);
// });

//他们都是把文件当成一个整体来操作
//当文件特别大的，大于内寸的时候无法执行这样的操作
//需要精确的控制读取的字节
//file dispcriptor 文件描述符
// 0 标准输入
// 1 标准输出
// 2 错误输出

//标准输入
// process.stdin.on('data',function(data){
//     console.log(data);
// });

// //标准输出
// console.log('hello');
// process.stdout.write('hello');

// // 标准错误
// console.error();
// process.stderr.write('wrong')
//w 清空写入
fs.open('./2.txt','a',0o666,function(err,fd){
    // console.log(fd);
    // let buff = Buffer.alloc(4);
    // //fd描述符 buffer写入索引 从文件读取几个字节，文件的读取位置
    // fs.read(fd,buff,1,3,1,function(err,bytesRead){
    //     console.log(buff.toString());
    // });
    //offset length position
    //读取buffer偏移量 读三个字节 写入索引
    fs.write(fd,Buffer.from('珠峰'),3,3,6,function(err, bytesWritten){
        console.log(bytesWritten)
    }  );
});