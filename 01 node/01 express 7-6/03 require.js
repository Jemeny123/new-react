//引入模块，导入模块

let fn = require('./02 exports');

console.log(fn);

// fn();//调用show方法

// fn.sing();//调用obj对象里面的sing方法

fn.obj.sing();//调用对象里面的子对象obj的方法sing