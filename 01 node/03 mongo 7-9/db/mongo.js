//安装mongodb模块  npm i mongodb
//引入模块
const { MongoClient } = require("mongodb");

let urlDb = 'mongodb://localhost:27017';
let dbName = 'h52002';

/*
    * 方法一:连接数据库
    * 方法二:
        * 增删改查
        * 关闭数据库
*/

//方法一:连接数据库
async function connect() {
    try {
        let client = await MongoClient.connect(urlDb);
        // console.log(client);
        return client;
    } catch (err) {
        // console.log(err);
        return err;
    }

}

// connect();

//增
async function create(colName, data) {
    //colName集合名 data:要插入的数据，数组类型
    try {
        let client = await connect();
        //1.连接数据库
        let db = client.db(dbName);
        //2.查找集合
        let col = db.collection(colName);
        //3.集合操作：插入数据
        let result = await col.insertMany(data);
        //4.关闭数据库
        client.close();
        return result;
    } catch (err) {
        return err;
    }
}

// let data = [{
//     "age": '55',
//     "name": "刘德华"
// }, {
//     "age": '56',
//     "name": "黎明"
// }, {
//     "age": '57',
//     "name": "郭富城"
// }, {
//     "age": '58',
//     "name": "张学友"
// }];

//调用插入数据方法
// let ee = create('user', data);
// ee.then(res => {
//     console.log(res);
// })

//删
async function remove(colName, query) {
    console.log(query, 890);
    //colName集合名 data:要插入的数据，数组类型
    try {
        let client = await connect();
        //1.连接数据库
        let db = client.db(dbName);
        //2.查找集合
        let col = db.collection(colName);
        //3.集合操作：插入数据
        let result = await col.deleteMany(query);
        //4.关闭数据库
        client.close();
        return result;
    } catch (err) {
        return err;
    }
}

//调用 测试用例
// let ff = remove('user', { name: '黎明' });
// ff.then(res => {
//     console.log(res);
// })

//改
async function update(colName, query, data) {
    //colName集合名 data:要插入的数据，数组类型
    try {
        let client = await connect();
        //1.连接数据库
        let db = client.db(dbName);
        //2.查找集合
        let col = db.collection(colName);
        //3.集合操作：插入数据
        let result = await col.updateMany(query, data);
        //4.关闭数据库
        client.close();
        return result;
    } catch (err) {
        return err;
    }
}

//调用
// let gg = update('user', { name: '刘德华' }, {
//     $set: {
//         name: '华仔'
//     }
// });
// gg.then(res => {
//     console.log(res);
// })

//查
// async function find(colName, query = {}) {
//     //colName:集合名  query:查询条件，选填参数
//     try {
//         let client = await connect();
//         // console.log(client);
//         //1.连接数据库
//         let db = client.db(dbName);
//         //2.查找集合
//         let col = db.collection(colName);
//         //3.文档操作  查询数据返回
//         let data = await col.find(query).toArray();
//         client.close();//关闭数据库，写在return之前
//         return data;//查询到数据返回给前端
//     } catch (err) {
//         console.log(err);
//         return err;//返回错误信息
//     }
// }

// let dd = find('songs', { id: 1 });
// dd.then(res => {
//     console.log(res);
// })
// console.log(dd);

//分页查询
// async function find(colName, query = {}, page = 1, pagesize = 10) {
async function find(opt) {
    //opt:配置参数(优先级更高) 主角
    //colName:集合名  query:查询条件，选填参数
    let defaultOpt = {//默认参数(备胎、板凳、替补)
        query: {},//查询条件
        page: 1,//页码
        pagesize: 2,//一页多少条
        sortquery: {}//排序规则
    }

    Object.assign(defaultOpt, opt);//合并对象:替补方案
    // console.log(defaultOpt);
    try {
        let client = await connect();
        // console.log(client);
        //1.连接数据库
        let db = client.db(dbName);
        //2.查找集合
        let col = db.collection(defaultOpt.colName);
        //3.文档操作  查询数据返回
        let index = (defaultOpt.page - 1) * defaultOpt.pagesize;
        let data = await col.find(defaultOpt.query).limit(defaultOpt.pagesize).skip(index).sort(defaultOpt.sortquery).toArray();
        client.close();//关闭数据库，写在return之前
        return data;//查询到数据返回给前端
    } catch (err) {
        console.log(err);
        return err;//返回错误信息
    }
}

// let dd = find('songs', {}, 2, 2);
// let dd = find({//要查询songs集合里面第二页的数据
//     colName: 'songs', //集合名字,必填
//     page: 1,//页面,选填,默认1
//     pagesize: 5,//每页多少条,选填,默认10
//     sortquery: { id: -1 } //排序方案,选填,默认没有排序
// })
// dd.then(res => {
//     console.log(res);
// })
// console.log(dd);

module.exports = {
    find,//查
    create,//增
    remove,//删
    update//改
}


