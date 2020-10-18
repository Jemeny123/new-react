const Mock = require('mockjs')
const data = Mock.mock({
    // 'memberList|4': [//生成4条数据  [{},{}]
    //     {
    //         'id|+1': 1,
    //         'name|2': '小梦',
    //         "phone": /1[3-9]\d{9}/,
    //         'title': '@ctitle(8,30)',
    //         'name': '@cname', //中文姓名
    //     }
    // ]
    "datalist|30": [{
        "username": "@last",
        "name": "@cname",
        "birthday": "@date",
        "sex|1": ["男", "女"],
        "phone": /1[385][1-9]\d{8}/,
        "address": "@county(true)",
        "pic": "@image(50x50)"
    }]
})
// stringify(数据, 数据转换函数，缩进空格数)
// console.log(JSON.stringify(data, null, 2))
//查看效果，执行命令 node demo1.js
console.log(data);