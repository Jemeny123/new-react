const express = require('express');
const Router = express.Router();//Router==app
const data = require('../../data.json');//文件模块
//需求：给前端传数据，要解决可以 :8800端口写的
const proxy = require('http-proxy-middleware');
// console.log(proxy2);

//方案一:jsonp解决,jsonp方式本质上是用url来获取资源，所以是get请求 /option/jsonp
//  url?callback=getdata    
//callback:后端接收函数名的属性名
//getdata：后端传入的函数名 :jq不需要，jq是自动生成一个随机的函数名
// Router.get('/jsonp', (req, res) => {
//     let { callback } = req.query;
//     let str = JSON.stringify(data);
//     console.log(callback);
//     res.send(`${callback}(${str})`);//getdata(123) //只能传字符串格式
// });


//方案二：cors实现跨域
// Router.get('/cors', (req, res) => {
//     //设置响应头
//     res.header('Access-Control-Allow-Origin', '*');
//     let str = '蔡旭坤，大碗宽面-吴亦凡';
//     res.send(str);
// })

//方案三:服务器代理：让服务器向对方的服务器发送请求，因为服务器端是不需要经过浏览器的，所以不存在同源策略；伪装域名：http://localhost:8800/  向 https://m.weibo.cn/api/config/list 发请求
//发起请求的时候：替换主机路径：https://m.weibo.cn

let sinaMiddleware = proxy({
    // 目标网址
    target: 'http://www.1000phone.com',
    // 修改请求源地址
    changeOrigin: true,
    pathRewrite: {
        "^/qf": "/"
    }
});
Router.get('/qf/*', sinaMiddleware, (req, res) => {
    console.log(666)
    res.send('data')
});

module.exports = Router;//导出路由对象