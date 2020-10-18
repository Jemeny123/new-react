//1.安装redux和react-redux插件
//2.引入redux和react-redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import counterReducer from "./counter";
import thunk from "redux-thunk"; //扩充redux的功能:让redux支持异步
import userReducer from "./users";
// import cartReducer from "./cart";

//4.把数据和方法放到redux的仓库里面:存入仓库
let store = createStore(
  //redux的模块化，类似vuex里面的modules
  combineReducers(
    {
      counter: counterReducer,
      users: userReducer,
      // cart: cartReducer,
    },
    applyMiddleware(thunk)
  )
);

export default store;
