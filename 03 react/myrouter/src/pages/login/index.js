import React from "react";
import {connect} from 'react-redux'
/*
  首页：首页如果比较长，建议再做切片

*/

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  //v-model
  getName(username) {
    this.setState({
      username,
    });
  }
  //v-model
  getPassword(password) {
    this.setState({
      password,
    });
  }

  //登录功能
  loginFn() {
    //发送ajax:成功登录，获取token和用户信息，获取到信息存到本地
    let data = {username:this.state.username,token : '123456'};
    this.props.dispatch({type:'LOGIN',data})
    // localStorage.setItem("name", this.state.username);
    // localStorage.setItem("token", "123456");
    this.props.history.push("/users");
  }

  render() {
    return (
      <div>
        <h2>登录页</h2>
        用户:
        <input
          type="text"
          onChange={(ev) => {
            this.getName(ev.target.value);
          }}
        />{" "}
        <br />
        密码:
        <input
          type="text"
          onChange={(ev) => {
            this.getPassword(ev.target.value);
          }}
        />{" "}
        <br />
        <button onClick={this.loginFn.bind(this)}>登录</button>
      </div>
    );
  }
}

export default connect(state=>({state}))(LoginPage);
