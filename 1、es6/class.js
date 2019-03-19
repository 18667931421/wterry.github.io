
/**
 *类里面可以定义构造函数,当创建一个类的实例的时候调用构造函数
 *
 * @class Parent
 */
class Parent {
    constructor(name){
        this.name = name; //实例的私有属性
    }
    // 实例的公有属性，也就是相当于原型上的属性
    getName() {
        console.log(this.name);
    }
}

class Child extends Parent {
    constructor(name,age) {
        super(name); //super指的是父类的构造函数
        this.age = age;
    }

    getAge() {
        console.log(this.age);
    }
}

let p = new Parent('zfpx');
p.getName();