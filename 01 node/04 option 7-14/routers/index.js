//希望在这里查询数据，返回给前端，叫做路由
const express = require('express');
const Router = express.Router();//Router==app
//引入子路由
// const userRouter = require('./module/user');
// const uploadRouter = require('./module/upload');
// const optionRouter = require('./module/option');

//真实接口：有语义的  获取数据:get  提交数据：post  修改数据:put 删除数据：delete  restful接口规范
/*
    商品信息管理：
    订单管理：
    商品管理:
    入库出库管理:
*/
//把这个路由配置放在所有路由的前面，方便调用next操作
// Router.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS");

//     // 跨域请求CORS中的预请求
//     if (req.method == "OPTIONS") {
//         res.sendStatus(200);/*让options请求快速返回*/
//     } else {
//         next();
//     }
// })
//子路由的选择
// Router.use('/user', userRouter);
// Router.use('/upload', uploadRouter);
// Router.use('/option', optionRouter);//引入自路由：实现跨域



module.exports = Router;//导出路由对象
