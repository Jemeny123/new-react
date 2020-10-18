let mongo = require('./mongo');
//引入你要插入的数据 data.json(这里保持是json数据即可)
// let data = require('../data/data.json');
const Mock = require('mockjs')
const data = Mock.mock({
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

mongo.create('user', data.datalist);//插入数据到数据库里面(数组格式数据)