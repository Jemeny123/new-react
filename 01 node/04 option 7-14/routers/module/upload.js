//安装multer模块，进行文件的上传  npm i multer -S
//引入multer模块
const multer = require('multer');
//引入express
const express = require('express');
const Router = express.Router();//Router==app
const { host } = require('../../config.json');
const mongo = require('../../db/mongo');//引入mongo方法进行mongoDB的增删改查
var { ObjectId } = require('mongodb');

//配置上传目录：文件名被改了；没有文件后缀；目录没有就自动创建
// var upload = multer({ dest: 'uploads/' });//以服务器文件为基准

var storage = multer.diskStorage({
    //配置上传目录：目录如果没有就上传失败
    // destination: function (req, file, cb) {
    //   cb(null, 'uploads/')
    // },
    //目录无则自动创建
    destination: 'uploads/',
    //文件名的控制
    filename: function (req, file, cb) {
        // console.log(file);
        let filename = file.originalname;//3.jpg
        let arr = filename.split('.');//[3,'jpg']
        // cb(null, file.fieldname + '-' + Date.now()) //默认：没有后缀 avatar-436364364563
        cb(null, arr[0] + '-' + Date.now() + '.' + arr[1]);//处理方案:3-5343535353.jpg
    }
})

var upload = multer({ storage: storage });//调用上面配置参数storage

//需求：上传头像(单张图)  图片放在服务器，路径存到数据库(前端获取的是绝对路径) /upload/headphoto
Router.post('/headphoto', upload.single('avatar'), async (req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    // console.log(req.file);//存储文件
    // console.log(req.body);//存储文件之外的普通数据
    //目标：http://localhost:8020/uploads/4-1594364637857.jpg 存入到数据库
    let url = host + '/uploads/' + req.file.filename;
    console.log(req.body, 899);
    let { _id } = req.body;
    _id = ObjectId(_id);
    //集合名字：user
    let data = await mongo.update('user', { _id }, {
        $set: {
            avatar: url
        }
    })
    let inf = {};
    if (data.result.n) {
        //上传成功
        inf = {
            code: 2000,
            flag: true,
            message: '上传成功'
        }
    } else {
        inf = {
            code: 3000,
            flag: false,
            message: '上传失败'
        }
    }
    res.send(inf);
    // res.send('789');//响应数据给前端
})

//需求：上传商品图片  多张图同时上传(限制最多3张)
Router.post('/goodimg', upload.array('photos', 3), async (req, res) => {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    //目标：http://localhost:8020/uploads/4-1594364637857.jpg 存入到数据库 [url1,url2,url3]
    // console.log(req.files);//存储所有的文件信息
    let urlList = [];
    req.files.forEach(item => {
        let url = host + '/uploads/' + item.filename;
        urlList.push(url);
    });
    let { _id } = req.body;
    _id = ObjectId(_id);

    let data = await mongo.update('good', { _id }, {
        $set: {
            urlList
        }
    })
    let inf = {};
    if (data.result.n) {
        //上传成功
        inf = {
            code: 2000,
            flag: true,
            message: '上传成功'

        }
    } else {
        inf = {
            code: 3000,
            flag: false,
            message: '上传失败'
        }
    }
    res.send(inf);
    // console.log(urlList);
    // console.log(req.body);//存储普通的文本信息
    // res.send('678')
})

module.exports = Router;//导出路由对象

