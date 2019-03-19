/**
 * global 全局对象
 * windows里也有全局对象，但是不能直接访问，我们在浏览器里访问global是通过window实现的
 * 1、global的变量都是全局变量
 * 2、所有的全局变量都是global的属性
 * 
 * process 当前进程
 */

//console.log(global);

// chdir 改变当前目录
console.log(process.cwd()); //显示当前目录
//process.chdir('..');

//{ rss: 23965696, 常驻内存                                                                                                                                             
//  heapTotal: 7159808, 堆内存的总申请量                                                                                                                                      
//  heapUsed: 4447072, //已经使用的两                                                                                                                                  
//  external: 8224 }  //外部内存使用量
console.log(process.memoryUsage());