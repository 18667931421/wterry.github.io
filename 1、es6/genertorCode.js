
/**
 * 生成器函数和普调函数不一样,返回迭代器
 * 执行的时候也不一样，
 * 生成器函数其实是内部生成了很多小函数
 */
function *read(books) {
    console.log('开始');
 for(let i=0;i< books.length;i++){
     //yield 放弃屈服 产出
     yield books[i]
 }
 console.log('结束');
}

let it  = read(['js','node']);
let r1 = it.next();
console.log(r1);
let r2 = it.next();
console.log(r2);
let r3 = it.next();
console.log(r3);
