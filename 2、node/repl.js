/**
 * 可以通过代码来进入repl创建一个repl环境
 */
let repl = require('repl')
let context = repl.start().context;
context.msg = 'hello';
context.hello = function() {
    console.log(context.msg);
}