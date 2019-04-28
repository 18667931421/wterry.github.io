let net = require('net');
//创建一个服务器，监听客户端的连接，当客户端连接上来之后，
//执行监听函数；socket是一个双工流duplex，可读可写

let server = net.createServer(function(socket){
    console.log('客户端已经连接');
    console.log(socket.address());
    socket.on('data',function(data){
        console.log('接收到客户端发过来的数据：s% %s',data,1);
        socket.write('服务器缺人：' + data);
    });
    socket.on('error',function(err){
        console.log(err);
    })
});

server.listen(8080,function(){
    console.log(server.address());
    console.log('服务器启动成功');
});