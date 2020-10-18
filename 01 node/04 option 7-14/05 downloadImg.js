const request = require('request');//发起请求
const fs = require('fs');
let path = require('path');//处理路径的模块
//https://img01.hua.com/uploadpic/newpic/9012455.jpg_220x240.jpg
let url = 'https://img01.hua.com/uploadpic/newpic/9012455.jpg_220x240.jpg';

let filename = path.basename(url);
console.log(filename);
request(url).pipe(fs.createWriteStream('./img/' + filename));