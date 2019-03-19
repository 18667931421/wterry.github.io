// 执行上下文环境栈
// 私有闭包 this 参数
// 私有变量 上级作用域

function one() {
        two();
    console.log(1);
    let a = 'a';
    function two(){
        three();
        console.log(2);
        let b = 'b';
        function three(){
            let c = 'c';
            //console.log(a);
            console.log(3);
        }
    }
}

one();