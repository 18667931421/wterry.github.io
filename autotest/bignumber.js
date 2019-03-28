function getBigSum(numA,numB){
    numA = numA.split('');
    numB = numB.split('');
    let temp=0,res='';
    while(numA.length || numB.length){
        temp += ~~numA.pop() + ~~numB.pop();
        res = (temp % 10) + res;
        temp = temp > 9;
    }
    return res;
}

console.log(getBigSum('123','123'));