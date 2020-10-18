//需求：又开启websocket服务器，又能开启web静态资源服务器

const SocketServer = require('ws').Server;
const express = require('express');
const http = require('http');

// web服务器
const app = express();
app.use(express.static('./'));//开启静态资源服务器


// 利用http模块连接websocket服务器与web服务器
let server = http.createServer(app)

// WebSocket服务器
let wss = new SocketServer({ //开启websocket服务器
    // 在websocket中设置server,连接http模块
    server,
});
// console.log('socket服务器启动成功')

server.listen(2002, () => {
    console.log('web & websockt server启动成功,端口号2002')
});

//ws响应
wss.on('connection', client => {//监听客户端的连接请求
    //client:当前连接我的客户端对象
    // console.log('有人连接服务器了666');
    client.on('message', msg => {
        //监听前端传来的消息
        console.log(msg);
        wss.clients.forEach(item => {//wss.clients指所有连接服务器的客户端对象
            //item:每一个客户端
            item.send(msg);//广播消息
        })
    })
})


