// // 1、默认参数 1
// // 1、必填项不填报错 2、有些参数不传可以有默认值

// function ajax(url=new Error('url不能为空'),method='Get',dataType='json') {
//     console.log(url,method,dataType)
// }

// console.log(ajax('/user'));

// //剩余操作符

// function sum(prefix,...rest){
//     // rest = [1,2,3,4]
//     //1、循环求和
//      let result = 0;
//     // rest.forEach(function(item){
//     //     result+=item;
//     // })

//     //reduce 计算 汇总 把一个数组中的一堆值计算出来一个值
   

//     return prefix + result;
// }

// // let arr4 = [1,2,3];
// //可以传一个参数，也可以传2个参数，
// //第二个参数是val
// // 上一次执行结果会成为下一次的val
// let result = arr4.reduce(function(val,item,index,origin){
//     // 当前值 当前元素 索引 原始数组
//     return val + item;
// })
// //reduce 从左往右算 reduceRight从右往左算

// console.log(result);
// console.log(sum('$',1,2,3,4));

// Array.prototype.reduce = function(reducer,initialVal){
//     for(let i=0;i<this.length;i++){
//         initialVal = reducer(initialVal,this[i]);
//     }
//     return initialVal;
// }
// // reduce实现
// let result1 = arr4.reduce(function(val,item){
//     return val+item;
// },0);

// console.log(result1);

//展开运算符

let arr5 = [1,2,3]
let arr6 = [4,5,6]

let arr7 = [].concat(arr5,arr6);
let arr8 = [...arr5,...arr6]

let obj3={};
let obj1={name:'we'};
let obj2={age:9}

//循环复制
// for(let key in obj1){
//     obj3[key] = obj1[key]
// }
// for(let key in obj2){
//     obj3[key] = obj2[key]
// }

// console.log(obj3)

// assign
// 1参数是target 后面是来源对象
//Object.assign(obj3,obj1,obj2)

// 对象的解构
obj3={...obj1,...obj2}
console.log(obj3)

// 深度拷贝
let obj5 = {name:'xx',home:{
    city:'beijing'
}}
let obj6={}
// obj6=Object.assign(obj6,obj5);
// console.log(obj6)

// Json.parse(JSON.stringify(obj5));

function clone(origin){
    let newObj ={};
    for(let key in origin){
        if(typeof origin[key] === 'object'){
           newObj[key] =  clone(origin[key]);
        } else {
            newObj[key] = origin[key];
        }
    }
    return newObj;
}

console.log(clone(obj5))