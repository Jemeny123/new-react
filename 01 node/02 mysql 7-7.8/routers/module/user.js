//子路由：用户信息管理
const express = require('express');
const Router = express.Router();//Router==app
//引入query方法进行数据库的查询
let query = require('../../db/mysql');
let tokenFn = require('./token');
// console.log(tokenFn);
/*
    用户管理：
        * 验证用户是否存在：存在就不给注册
        * 注册
        * 登陆：生成token
        * 查询gid叫xx的用户
        * 修改密码
        * 删除gid为xx的用户
        * 查询所有的用户
*/


//验证用户是否存在：get请求
// Router.get('/checkname', (req, res) => {
//     let { name } = req.query;//解构 es6
//     let sql = `SELECT * FROM userinf WHERE name = '${name}'`;
//     let p = query(sql);
//     p.then(data => {
//         // console.log(data);
//         let inf = {};
//         if (data.length) {
//             //已存在：不允许注册
//             inf = {
//                 code: 3000,
//                 flag: false,
//                 message: '用户已存在，不允许注册'
//             }
//         } else {
//             inf = {
//                 code: 2000,
//                 flag: true,
//                 message: '允许注册'
//             }
//         }
//         res.send(inf);
//     }).catch(err => {
//         console.log(err);
//         let inf = {
//             code: err.sqlState,
//             flag: false,
//             message: '查询失败'
//         }
//         res.send(inf);
//     })
//     // console.log(p);
//     // res.send(p);//响应数据给前端
// });

