import React from "react";
import { connect } from "react-redux";
import actions from "../../store/actions";
import TabelUser from "../../components/TabelUser";
import usersApi from "../../api/users";
import { message } from "antd";
/*
  首页：首页如果比较长，建议再做切片

*/

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      keep: false,
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
    // let data = { username: this.state.username, password: this.state.password };
    // this.props.dispatch(actions.users.logins(data));
    // localStorage.setItem("name", this.state.username);
    // localStorage.setItem("token", "123456");
    // this.props.history.push("/users");

    usersApi.login(this.state.username, this.state.password).then((res) => {
      // console.log(res, 789);
      if (res.data.flag) {
        //登录成功：把数据发给redux，帮我存储状态信息
        //判断是否保留7天
        let data = {
          username: this.state.username,
          token: res.data.token,
          uid: res.data.uid,
        };
        if (this.state.keep) {
          data.keep = 7;
        }

        this.props.dispatch(actions.users.logins(data));
        //提示成功了
        message.success("登录成功");
        this.props.history.push("/users");
      } else {
        console.log("登录失败");
        //提示失败
        message.error("登录失败");
      }
    });
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
        <div style={{ marginTop: "50px" }}>
          <h1>antd的使用</h1>
          <TabelUser />
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ state }))(LoginPage);
