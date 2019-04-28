let zlib = require('zlib');
let str = 'hello';

//一万个0
zlib.gzip(str,(error,buffer) => {
    console.log(buffer.length);
    zlib.unzip(buffer,(err,data)=>{
        console.log(data.toString())
    });
})