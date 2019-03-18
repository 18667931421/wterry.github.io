/**
 * 生成器和迭代器
 * KOA的基础，也是现代异步解决方案async await的基础
 */

/**
 * read生成器，用来生成迭代器
 */
function read(books) {
    let index = 0;
    return {
        next(){
            let done  = index === books.length;
            let value = done ? undefined :books[index++];
            return {
                value,
                done
            }
        }
    };
}

//迭代器可以不停的调用next，得到一个结果(value,done);
//done为true表示取完了
//迭代器
let it = read(['js','node']);
let r1 = it.next();
let r2 = it.next();
console.log(r1);
console.log(r2);
// it有一个方法next ，每次调用一个next返回一个结果 {value,done}