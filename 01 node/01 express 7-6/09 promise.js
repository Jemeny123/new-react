
//创建一个promise对象;解决回调地狱；解决异步顺序问题

let p = new Promise((resolve, reject) => {
    //resolve：成功的回调
    //reject：失败的回调
    let num = 5;
    if (num < 10) {
        resolve('num小于10');
        // console.log('num小于10');
    } else {
        reject('num大于等于10')
    }
});

// p.then(data => {//捕获成功的回调
//     console.log(data);
// }).catch(err => {//捕获失败的回调
//     console.log(err);
// });


// //try catch
// try {//先试着执行这里，如果通过，就执行3；如果不同过，就执行2 3
//     let num = 88;
//     console.log(num);//1
// } catch (err) {
//     console.log(err, '错误信息');//2
// }
// console.log('今天作文好简单');//3

// console.log(p);

//把then和catch的写法成ES7 async和await的写法：能把回调成功的去除，用同步的写法实现异步的效果
