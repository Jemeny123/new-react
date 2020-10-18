//主入口 index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//1.安装redux和react-redux插件
//2.引入redux和react-redux
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

//3.准备数据state和方法 action
let defaultstate = { count: 10 }; //公共的数据
function counterReducer(state = defaultstate, action) {
  //函数名可以随便取
  // console.log(action, 789);
  // state = action.data; //引用的写法：会引起问题。浅拷贝
  switch (action.type) {
    case "INC":
      // console.log("执行加功能");
      return Object.assign({}, state, action.data);
    case "DEC":
      return { ...state, ...action.data };
    default:
      return state;
  }
}

//登录相关的状态state和action准备
let userState = {
  username: localStorage.getItem("name") ? localStorage.getItem("name") : "",
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
};

function userReducer(state = userState, action) {
  console.log(action);
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("name", action.data.username);
      localStorage.setItem("token", action.data.token);
      return { ...state, ...action.data };
    case "LOGOUT":
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      userState = { username: "", token: "" };
      return { ...state, ...userState };
    default:
      return state;
  }
}

//4.把数据和方法放到redux的仓库里面:存入仓库
let store = createStore(
  //redux的模块化，类似vuex里面的modules
  combineReducers({
    counter: counterReducer,
    users: userReducer,
  })
);

ReactDOM.render(
  <React.StrictMode>
    {/* 5.把仓库的数据和方法注入到react组件里面，我们就可以去到组件里面接收数据了。 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
