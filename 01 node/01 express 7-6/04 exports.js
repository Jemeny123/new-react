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

//导出：可以一次性导出多个，把所有的资源都包在一个大对象里面
exports.show = show;
exports.showme = obj;
