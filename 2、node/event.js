/**
 * 非常重要的模块events
 * node是基于事件驱动的
 */
let EventEmitter = require('./events');
let util = require('util');
//继承类
function Bell() {
    EventEmitter.call(this); //私有属性
}

//进行原型继承 继承公用
util.inherits(Bell,EventEmitter);

let bell = new Bell();
function studentInClassroom(number,things){
    console.log(`学生带${number}进${things}教室`);
}

function masterInClassroom(number,things){
    console.log(`我带${number}进${things}教室`);
}
bell.on('响',studentInClassroom);
bell.once('响',masterInClassroom);

//第一个参数是事件类型，第二哥参数和以后的参数会传递给监听函数
bell.emit('响','301','数')