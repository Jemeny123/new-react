//主入口文件 index.js 相当于我们vue里面的main.js
import React from "react"; //引入react核心库
import ReactDOM from "react-dom"; //引入我们DOM的核心
import "./assets/css/index.css"; //引入样式
import App from "./App"; //react的根组件：按住ctrl+左键 ，快速去到该文件
import * as serviceWorker from "./serviceWorker"; //引入进程服务，serviceWorker：缓存

//React.StrictMode 严格模式，需要语法检测的组件，就用这个组件包起来即可
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister(); //不启用离线缓存功能:特殊的项目才需要使用，小说网站

/*
  ReactDOM.render(参数一，参数二)
    1.参数一:内容,虚拟DOM(组件/jsx)
      1.1 方法一:React.createElement(component, props, ...children)
        参数一:component 组件/节点 h2
        参数二:props 属性 {title:'我们去爬山吗',name:'隐蔽的角落'}
        参数三:children 子节点，如果是多个子节点，写成数组；文本节点直接写
      1.2 方式二:jsx 用jsx语法写模板，bable会编译成虚拟DOM

    2.挂载点:到时候内容会渲染到这个节点里面(相当于我们vue里面的el)
*/

//方法一:React.createElement(component, props, ...children) 不推荐这种写法,太麻烦。性能很好，得到的就是虚拟DOM
// ReactDOM.render(
//   //<div><h2>好啊，什么时候约?</h2><ul></ul></div>
//   React.createElement("div", { title: "我们去爬山吧" }, [
//     React.createElement("h2", null, "好啊，什么时候约?"),
//     React.createElement("ul", null, [
//       React.createElement("li", null, "苹果"),
//       React.createElement("li", null, "雪梨"),
//     ]),
//   ]),
//   document.querySelector("#root")
// );

//方式二:jsx 用jsx语法写模板，bable会编译成虚拟DOM
// let username = "小花花";
// let st = {
//   color: "#58bc58",
// };
// let redfont = '<span style="color:red">最新</span>游戏';
// // console.log("username", username)
// ReactDOM.render(
//   //在标签里面的是jsx语法，标签外面就是js
//   //<div><h2>好啊，什么时候约?</h2><ul></ul></div>
//   <div title="我们去爬山吧">
//     <h2 title="榴莲好好吃">好啊，什么时候约?--{username}</h2>
//     <ul>
//       {/* 遇到class改成className,遇到for改成htmlFor */}
//       <li className="red">苹果</li>
//       <li style={st}>雪梨</li>
//     </ul>
//     <label htmlFor="name">用户名:</label>
//     <input type="text" value="" placeholder="请输入用户名" id="name" />
//     {/* 默认情况不会帮你编译html：相当于vue里面的v-text */}
//     <div>{redfont}</div>
//     {/* 如果想编译html，可以借助这个属性设置(dangerouslySetInnerHTML),属性必须写成 __html,但是这种写法是不够安全的，建议少用 */}
//     <div dangerouslySetInnerHTML={{ __html: redfont }}></div>
//     <div>
//       <span style={{ color: "red" }}>最新</span>游戏
//     </div>
//   </div>,
//   document.querySelector("#root")
// );
