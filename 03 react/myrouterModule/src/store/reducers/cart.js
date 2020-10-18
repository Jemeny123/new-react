//购物车
//登录相关的状态state和action准备
let cartState = {
  username: localStorage.getItem("name") ? localStorage.getItem("name") : "",
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
};

function cartReducer(state = cartState, action) {
  console.log(action);
  switch (action.type) {
    case "GETLIST":
    //获取购物车数据列表
    case "REM":
    //删除某个订单
    case "UPD":
    //修改数量
    default:
      return state;
  }
}

export default cartReducer;
