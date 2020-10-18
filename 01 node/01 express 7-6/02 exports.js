//导出模块：暴露模块

function show() {
    console.log('这是一个模块的功能');
}

let obj = {
    name: '杨超越',
    age: '18',
    sing: function () {
        //this是指obj
        console.log(this.name + '唱歌很好听');
    }
}

//注意：module.exports的方式导出对象，只能写一次，如果出现多次会被最后一个覆盖
//导出一个函数叫做show
// module.exports = show;
//导出一个对象
// module.exports = obj;

module.exports = {
    show,
    obj
}