function EventEmitter(){
    this.events={}; //会把所有的事件监听函数放在这个对象里保存

}

// 给指定的事件绑定处理函数，1 参数是事件类型，2是事件监听函数。
EventEmitter.prototype.on = EventEmitter.prototype.addListener = 
    function(type, listener){
        if(this.events[type]){
            this.events[type].push(listener);
        } else {
            // 如果没有添加过事件的监听函数，则赋予一个数组
            this.events[type] = [listener];
        }
    }

    EventEmitter.prototype.emit = function(type,...rest) {
        this.events[type] && this.events[type].forEach(listener => {
            listener.apply(this,rest);
        });
    }

    EventEmitter.prototype.once = function(type,listener) {
        // 用完即焚
        let wrapper = (...rest) => {
            listener.apply(this,rest);
            this.removeListener(type,wrapper);
        }
        this.on(type,wrapper);
    }
    EventEmitter.prototype.removeListener = function(type,listener) {
        if(this.events[type]){
            this.events[type] = this.events[type].filter(l=>l!=listener)
        } 
    }


module.exports = EventEmitter;