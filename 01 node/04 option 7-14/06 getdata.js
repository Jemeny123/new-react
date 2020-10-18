//发起请求：https://www.hua.com/aiqingxianhua/

const request = require('request');//发起请求
const cheerio = require('cheerio');//jq的节点操作 jquery
var iconv = require('iconv-lite');//转码的模块
const fs = require('fs');
let mongo = require('./db/mongo');
let path = require('path');
//引入你要插入的数据 data.json(这里保持是json数据即可)

//爬取3页数据
//https://www.hua.com/aiqingxianhua/?r=0&pg=2
for (let i = 1; i <= 3; i++) {
    request({ url: 'https://www.hua.com/aiqingxianhua/?r=0&pg=' + i, encoding: 'utf-8' }, (err, res, body) => {
        // console.log(body);
        var html = iconv.decode(body, 'gb2312');//解码
        $ = cheerio.load(body, { decodeEntities: false });
        let arr = [];//存数据  [{},{}]
        $('.grid-wrapper .grid-item').each((index, ele) => {
            // console.log(ele);
            let obj = {};
            obj.title = $(ele).find('.product-title').html();//标题
            let img = 'https:' + $(ele).find('.img-box img').attr('src');//https://img01.hua.com/uploadpic/newpic/9012455.jpg_220x240.jpg
            //下载图片到本地
            let filename = path.basename(img);
            request(img).pipe(fs.createWriteStream('./img/' + filename));//http://localhost:8899/img/9012455.jpg_220x240.jpg
            obj.img = 'http://localhost:8899' + '/img/' + filename;
            obj.feature = $(ele).find('.feature').html();
            arr.push(obj);

        });
        // console.log(arr);

        //存储方案一:爬取到的数据存到硬盘
        // let writeStream = fs.createWriteStream('./xianhuadata.json');
        // let str = JSON.stringify(arr);//转成字符串再写入文件
        // writeStream.write(str);//写入文件
        // writeStream.end();
        // writeStream.on('finish', () => {
        //     console.log('写入完成啦');
        // })

        //存储方案二：爬取到的数据存到数据库
        mongo.create('xianhua3', arr);//插入数据到数据库里面(数组格式数据)

    })
}


//爬取1页数据
// request({ url: 'https://www.hua.com/aiqingxianhua/', encoding: 'utf-8' }, (err, res, body) => {
//     // console.log(body);
//     var html = iconv.decode(body, 'gb2312');//解码
//     $ = cheerio.load(body, { decodeEntities: false });
//     let arr = [];//存数据  [{},{}]
//     $('.grid-wrapper .grid-item').each((index, ele) => {
//         // console.log(ele);
//         let obj = {};
//         obj.title = $(ele).find('.product-title').html();//标题
//         let img = 'https:' + $(ele).find('.img-box img').attr('src');//https://img01.hua.com/uploadpic/newpic/9012455.jpg_220x240.jpg
//         //下载图片到本地
//         let filename = path.basename(img);
//         request(img).pipe(fs.createWriteStream('./img/' + filename));//http://localhost:8899/img/9012455.jpg_220x240.jpg
//         obj.img = 'http://localhost:8899' + '/img/' + filename;
//         obj.feature = $(ele).find('.feature').html();
//         arr.push(obj);

//     });
//     // console.log(arr);

//     //存储方案一:爬取到的数据存到硬盘
//     // let writeStream = fs.createWriteStream('./xianhuadata.json');
//     // let str = JSON.stringify(arr);//转成字符串再写入文件
//     // writeStream.write(str);//写入文件
//     // writeStream.end();
//     // writeStream.on('finish', () => {
//     //     console.log('写入完成啦');
//     // })

//     //存储方案二：爬取到的数据存到数据库
//     mongo.create('xianhua3', arr);//插入数据到数据库里面(数组格式数据)

// })