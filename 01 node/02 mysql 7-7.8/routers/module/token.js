//引入插件
const jwt = require('jsonwebtoken');

/**
 * Token的生成与校验
*/
/**
 * 
 * 参数一： data         加密数据
 * 参数二： {Number} expiresIn    有效期（单位:s）
 */
let secret = 'malin';
function create(data, expiresIn = 60 * 60 * 24 * 7) {
    // console.log(111);
    let token = jwt.sign({ data }, secret, { expiresIn });
    return token;
}

// let str = create('123456');
// console.log(str);

function verify(token) {
    let res;
    try {
        let result = jwt.verify(token, secret);
        // console.log('token校验：', result)
        res = true;
    } catch (err) {
        res = false;
    }
    return res;
}

// let ok = verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiMTIzNDU2IiwiaWF0IjoxNTk0MTgwNTY0LCJleHAiOjE1OTQxODA1ODR9.LOyWF6Vvdpb_wXP9irw4E9O-FDzKStBuqC0Fh8uMU58');
// console.log(ok);

//导出
module.exports = {
    create,//创建token
    verify//校验token
}