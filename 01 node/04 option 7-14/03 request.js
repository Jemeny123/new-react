//引入request对象，用于服务器的ajax。发起请求
let request = require('request');
const cheerio = require('cheerio');//jq的节点操作

// request.get('https://cnodejs.org/', (err, res, body) => {
//     console.log(body);//请求到的html
// });


$ = cheerio.load('<h2 class = "title">Hello world</h2>');
console.log($('h2').html());//获取内容
$('h2').attr('title', '我是标题');//设置属性值
console.log($('h2').attr('title'));