//引入express模块:先安装express: npm i express
let express = require('express');//绝对路径

//实例化对象
let app = express();

//开启一个静态资源服务器:借助express的一个中间件 static
app.use(express.static('./'));//相当于apache里面的www默认的静态资源目录

//准备接口写响应:什么请求都可以进入
//中间件：就是局部某个功能的函数，拥有三个参数reqeset, response, next；
//中间件是函数，但不是函数都是中间件
// app.use('/login', (reqeset, response, next) => {
//     /*
//         reqeset:请求对象：前端发的请求
//         response:响应对象
//         next:进入下一个中间件
//     */
//     console.log('进入这里');//给后端自己看，在cmd命令行显示
//     response.send('登陆成功');//发送给前端的数据
//     next();
// })

//不是中间件，这是普通的方法
// function show(reqeset, response, next) {
//     console.log(666);
// }

// app.use('/reg', (reqeset, response, next) => {
//     /*
//         reqeset:请求对象：前端发的请求
//         response:响应对象
//         next:进入下一个中间件
//     */
//     console.log('进入这里2');//给后端自己看，在cmd命令行显示
//     response.send('注册成功');//发送给前端的数据
//     next();
// });

// app.use('/home', show);

//真实接口：有语义的  获取数据:get  提交数据：post  修改数据:put 删除数据：delete  restful接口规范


//开启服务器:执行这个文件就是开启服务器了  node 06 server.js
//端口号设置：1000-60000
app.listen(8010, () => {
    //当服务器开启成功就执行这个回调函数
    console.log('服务器开启成功，请访问8010端口');
});

