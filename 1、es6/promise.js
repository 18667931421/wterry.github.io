/**
 * Promise 是一个类，可以创建一个实例
 * 代表承诺，什么时候会用到承诺，一般是异步任务，就是需要很长时间执行的
 */
let Promise1 = require('./PromiseCode');
// let p1 = new Promise(function(resolve,reject){
//     setTimeout(function(){
//         let num = Math.random();//生成一个随机数
//         if(num > 0.5) {
//             resolve('大');
//         } else {
//             reject('小');
//         }
//     },2000)
// });

// p1.then(function(value){
//     console.log('成功',value);
// },function(reason){
//    console.log('失败',reason);
// });

let p1 = new Promise1(function(resolve,reject){
    setTimeout(function() {
        resolve(100);
    }, 1000);
})

//成功回调后的值会被用来resolve当前的promise
//成功的回调里又返回一个新的promise
//成功的会调里返回的promise还不是我自己写的promise
//如果成功的回调里返回了一个promise，那么promise2要以promise的resolve结果来resolve自己
let p2 = p1.then(function(data) {

    return new Promise(function(resolve,reject){
            console.log(data)
        resolve(data+100);
    });
},function(err){
   return new Error(err+100); 
})

// let p2 = p1.then(function(data){
//     return data+100;
// },function(err){
//     console.log(err);
//     return new Error(err+100);
// });
p2.then(function(data){
    console.log('p2成功',data);
},function(err){
    console.log('p2失败',err);
});