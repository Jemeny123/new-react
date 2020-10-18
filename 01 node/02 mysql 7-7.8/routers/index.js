//希望在这里查询数据，返回给前端，叫做路由
const express = require('express');
const Router = express.Router();//Router==app
//引入子路由
const userRouter = require('./module/user');
const goodRouter = require('./module/good');

//真实接口：有语义的  获取数据:get  提交数据：post  修改数据:put 删除数据：delete  restful接口规范
/*
    商品信息管理：
    订单管理：
    商品管理:
    入库出库管理:
*/

//子路由的选择
Router.use('/user', userRouter);
Router.use('/good', goodRouter);



module.exports = Router;//导出路由对象
