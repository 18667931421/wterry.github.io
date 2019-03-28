/**
 * 在node.js里通过require方法加载其他模块
 * 这个加载是同步的
 * 1、找到这个文件
 * 2、读取此文件的模块内容
 * 3、封装在一个函数里立刻执行
 * 4、把执行后的模块module.exports对象赋给school
 */

let school = require('./school');

console.log(school)
