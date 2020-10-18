import React from "react";
import { connect } from "react-redux";

/*
  个人中心
*/

class Userspage extends React.Component {
  logout() {
    //退出功能
    this.props.dispatch({ type: "LOGOUT" });
    // localStorage.removeItem("name");
    // localStorage.removeItem("token");
    this.props.history.push("/login");
  }
  render() {
    console.log(this.props, 123);
    // let name = localStorage.getItem("name");
    return (
      <div>
        <h2>个人中心</h2>
        <p>{this.props.state.users.username},你好!</p>
        <button onClick={this.logout.bind(this)}>退出</button>

        <h3>redux的使用</h3>
        <p>数量：{this.props.state.counter.count}</p>
      </div>
    );
  }
}

// 原本的写法
// export default connect((state) => {
//   return {
//     state: state,
//   };
// })(Userspage);

//简写
export default connect((state) => ({ state }))(Userspage);
