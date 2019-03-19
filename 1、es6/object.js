let obj1 = {age:1,
    getFood() {
        return '面包';
    }
};
let obj2 = {age:2};
let obj3 = {}
Object.setPrototypeOf(obj3,obj1);
//和如下等同的 obj3.__proto__ = obj1;
//设置obj3的原型为obj1
console.log(obj3.age)

let obj4 = {
    __proto__:obj1,
    getFood(){
        //super可以调用父亲的方法
        return '牛奶' + super.getFood();
    }
}