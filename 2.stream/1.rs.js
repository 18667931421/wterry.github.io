/** 可读流
 * 
 */
let fs = require('fs');

//通过创建一个可度流 
let rs = fs.createReadStream('./1.txt',{
    flags:'r',//要对文件进行何种操作
    mode:0o666,
    encoding:'utf8',
    //唯一一个包括结束索引的
    start:3,end:8,//从索引为3的位置开始读，到索引为8的位置结束    
    highWaterMark:3 //缓冲区大小
});

//监听他的data事件，当你一旦监听data事件的时候，流就可以读文件的
//内容并且发射data

rs.on('open',function(){
    console.log('文件打开')
})

// rs.setEncoding('utf8');

//默认情况下，当监听data事件后，会不停读数据，触发data事件
//触发完data事件后会再次读取数据
//希望流有一个暂停和恢复触发的机制
rs.on('data',function(data){
    console.log(data);
    rs.pause(); //暂停读取和发射data事件
    setTimeout(function(){
        rs.resume();//恢复读取并且触发data事件
    },2000);
});

rs.on('error',function(){
    console.log('error');
})

rs.on('end',function(){
    console.log('读完了');
});

rs.on('close',function(){
    console.log('文件关闭');
});

