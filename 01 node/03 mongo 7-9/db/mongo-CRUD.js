//安装mongodb模块  npm i mongodb
//引入模块
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const { MongoClient } = require("mongodb");

let urlDb = 'mongodb://localhost:27017';
//连接数据库
MongoClient.connect(urlDb, async (err, client) => {
    /*
        参数一:urlDb 数据库连接路径
        参数二:回调函数
            * err 错误
            * client 对象
                * let db = client.db(数据库名字) 连接数据库(没有就创建，连接成功返回该数据库db)
                * client.close() 关闭数据库
    */

    if (err) throw err;//如果有错误就抛出错误
    //连接数据库，无则自动创建
    let db = client.db('h52002');
    //连接数据库里面的集合 songs
    let col = db.collection('songs');

    //对集合col里面的文档进行操作:增删改查 CRUD
    // let song = [{
    //     "id": 1,
    //     "name": "月亮代表我的心"
    // }, {
    //     "id": 2,
    //     "name": "我心依旧"
    // }, {
    //     "id": 3,
    //     "name": "涛声依旧"
    // }, {
    //     "id": 4,
    //     "name": "匆匆那年"
    // }];

    //增删改查 CRUD

    //一、插入数据：增 C create
    // col.insertMany(song);//插入数据 insertMany(数组)

    //二、删除数据:删 D delete
    // let data = await col.deleteMany({ id: 3 });//里面的删除条件是一个对象
    // console.log(data);

    //三、修改数据:修改 U update

    //需求：修改id为1的name改完"天后"
    // let data = await col.updateMany({
    //     id: 3
    // }, {
    //     $set: {
    //         name: '天后'
    //     }
    // });
    // console.log(data);


    //四、查询数据:查 R retrieve

    //find(query) query:就是查询条件，对象格式； toArray() 把bson数据转成json数据
    //1、如果不写查询条件，默认就是查询所有数据
    // let data = await col.find().toArray();
    // data.then(d => {
    //     console.log(d);
    // })
    // console.log(data);

    //2、查询id=1的歌曲:$gt
    // let data = await col.find({
    //     id: 1
    // }).toArray();
    // console.log(data);

    //3、查询id=1的歌曲:$gt
    // let data = await col.find({
    //     id: {
    //         $gt: 1
    //     }
    // }).toArray();
    // console.log(data);

    //4、查询4>id>1的歌曲
    // let data = await col.find({
    //     id: {
    //         $gt: 1,//大于1
    //         $lt: 4//小于4
    //     }
    // }).toArray();
    // console.log(data);

    //5、查询id为1或3的文档:$in
    // let data = await col.find({
    //     id: {
    //         $in: [1, 3]
    //     }
    // }).toArray();
    // console.log(data);

    //6、查询id为2同时歌名为"我心依旧"的数据
    // let data = await col.find({
    //     id: 2,
    //     name: '我心依旧'
    // }).toArray();
    // console.log(data);

    //7.查询id为3或歌名为 "我心依旧"的数据: $or
    // let data = await col.find({
    //     $or: [{
    //         id: 3
    //     }, {
    //         name: '我心依旧'
    //     }]
    // }).toArray();
    // console.log(data);

    //8.对id进行排序 降序 sort()
    // let data = await col.find().sort({ id: -1 }).toArray();
    // console.log(data);

    //9、分页查询  page：1  pagesize:2 index:(page-1)*pagesize  
    //limit(pagesize).skip(index)
    // let page = 2;
    // let pagesize = 2;
    // let index = (page - 1) * pagesize;
    // let data = await col.find().limit(pagesize).skip(index).toArray();
    // console.log(data);

    client.close();//关闭数据库
})
