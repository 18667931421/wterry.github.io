// 只想知道路径，但又不想加载此模块
console.log(require.resolve('./school1.js'));

// main主要的，其实就是入口模块
console.log(require.main);

/** 
 * 在node里模块的类型有三种
 * 1、JS模块
 * 2、json模块
 *   先找文件，读取文件内容
 * 3、node c++扩展二进制模块
 *    属于二进制模块
 *  当require加载一个模块的时候，会先找user.js，如果还找不到
 *  ，会再着user.josn,如果还找不到会找user.node
 */
console.log(require.extensions);