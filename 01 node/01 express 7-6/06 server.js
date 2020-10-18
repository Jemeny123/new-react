//引入express模块:先安装express: npm i express
let express = require('express');//绝对路径

//实例化对象
let app = express();

//开启一个静态资源服务器:借助express的一个中间件 static
app.use(express.static('./'));//相当于apache里面的www默认的静态资源目录

//开启服务器:执行这个文件就是开启服务器了  node 06 server.js
//端口号设置：1000-60000
app.listen(8010, () => {
    //当服务器开启成功就执行这个回调函数
    console.log('服务器开启成功，请访问8010端口');
});

