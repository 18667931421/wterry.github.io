let fs = require('fs');
let rs = fs.createReadStream('./1.txt',{
    start:0,
    highWaterMark:3
});

//暂停模式
//在真实的情况下，当可读流创建后会立刻进入暂停模式，其实会立刻填充缓冲区
//缓存区大小是可以看到的
rs.on('readable',function(){
    console.log(rs._readableState.length);
    let char = rs.read(1);
    console.log(char);
    console.log(rs._readableState.length);
    setTimeout(()=>{
        console.log(rs._readableState.length);
    },500)
})