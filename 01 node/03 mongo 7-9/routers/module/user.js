//子路由：用户信息管理
const express = require('express');
const Router = express.Router();//Router==app
//引入query方法进行数据库的查询
const mongo = require('../../db/mongo');//引入mongo方法进行mongoDB的增删改查
var { ObjectId } = require('mongodb');
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


//验证用户是否存在 :get请求
Router.get('/checkname', async (req, res) => {
    //async和await可以让我们用同步的写法实现异步的效果，await就是在等待结果
    try {
        // let { name } = req.query;//解构 es6
        // let data = await mongo.find('user', req.query);//{name:'郭富城'}
        let data = await mongo.find({
            colName: 'user',//集合名字
            query: req.query //查询条件
        });
        // console.log(data);//[{},{}]
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
        // let { name, psw } = req.body;//解构
        let arr = [];
        arr.push(req.body);
        let result = await mongo.create('user', arr);
        // console.log(result);
        // res.send(result)
        let inf = {};
        if (result.insertedCount) {
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
        let data = await mongo.find({//用mongo的find方法查询账号和密码是否正确
            colName: 'user',
            query: req.query
        });
        // console.log(data);
        let token = tokenFn.create(req.query.psw);
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
                message: '登陆失败，账号或密码错误'
            }
        }
        // res.send(inf);//响应
    } catch (err) {
        inf = {
            code: 5000,
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
    try {
        let { id } = req.params;
        let _id = ObjectId(id);//把前端传过来的id包装一下，包装成和数据库的_id一致才能比较
        // console.log(_id);//打印不出那个效果，但是是可以使用的
        let result = await mongo.update('user', { _id }, { $set: req.body })
        if (result.result.n) {
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

// `function show() {
//     console.log(888);
// }`

// let fn = function show() {
//     console.log(888);
// };
// fn = eval(fn);

// fn();

//删除id为2的用户 :动态路由传参 req.params
Router.delete('/del', async (req, res) => {
    //async和await可以让我们用同步的写法实现异步的效果，await就是在等待结果
    try {
        let arr = req.body.ids;
        arr = eval(arr);//把字符串转成js
        // console.log(arr);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = ObjectId(arr[i]);
        }
        // console.log(arr);
        // let _id = ObjectId(id);//把前端传过来的id包装一下，包装成和数据库的_id一致才能比较
        // console.log(_id);//打印不出那个效果，但是是可以使用的
        // let result = await mongo.remove('user', { _id });//删除单个用户
        arr.forEach(async item => {
            let result = await mongo.remove('user', {
                _id: item
            });//删除单个用户
        })


        // console.log(result);
        // res.send(result);
        // if (result.deletedCount) {
        //     //删除成功
        //     inf = {
        //         code: 2000,
        //         flag: true,
        //         message: '删除成功'

        //     }
        // } else {
        //     inf = {
        //         code: 3000,
        //         flag: false,
        //         message: '删除失败'
        //     }
        // }
        res.send('888');

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