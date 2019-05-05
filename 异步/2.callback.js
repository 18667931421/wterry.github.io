let fs = require('fs');

/**
 * 回调的特点是error first
 * 调用回调的函数时候第一个参数是错误对象
 */
fs.readFile('./1.txt','utf-8',function(err,data){
    if(err){
        console.log(err);
    } else {
        console.log(data);
    }
});

/**
 * 回调函数的问题
 * 1、无法捕获错误 try catch return
 * 2、不能return
 * 3、回调地狱
 */

/**
 * 当你访问服务器的时候，比如请求一个HTML页面，比如是用户列表。服务器一方面会读取模板文件，可能是ejs pug jade handlebar，另一方面还要读取数据(
 * 可能放在文件里，也可以放在数据库里)
 */
fs.readFile('./template.txt','utf-8',function(err,template){
    fs.readFile('./data.txt','utf-8',function(err,data){
        console.log(template+data);
    })
})

//如何解决回调嵌套的问题
//1、通过实践发布订阅来实现
let EventEmitter = require('events');
let eve = new EventEmitter();
let html = {}
//监听数据获取成功事假 当实践发生之后调用回调函数
eve.on('ready',function(key,value){
    html[key] = value;
    if(Object.keys(html).length == 2){
        console.log(html);
    }
})
fs.readFile('./template.txt','utf-8',function(err,template){
    eve.emit('ready','template',template)
})

fs.readFile('./data.txt','utf-8',function(err,data){
    eve.emit('ready','data',data)
})


