//构造函数的参数是一个异步任务
function Promise(task) {
    let that = this;
    that.status = 'pending'; //默认状态
    that.value = undefined; //此变量存放promise的结果
    that.onResolvedCallbacks = [];
    that.onRejectedCallbacks = [];
    //调用此方法可以把promise变成成功态
    //resolve的时候你把挣到的钱传进来
    function resolve(value) {
        if(value instanceof Promise){ 
            return value.then(resolve,reject);
        }
        if(that.status == 'pending'){
           that.status = 'fulfilled';
           that.value = value;
           that.onResolvedCallbacks.forEach(item=>item(value));
       } 
    }

    //调用此方法可以把promise变成失败态
    function reject(reason) {
        //如果当前状态是初始态，则改为失败态
       if(that.status == 'pending'){
           that.status = 'rejected';
           that.value = reason;
           that.onRejectedCallbacks.forEach(item=>item(reason));
       } 

    }
    //立即执行的任务
    try {
        task(resolve,reject); 
    } catch(e) {
        reject(e);
    }
}

function resolvePromise(promise2,x,resolve,reject){
    let then;
    if(x === promise2){
        return reject(new TypeError('循环引用'));
    }
    if(x instanceof Promise){
        if(x.status === 'pending'){
            x.then(function(y){
                resolvePromise(promise2,y,resolve,reject);
            },reject);
        } else if(x.status === 'fulfilled'){
            resolve(x.value);
        } else if(x.status === 'rejected'){
            reject(x.value);
        }   
    } else if(x!=null && (typeof x == 'object' || typeof x == 'function')){
        try {
            then = x.then; 
            if(typeof x == 'function'){
                then.call(x,function(y){
                    resolvePromise(promise2,y,resolve,reject);
                },function(y){
                    reject(y);
                });
            }
        } catch (e) {
            reject(e);
        }
    } else {
        resolve(x);
    }
}

// onFulfilled成功的回调，onReject失败的回调
Promise.prototype.then = function(onFulfilled,onReject){
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled:function(value){return value};
    onReject = typeof onReject == 'function' ? onReject:function(reason){throw reason};
    let that = this;
    let promise2;
    if(that.status == 'fulfilled'){
        promise2 = new Promise(function(resolve,reject) {
            let x = onFulfilled(that.value);
            //resolve(x);
            resolvePromise(promise2,x,resolve,reject);
        });
    }
    if(that.status == 'rejected'){
        promise2 = new Promise(function(resolve,reject) {
            let x =  onReject(that.value);
            resolvePromise(promise2,x,resolve,reject);
        });
    }
    if(that.status == 'pending'){
        promise2 = new Promise(function(resolve ,reject ){
        that.onResolvedCallbacks.push(function(value){
            let x = onFulfilled(value);
            resolvePromise(promise2,x,resolve,reject);
        });
        that.onRejectedCallbacks.push(function(value){
            let x =  onReject(value);
            resolvePromise(promise2,x,resolve,reject);
        });
        });
    }
    return promise2;
}

module.exports = Promise;