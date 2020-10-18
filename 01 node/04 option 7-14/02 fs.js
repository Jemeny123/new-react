//引入fs模块进行文件的读写

let fs = require('fs');

//需求：读去文件打印出来(异步)
// fs.readFile('./aa.txt', (err, data) => {
//     if (err) throw err;//有错误抛出错误
//     console.log(data.toString(), 888);//buffer 二进制
// });

//需求：读取文件打印出来(同步)
// let data = fs.readFileSync('./aa.txt');
// console.log(data.toString(), 999);

//需求：写文件：覆盖
// fs.writeFile('./bb.txt', '吴亦凡', err => {
//     if (err) throw err;
//     fs.readFile('./bb.txt', (err, data) => {
//         console.log(data.toString(), 899);
//     })
// });

//需求：追加内容 appendFile
// fs.appendFile('./bb.txt', '坤坤', err => {
//     if (err) throw err;
//     fs.readFile('./bb.txt', (err, data) => {
//         console.log(data.toString(), 899);
//     })
// });

//需求：文件的拷贝
function copy(path1, path2) {
    //path1:来源
    //path2:存入的文件
    fs.readFile(path1, (err, data) => {
        fs.writeFile(path2, data, err => {
            console.log(err);
        })
    })
};

// copy('./aa.txt', './cc.txt');

//大文件的读写

// let readStream = fs.createReadStream('./aa.txt');

// //接收
// let data = '';
// readStream.on('data', chunk => {
//     //data：事件名，正在传送中
//     data += chunk;
// });

// //接收完毕
// readStream.on('end', () => {
//     console.log(data, 90);
//     //res.send(data)
// });


//需求：流的方式写入文件
let writerStream = fs.createWriteStream('output.txt');//没有该文件会自动创建，有就被覆盖
writerStream.write('我们不一样；');//追加的方式
writerStream.write('有啥不一样；');
writerStream.write('其实也一样；');
writerStream.end();//告诉writerStream我们已经写完数据，结束标记
writerStream.on('finish', function () {//finish事件：写入完成的事件
    console.log("写入完成。");
});

