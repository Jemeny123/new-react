//安装mysql npm i mysql
//引入模块
const mysql = require('mysql');

//创建连接池
var pool = mysql.createPool({
    host: 'localhost',//主机名
    user: 'root',//登陆数据库用户名
    password: 'root',//登陆数据库的密码
    port: 3306,//端口号
    database: 'db1911',//数据库名称
    multipleStatements: true //连接池
});

//写查询语句
// let sql = 'SELECT * FROM userinf';
// pool.query(sql, (err, data) => {
//     // if (err) {
//     //     console.log(err);
//     //     return;//如果有错误就不再实行后面的代码
//     // }
//     if (err) throw err;//抛出异常
//     console.log(data);//[{},{}]
// });

//封装查询mysql的模块导出，谁想用再调用即可

function query(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, data) => {
            if (err) reject(err);//有错误就调用失败的回调
            resolve(data);//成功的回调
        });
    });
}

// let sql = "SELECT * FROM userinf WHERE name = '杨过'";
// let p = query(sql);
// console.log(p);
// p.then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// })

module.exports = query;//导出模块