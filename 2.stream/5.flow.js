let fs = require('fs');

let rs = fs.createReadStream('./1.txt',{
    highWaterMark:3
})

//流动模式不缓存，直接发射读取下次的数据。如果你用流动模式，
//而且美消费，数据就白白丢失
// rs.on('data',function(dtat){
//     console.log(data);
// })

// rs.on('end',function(){
//     console.log('end');
// });

//当监听readable事件，会进入暂停模式
//此时，可读流会马上向底层读取文件，然后把读到的文件放到缓存区
//
rs.on('readable',function(){
    //length是缓存区数据的大小
    console.log(rs._readableState.length);
    let ch = rs.read(1);//不加参数表示读取整个缓存区数据
    //读取一个字段，如果可读流发现你要读的字节小于等于缓存字节大小，则直接返回
    console.log(ch);
    console.log(rs._readableState.length);
    //当你读完指定的字节后，如果可读流发现剩下的字节已经比最高水位线小流，
    //则会立马再次读取填满 最高水位线
    setTimeout()
})

