let http = require('http');

//如何向客户端写入响应信息
let server = http.createServer(function(req,res){
    //在一个方法里设置状态码，原因短语，响应头
    //会立刻向客户端写入,setHeader不会往客户端发
// 当调用writeHead或者第一次调用write会向客户端写入
    res.writeHead(200,'成功',{
        'Content-Type':'text/html;charset=utf-8'
    });
    // res.statusCode = 200; //设置响应码
    // res.sendDate = false; //响应头默认会设置，如果真的不想要可以设置为fasle
    // res.setHeader('Content-Type','text/html;charset=utf-8');
    // console.log(res.getHeader('Content-Type')); //获取响应头
    // res.removeHeader();
    // res.write('hello');
    // res.write('word');
    // res.end();
});
server.listen(8080); 