function read(){
    console.log(1);
    setTimeout(function(){
        console.log(2);
    });
    console.log(3);
}

read();

// 异步成功获取后放进循环队列里 js内存有限制1.7G

// 同步和异步关注的是消息的通知方式
// 阻塞和非阻塞的是等待结果时候的状态

// 同步异步由被调用房决定，他来决定是马上给你答案，还是回头再给
//阻塞非阻塞是➡️调用方来决定，中等待答案的过程，调用房是否可以做别的事情