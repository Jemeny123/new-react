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

export default counterReducer;