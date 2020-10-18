//写任务，让gulp帮忙执行，就可以了

//https://www.cnblogs.com/2050/p/4198792.html

/*
 task（） 布置任务

	三个参数：

	第一个参数：任务名称  默认任务 default

	第二个参数：该任务依赖的其他任务，是一个数组（可选）

	第三个参数：任务回调函数（任务执行）
 */

let gulp = require('gulp');//引入模块，才能调用这个模块的方法：类似于new一个对象

//布置任务 task() ：第二个参数的好处，就是你写完了所有的任务后，写好依赖关系，一次性就可以执行所有的任务，自动化
gulp.task('default', ['sing', 'coding'], function () {//default任务依赖sing和coding
    console.log('default 默认任务打印');
});

gulp.task('sing', function () {
    console.log('sing');
});

gulp.task('coding', function () {
    console.log('coding');
});

/*
src() 源文件路径 参数可以是一个数组
dest（）目标文件路径 dest参数中的文件夹名称可以自动创建
pipe（）管道 ，表示输送，就是下一步
 */

//布置任务：拷贝src/index.html文件到dist目录下
gulp.task('copyhtml', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));//如果没有该目录就会自动创建
});

//布置任务：拷贝src下js目录下所有js文件到dist的js目录下
gulp.task('copyjs', function () {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'));//如果没有该目录就会自动创建
});

//布置任务：拷贝src下css目录下所有文件到dist的css目录下
gulp.task('copycss', function () {
    return gulp.src('src/css/*')
        .pipe(gulp.dest('dist/css'));//如果没有该目录就会自动创建
});

gulp.task('copycss2', function () {
    return gulp.src('src/css/**')
        .pipe(gulp.dest('dist/css'));//如果没有该目录就会自动创建
});

/*
    watch() 监听

	两个参数：
	参数一：监听文件的路径
	参数二：监听任务名称 数组
 */

gulp.task('watchhtml', function () {
    return gulp.watch('src/index.html', ['copyhtml']);
});

//实用的任务

//1.压缩html

var minifyhtml = require('gulp-htmlmin');//引入插件gulp-htmlmin 

gulp.task('htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src('src/html/*.html')
        .pipe(minifyhtml(options))
        .pipe(gulp.dest('dist/html'));
});

//2.压缩css
var minifycss = require('gulp-cssmin');

gulp.task('cssmin', function () {
    return gulp.src('src/css/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});

//3.重名名
var rename = require('gulp-rename');
gulp.task('cssmin2', function () {
    return gulp.src('src/css/*.css')
        .pipe(minifycss())
        .pipe(rename('*.min.css'))
        .pipe(gulp.dest('dist/css'));
});

var minifyCss = require('gulp-minify-css'),
    pump = require('pump');

gulp.task('testRenameCss', function (cb) {
    pump([
        gulp.src('src/css/*.css'),
        rename({ suffix: '.min' }),
        minifyCss({
            keepSpecialComments: '*'
        }),
        gulp.dest('dist/css')
    ])
});

//4.压缩js
var minifyjs = require('gulp-uglify');//压缩js的模块
var babel = require('gulp-babel');//把ES6转成ES5

gulp.task('jsmin', function () {
    return gulp.src('src/js/common.js')
        .pipe(babel({//es6转es5
            'presets': ['es2015']
        }))
        .pipe(minifyjs())//压缩js
        .pipe(rename('common.min.js'))//重命名
        .pipe(gulp.dest('dist/js'));//ES6不能直接压缩，需要先转成es5
});

//6.编译sass文件

var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('src/sass/list.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});

//7.合并文件
var concat = require('gulp-concat');
gulp.task('concat', function () {
    return gulp.src(['src/css/aa.css', 'src/css/bb.css'])
        .pipe(concat('all.css'))//合并文件
        .pipe(minifycss())//压缩
        .pipe(rename('all.min.css'))//重命名
        .pipe(gulp.dest('dist/css'));
});

//8.压缩图片
//初级版
var imagemin = require('gulp-imagemin');

gulp.task('imgmin', function () {
    return gulp.src('src/img/*.{png,jpg,gif,ico,jpeg}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

//中等压缩
gulp.task('imgmin2', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico,jpeg}')
        .pipe(imagemin({
            optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});

//强力版：https://www.cnblogs.com/miny-simp/p/gulp.html
var pngquant = require('imagemin-pngquant');

gulp.task('testImagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],//不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('dist/img'));
});
