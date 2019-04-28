let http = require('http');
let path = require('path')
let url = require('url')
let fs = require('fs');
let zlib = require('zlib');
let mime = require('mime');
let {promisify} = require('util')
let stat = promisify(fs.stat);

/**
 * 客户端向服务器发送请求的时候，会通过 Accept-Encoding 告诉服务器我支持的解压缩格式
 * Accept-Encoding: gzip, deflate, br
 */
http.createServer(request).listen(8080);

async function request (req,res){
    console.log(req.url);
    let {pathname} = url.parse(req.url)
    let filepath = path.join(__dirname,pathname);
    try{
        let statObj = await stat(filepath);
        res.setHeader('Content-Type',mime.getType(pathname));
        //为了兼容不同的浏览器 node把所有请求头转小写
        let acceptEncoding = req.headers['accept-encoding'];
        //内容协商
        if(acceptEncoding){
            if(acceptEncoding.match(/\bgzip\b/)){
                //服务器告诉客户端，用什么压缩方法压缩
                res.setHeader('Content-Encoding','gzip');
                fs.createReadStream(filepath).pipe(zlib.createGzip()).pipe(res);
            }else if(acceptEncoding.match(/\bdeflate\b/)) {
                res.setHeader('Content-Encoding','deflate');
                fs.createReadStream(filepath).pipe(zlib.createDeflate()).pipe(res);
            }else {
               fs.createReadStream(filepath).pipe(res); 
            }
        } else {
            fs.createReadStream(filepath).pipe(res);
        }
    } catch(e) {
        res.statusCode = 404;
        res.end()
    }
}