// node亲生的模块，内置的模块放在了node.exe里
// 加载是最快的
let fs = require('fs')

//文件模块

/** 分为3种
 * 
 * js json node
 * 
 * 存放和加载的位置又分为两种
 * 第一种是自己写的，通过相对路径或者绝对路径驾照
 * 第二种是别人写的，要通过名字来调用，回去node_modules找
 */