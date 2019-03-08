
let name ='terry',age='12';
let desc = "${name} 今年 ${age}岁";

function replace(desc) {
    return desc.replace(/\$\{([^}]+)\}/g,function(matched,key){
        console.log(arguments);
        console.log(matched);
        console.log(key);
        return eval(key);
    })
}
console.log(replace(desc));