let mongo = require('./mongo');
//引入你要插入的数据 data.json(这里保持是json数据即可)
let data = require('../data/data.json');

mongo.create('good3', data);//插入数据到数据库里面(数组格式数据)