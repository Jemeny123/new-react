//发起请求：https://www.hua.com/aiqingxianhua/

const request = require('request');//发起请求
const cheerio = require('cheerio');//jq的节点操作 jquery
var iconv = require('iconv-lite');//转码的模块
const fs = require('fs');
let mongo = require('./db/mongo');
//引入你要插入的数据 data.json(这里保持是json数据即可)




request({ url: 'https://www.hua.com/aiqingxianhua/', encoding: 'utf-8' }, (err, res, body) => {
    // console.log(body);
    var html = iconv.decode(body, 'gb2312');//解码
    $ = cheerio.load(body, { decodeEntities: false });
    let arr = [];//存数据  [{},{}]
    $('.grid-wrapper .grid-item').each((index, ele) => {
        // console.log(ele);
        let obj = {};
        obj.title = $(ele).find('.product-title').html();//标题
        obj.img = 'https:' + $(ele).find('.img-box img').attr('src');
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
    mongo.create('xianhua2', arr);//插入数据到数据库里面(数组格式数据)

})