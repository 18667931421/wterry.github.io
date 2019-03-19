//把标准输出流输出到文件
console.log(1);
console.info(1);
 
 // 错误输出2
 //把错误输出2重定向到标准输出1中
 // node console.js 1 > a.log 2>&1
console.warn(2);
console.error(2);

//用来统计两段代码之间执行时间的
console.time('const');
let i = 0;
while(i++<10000000){

}
console.timeEnd('const'); //输出时间差

//断言
//如果表达式为真的话就什么都不发生
//如果为假的话就什么也不发生
console.assert(1==2,'报错');

//列出对象的解构
console.dir()

//跟踪当前代码的调用栈
console.trace();