Router.get('/checkname', async (req, res) => {
    //async和await可以让我们用同步的写法实现异步的效果，await就是在等待结果
    try {
        let { name } = req.query;//解构 es6
        let sql = `SELECT * FROM userinf WHERE name = '${name}'`;
        let data = await query(sql);//[{}] await是用于等待成功返回的数据resolve()
        if (data.length) {
            //已存在：不允许注册
            inf = {
                code: 3000,
                flag: false,
                message: '用户已存在，不允许注册'
            }
        } else {
            inf = {
                code: 2000,
                flag: true,
                message: '允许注册'
            }
        }
        res.send(inf);

    } catch (err) {
        //捕获失败的回调:reject(err)
        let inf = {
            code: err.sqlState,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});

//注册功能: post请求
Router.post('/reg', async (req, res) => {
    try {
        let { name, psw } = req.body;//解构
        let sql = `INSERT INTO userinf(name,psw) VALUES('${name}','${psw}')`;
        let data = await query(sql);
        // console.log(data);
        let inf = {};
        if (data.affectedRows) {
            //注册成功
            inf = {
                code: 2000,
                flag: true,
                message: '注册成功'
            }
        } else {
            //注册失败
            inf = {
                code: 3000,
                flag: false,
                message: '注册失败'
            }
        }
        res.send(inf);//响应
    } catch (err) {
        let inf = {
            code: err.sqlState,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }

});

//登陆功能：get请求 http://localhost:8010/user/login
Router.get('/login', async (req, res) => {
    let inf = {};
    try {
        let { name, psw } = req.query;//解构
        // console.log(name, psw);
        let sql = `SELECT * FROM userinf WHERE name='${name}' AND psw='${psw}'`;
        let data = await query(sql);//[{}]
        // console.log(data);
        let token = tokenFn.create(psw);
        // console.log(token);
        if (data.length) {
            //登陆成功
            inf = {
                code: 2000,
                flag: true,
                message: '登陆成功',
                token //token:token Es6
            }
        } else {
            //登陆失败
            inf = {
                code: 3000,
                flag: false,
                message: '登陆失败'
            }
        }
        // res.send(inf);//响应
    } catch (err) {
        inf = {
            code: err.sqlState,
            flag: false,
            message: '查询失败'
        }

    }

    res.send(inf);
});

//校验token:get请求
Router.get('/verify', async (req, res) => {
    let inf = {};
    try {
        let { token } = req.query;//解构

        let res = tokenFn.verify(token);
        // console.log(token);
        if (res) {
            //校验通过:就允许进入购物车、个人中心
            inf = {
                code: 2000,
                flag: true,
                message: '校验通过'
            }
        } else {
            //校验失败:跳回登陆页:被改了，或过期了
            inf = {
                code: 3000,
                flag: false,
                message: '校验失败'
            }
        }
        // res.send(inf);//响应
    } catch (err) {
        inf = {
            code: 5000,
            flag: false,
            message: '校验失败' //失败：调用verify接口出错
        }

    }

    res.send(inf);
});

//查询gid叫xx的用户：get请求
Router.get('/getuser/:id', async (req, res) => {
    //async和await可以让我们用同步的写法实现异步的效果，await就是在等待结果
    let { id } = req.params;
    try {
        let sql = `SELECT * FROM userinf WHERE uid=${id}`;
        let data = await query(sql);//[{}] await是用于等待成功返回的数据resolve()
        if (data.length) {
            //查到就返回该用户信息
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                data
            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '查询失败'
            }
        }
        res.send(inf);

    } catch (err) {
        //捕获失败的回调:reject(err)
        let inf = {
            code: 5000,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});

//修改密码：put请求  UPDATE userinf SET name='春哥',psw='666' WHERE uid=35
Router.put('/edit/:id', async (req, res) => {
    //async和await可以让我们用同步的写法实现异步的效果，await就是在等待结果
    let { id } = req.params;
    let opt = req.body;//{name:'春哥',psw:'666'}
    //我想要的格式：name='春哥',psw='666'
    let str = '';
    for (let key in opt) {
        str += key + '=' + `'${opt[key]}'` + ','
    }
    str = str.slice(0, -1);//切掉最后一个,
    // console.log(str);

    try {
        let sql = `UPDATE userinf SET ${str} WHERE uid=${id}`;
        let data = await query(sql);//[{}] await是用于等待成功返回的数据resolve()
        console.log(data);
        if (data.affectedRows) {
            //修改成功
            inf = {
                code: 2000,
                flag: true,
                message: '修改成功'

            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '修改失败'
            }
        }
        res.send(inf);

    } catch (err) {
        //捕获失败的回调:reject(err)
        let inf = {
            code: 5000,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
    // res.send('7777');
});


//删除id为2的用户 :动态路由传参 req.params
Router.delete('/del/:id', async (req, res) => {
    //async和await可以让我们用同步的写法实现异步的效果，await就是在等待结果
    let { id } = req.params;
    try {
        let sql = `DELETE FROM userinf WHERE uid=${id}`;
        let data = await query(sql);//[{}] await是用于等待成功返回的数据resolve()
        // console.log(data);
        if (data.affectedRows) {
            //删除成功
            inf = {
                code: 2000,
                flag: true,
                message: '删除成功'

            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '删除失败'
            }
        }
        res.send(inf);

    } catch (err) {
        //捕获失败的回调:reject(err)
        let inf = {
            code: 5000,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});

//删除多个用户:delete请求
Router.delete('/delMany', async (req, res) => {
    //async和await可以让我们用同步的写法实现异步的效果，await就是在等待结果
    let { ids } = req.body;
    try {
        let sql = `DELETE FROM userinf WHERE uid in(${ids})`;
        let data = await query(sql);//[{}] await是用于等待成功返回的数据resolve()
        // console.log(data);
        if (data.affectedRows) {
            //删除成功
            inf = {
                code: 2000,
                flag: true,
                message: '删除成功'

            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '删除失败'
            }
        }
        res.send(inf);

    } catch (err) {
        //捕获失败的回调:reject(err)
        let inf = {
            code: 5000,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});

//查询所有的用户:分页 page:1 页码  pagesize:10 一页10条数据 SELECT * FROM userinf LIMIT 0,10  (起始下标，条数)
Router.get('/userlist', async (req, res) => {
    //async和await可以让我们用同步的写法实现异步的效果，await就是在等待结果
    let { page, pagesize } = req.query;
    let index = (page - 1) * pagesize;
    /*
        page(页码)  pagesize(条数)  index(下标)
        1           10             0
        2           10             10
        3           10             20

        index=(page-1)*pagesize
    */
    try {
        let sql = `SELECT * FROM userinf LIMIT ${index},${pagesize}`;
        let data = await query(sql);//[{}] await是用于等待成功返回的数据resolve()
        // console.log(data);
        let sql2 = `SELECT * FROM userinf`;
        let allArr = await query(sql2);//总条数
        if (data.length) {
            //查到数据
            inf = {
                code: 2000,
                flag: true,
                message: '查询成功',
                total: allArr.length,
                page,
                pagesize,
                pages: Math.ceil(allArr.length / pagesize),
                data


            }
        } else {
            inf = {
                code: 3000,
                flag: false,
                message: '查询失败'
            }
        }
        res.send(inf);

    } catch (err) {
        //捕获失败的回调:reject(err)
        let inf = {
            code: 5000,
            flag: false,
            message: '查询失败'
        }
        res.send(inf);
    }
});


//修改密码  ：put请求 也是和post一样用body传参(post/put/delete都是用body传参)

module.exports = Router;//导出路由对象