//根目录建立webpack.config.js文件
//webpack是node写出来的使用node语言
let path = require("path");
// console.log(path.resolve("dist")); //拼接路径 ：C:\上课资料\H52002\H52002\ + dist

//html插件：帮你实现识别html文件
let HtmlWebpackPlugin = require("html-webpack-plugin");

//引入css解析器
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

//css兼容处理
let postCss = require("autoprefixer")({
  overrideBrowserslist: [
    "last 10 Chrome versions",
    "last 5 Firefox versions",
    "Safari >= 6",
    "ie> 8",
  ],
});

//css压缩
let OptimizeCss = require("optimize-css-assets-webpack-plugin");

//js压缩
let UglifyjsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  //打包模式 默认两种production(生产环境:代码压缩 默认) development(开发环境:代码不压缩) none==production
  mode: "production",

  //入口设置
  entry: {
    index: "./src/index.js",
  }, //入口

  //出口设置
  output: {
    filename: "static/js/[name].js", //打包后的文件名
    path: path.resolve("dist"), //路径必须是一个绝对路径
    publicPath: "/", //build之后的公共路径 上线的配置  http://www.myreact.cn
  },

  //开启服务器配置
  devServer: {
    port: 8080, //端口，
    host: "localhost", //ip地址:localhost本地，0.0.0.0可以访问网络地址 : 电脑和手机在同个局域网内 10.3.146.32:8080
    progress: true, //开启进度条
    contentBase: "./dist", //默认打开目录
    open: true, //自动打开浏览器,
    compress: true, //启动gzp压缩
    //跨域
    proxy: {
      "/api": {
        target: "http://10.0.193.147:8080",
        changeOrigin: true, //是否跨域，如果target是域名则需要配置，如果是ip地址不需要
        pathRewrite: {
          "^/api": "", //需要rewrite的,
        },
      },
    },
  },

  //一个数组存放所有插件
  plugins: [
    //配置这个模板后contentBase:"./build"不生效
    new HtmlWebpackPlugin({
      //关联咱们模板html文件
      template: "./public/index.html",
      filename: "index.html",
      minify: {
        //折叠换行true不换行
        collapseWhitespace: true,
      },
      hash: true, //生产环境下生成hash戳;解决缓存问题
      chunks: ["index"], //只引用index.js,解决index.html里面有index.js和admin.js的问题
    }),

    //css编译插件
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
  ],

  //模块
  module: {
    //规则
    rules: [
      //css编译规则
      {
        test: /\.css$/,
        use: [
          //从下到上执行
          MiniCssExtractPlugin.loader, //都放到了上面的main.css里面
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [postCss],
            },
          },
        ],
      },

      //sass规则
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"], //从右到左
      },

      //图片规则
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: {
          loader: "url-loader", //file-loader加载图片，url-loader图片小于多少k用base64显示
          options: {
            limit: 100 * 1024, //小于100k用base64
            //build之后的目录分类
            outputPath: "static/images",
          },
        },
      },

      //babel-es6 转成es5-兼容处理
      {
        test: /\.js|jsx$/, //支持require('*.js')文件
        use: {
          loader: "babel-loader",
          options: {
            //用babel-loader 需要把es6-es5
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-runtime",
            ],
          },
        },
        include: path.resolve(__dirname, "src"), //需要转换的文件夹
        exclude: /node_modules/, //排除转换的文件夹
      },
    ],
  },

  //优化项启动后mode模式代码压缩不再生效，必须配置js压缩插件
  optimization: {
    minimizer: [
      new OptimizeCss(), //优化css:压缩css
      //压缩js
      new UglifyjsPlugin({
        cache: true, //是否用缓存
        parallel: true, //是否并发打包
        sourceMap: true, //es6映射es5需要用
      }),
    ],
  },

  //关闭 webpack 的性能提示
  performance: {
    hints: false,
  },
};
