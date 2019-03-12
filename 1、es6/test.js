function Promise (task) {
    let that = this;
    that.status = 'pending';
    that.value = undefined;
    that.onResolvedCallbacks = [];
    that.onRejectedCallbacks = [];

    function resolve(value) {
        that.status = 'fulfilled';
        that.value = value;
        that.onResolvedCallbacks.forEach(item => item(value));
    }

    function reject(value) {
        that.status = 'rejected';
        that.value = value;
        that.onRejectedCallbacks.forEach(item => item(value));
    }

    try {
        task(resolve,reject);
    } catch(e) {
        reject(e);
    }
}

Promise.prototype.then = function(onFulfilled,onReject) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value) {return value};
    onFulfilled = typeof onReject === 'function' ? onReject : function(value) {return value};

    let that = this;
    let promise2;

    if(that.status === 'fulfilled'){
        promise2 = new Promise(function(resolve,reject){
            let x = onFulfilled(that.value);
            resolvePromise(promise2,x,resolve,reject);
        });
    }

    if(that.status === 'rejected'){
        promise2 = new Promise(function(resolve,reject){
            let x = onReject(that.value);
            resolvePromise(promise2,x,resolve,reject);
        });
    }

    if(that.status === 'pending'){
        promise2 = new Promise(function(resolve,reject){
            that.onResolvedCallbacks.push(
                function(value) {
                    let x = onFulfilled(that.value);
                    resolvePromise(promise2,x,resolve,reject);
                }
            );
            that.onRejectedCallbacks.push(
                function(value) {
                    let x = onReject(that.value);
                    resolvePromise(promise2,x,resolve,reject);
                }
            );
        });
    }

    return promise2;
}

function resolvePromise(promise2,x,resolve,reject) {
    let then;
    if(promise2 === x){
        throw new Error('循环引用');
    } 
    if(x instanceof Promise){
        if(x.status === 'pending'){
            x.then(function(y){
              resolvePromise(promise2,y,resolve,reject);   
            },reject);
        } else if(x.status === 'fulfilled') {
            resolve(x.value);
        } else if(x.status === 'rejected') {
            reject(x.value);
        }
    }
    if(typeof x == 'object' || typeof x == 'function'){
        try {
            then = x.then;
            if(typeof then === 'function'){
                then.call(x,function(y){
                    resolvePromise(promise2,y,resolve,reject);
                },function(y){
                    reject(y);
                })
            }

        } catch(e) {
            reject(e);
        }
    } else {
        resolve(x);
    }
}