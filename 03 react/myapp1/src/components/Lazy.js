import React, { lazy, Suspense } from "react";
// import Allcheck from "./Allcheck";
let Allcheck = lazy(() => import("./Allcheck")); //引入，异步的方式
/*
    优化网站：
        * html:语义化标签,seo搜索引擎优化
        * css: 模块，公共样式提取
        * js:封装代码/模块化/面向写法
        * 图片：小图片，做成精灵图(雪碧图)
        * 资源：打包(html/css/js/图片) vue:vue-cli   react:create-react-app  webpack/gulp
        * 减少ajax次数:节流/防抖
        * 减少DOM操作：框架 虚拟DOM  jsx
        * 懒加载：
            * 页面滚动底部：加载下一页
            * 分页：先请求第一页数据，点击页码的时候再按需请求。(先获取很多数据存到本地，从本地获取第一页数据渲染。翻页的时候就不用再请求了)
            * 切片懒加载：lazy+Suspense；把下面未呈现的内容，切片，迟一点再载入。(解决首屏卡顿的问题。单页面应用常见的问题)
            * 路由懒加载
        * 按需引入：css/js/外部UI组件
*/

class Lazy extends React.Component {
  constructor() {
    super();
    this.state = {
      isshow: false,
    };
  }
  render() {
    return (
      <div>
        <Suspense fallback="加载中……">
          <button
            onClick={() => {
              this.setState({
                isshow: !this.state.isshow,
              });
            }}
          >
            加载数据
          </button>
        </Suspense>
        {this.state.isshow && (
          <Suspense fallback="加载中……">
            <Allcheck></Allcheck>
          </Suspense>
        )}
      </div>
    );
  }
}

export default Lazy;


