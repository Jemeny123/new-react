const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();

// 静态资源服务器
app.use(express.static('./'))

app.use((req,res)=>{
    // 任何的请求返回index.html的内容
    fs.readFile(path.resolve(__dirname,'index.html'),(err,data)=>{
        res.set('Content-Type','text/html; charset=utf-8')
        res.send(data);
    })
})

app.listen(2002,()=>{
    console.log(`Server is runing on port 2002`)
})