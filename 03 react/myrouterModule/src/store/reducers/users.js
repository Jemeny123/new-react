//登录功能，要用到api接口数据，引入api
// import usersApi from "../../api/users";
import {
  setToken,
  setUser,
  getToken,
  getUser,
  logOut,
  setUid,
} from "../../untils/auth";

//登录相关的状态state和action准备
let userState = {
  username: getUser() ? getUser() : "",
  token: getToken() ? getToken() : "",
};

function userReducer(state = userState, action) {
  // console.log(action, 899);
  switch (action.type) {
    case "LOGIN":
      //发送ajax验证该用户：账号密码都正确才能登录
      //建议ajax请求还是写在组件内。因为该请求只有登录组件需要用。
      // usersApi.login(action.data.username, action.data.password).then((res) => {
      //   // console.log(res, 789);
      //   if (res.data.flag) {
      //     //登录成功：设置存到本地cookie
      //     setToken(res.data.token, 7);
      //     let obj = {
      //       username: action.data.username,
      //       uid: res.data.uid,
      //     };
      //     setUser(JSON.stringify(obj), 7);

      //   } else {
      //     console.log("登录失败");

      //   }
      // });
      // console.log(action, 999);
      // localStorage.setItem("name", action.data.username);
      // localStorage.setItem("token", action.data.token);
      setToken(action.data.token, action.data.keep ? action.data.keep : "");
      setUser(action.data.username, action.data.keep ? action.data.keep : "");
      setUid(action.data.uid, action.data.keep ? action.data.keep : "");
      return { ...state, ...action.data };
    case "LOGOUT":
      // localStorage.removeItem("name");
      // localStorage.removeItem("token");
      logOut();
      userState = { username: "", token: "" };
      return { ...state, ...userState };
    default:
      return state;
  }
}

export default userReducer;
