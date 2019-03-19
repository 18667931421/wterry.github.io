/** 
 * 箭头函数
 * 1、声明函数的更简单的方法
 *  如果有且只有一个参数，可以省略小括号
 *  如果只有返回值，没有函数体代码，则可以省略{}
*/

// 箭头函数没有自己的this，会使用上层的this
// let obj = {
//     name:'zfpx',
//     getName() {
//         setTimeout(function(){
//             console.log(this.name)
//         },1000)
//     }
// }

let obj = {
    name:'zfpx',
    getName() {
        setTimeout(()=>{
            console.log(this.name)
        },1000)
    }
}

obj.getName()

//箭头函数的this是定死的，指向外层的this
//箭头函数虽然好，但不能应用到所有的情况 
let obj8 = {
    name:'er',
    getName:()=>{
        console.log(this.name);//此时的this指向最外层的，因为此时这个函数的外层不是一个函数作用域
    }
}

let obj9 = {
    name:'9',
    gn:obj8.getName()
}

console.log('9090',obj8.getName())