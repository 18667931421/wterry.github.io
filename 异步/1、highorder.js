/**
 * 1、在js里函数是一等公民，可以作为函数的返回值，也可以作为函数的参数
 */

function isString(param){
    return Object.prototype.toString.call(param) == '[object String]';
}

function isArray(param){
    return Object.prototype.toString.call(param) == '[object Array]';
}

//函数可以作为返回值 
function isType(type){
    return function (param){
    return Object.prototype.toString.call(param) == `[object ${param}]`;
  }
}

//lodash after 指定一个函数被调用多少次才会被执行
function eat(){
    console.log('吃完了');
}

function after(times,fn){
    let count = 0;
    return function(){
        if(++count == times){
            fn();
        }
    }
}

let newEat = after(3,eat);
newEat();
newEat();
newEat();

console.log(isString("123"));