Array.prototype.filter = function(fn) {
    let newArray = [];
    for(let i=0;i<this.length;i++){
        let flag = fn(this[i]);
        flag && newArray.push(this[i]);
    }
    return newArray;
}

let arr1=[1,23,90,100,235]
let arr2 = arr1.filter(function(item){
    return item > 60;
});

console.log(arr2);