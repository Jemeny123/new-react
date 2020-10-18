//引入express模块:先安装express: npm i express
let express = require('express');//绝对路径
// 引入json解析中间件
var bodyParser = require('body-parser');
const { json } = require('body-parser');

//实例化对象
let app = express();

// 添加json解析
app.use(bodyParser.json());//帮我们解析post提交的数据 {"name","gaoyuanyuan","psw":123456}
app.use(bodyParser.urlencoded({ extended: false })); //帮我们解析post提交的键值对数据 name=gaoyuanyuan&psw=123456



//开启一个静态资源服务器:借助express的一个中间件 static
app.use(express.static('./'));//相当于apache里面的www默认的静态资源目录


//真实接口：有语义的  获取数据:get  提交数据：post  修改数据:put 删除数据：delete  restful接口规范
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

let userList = [
    {
        gid: 1,
        name: '刘亦菲',
        psw: 520
    },
    {
        gid: 2,
        name: '高圆圆',
        psw: 520
    },
    {
        gid: 3,
        name: '韩红',
        psw: 520
    }
]


//验证用户是否存在：get请求
app.get('/user/checkname', (req, res) => {
    //req:request 请求对象,存储前端传过来的数据 get请求，数据写在params
    // console.log(req);
    // let name = req.query.name;
    // console.log(name);
    let { name } = req.query;//解构 es6
    // console.log(name, 789);
    //返回满足条件的对象，最终还是数组的形式：数组的长度如果不为0，就是查找同名，不给注册
    // let arr = userList.filter(item => {
    //     return item.name == name;
    // });
    let inf = userList.filter(item => item.name == name).length;

    // console.log(inf);
    let data = {};
    if (inf) {
        //真：找到，不给注册
        data = {
            code: 3000, //失败状态
            flag: false, //失败提示
            message: '该用户名已存在，不能注册' //提示信息
        }
    } else {
        //假：找不到，允许注册
        data = {
            code: 2000, //成功状态
            flag: true, //成功提示
            message: '允许注册' //提示信息
        }
    }

    // res.send('查询用户名')
    res.send(data);//响应数据给前端
});

//注册功能: post请求
app.post('/user/reg', (req, res) => {
    console.log(req.body);//post请求数据是写在body的 :介绍不到数据，需要借助一个中间件body-parser
    let { name, psw } = req.body;//解构
    userList.push({
        id: userList.length + 1,
        name,
        psw
    })
    let data = {
        code: 2000,
        flag: true,
        message: '注册成功',
        data: {
            userList
        }
    }
    res.send(data);
});

//删除id为2的用户 :动态路由传参 req.params
app.delete('/user/:id', (req, res) => {
    // console.log(req.params);
    let { id } = req.params;
    let arr = userList.filter(item => item.gid != id);//过滤掉id为3的那条数据

    let data = {
        code: 2000,
        flag: true,
        message: '删除成功',
        data: {
            arr
        }
    }
    res.send(data)
});

//修改密码  ：put请求 也是和post一样用body传参(post/put/delete都是用body传参)



//开启服务器:执行这个文件就是开启服务器了  node 06 server.js
//端口号设置：1000-60000
app.listen(8010, () => {
    //当服务器开启成功就执行这个回调函数
    console.log('服务器开启成功，请访问8010端口');
});

