import React from "react";
import Son from "./Son";
import Button from "./button";
import Toast from "./Toast2";
import Confirm from "./confirm2";
import css from "../assets/css/list.css";
/*
    Father 就是父组件
        * 声明方法，绑定自定义事件(系统事件也可以)
            * 如果组件上的属性后面是普通数据(基本类型/数组)，则该属性就是普通属性
            * 如果该属性后面是方法，你可以理解为这个是自定义事件(本质是方法)
    Son 子组件
        * 绑定事件，触发父组件的方法

    需求：子组件向父组件传数据
*/

class Father extends React.Component {
  constructor() {
    super();
    this.state = {
      tex: "若微",
      username: "",
      password: "",
    };
  }
  //该方法用于接收子组件传过来的数据
  //   getSonData(val) {
  //     console.log(val, 678);
  //   }
  del() {
    this.setState({
      tex: "",
    });
  }

  //改变用户名 v-model
  add1(ev) {
    this.setState({
      username: ev.target.value,
    });
  }

  //改变密码 v-model
  add2(ev) {
    this.setState({
      password: ev.target.value,
    });
  }

  checkFrom() {
    let { username, password } = this.state;
    if (!username.trim()) {
      //没有输入数据
      Toast({
        message: "用户名不能为空", //必选
        time: 3000, //可选
        done: () => {
          //可选
          // console.log("弹窗结束1");
        },
      });
    } else {
      if (!password.trim()) {
        //没有输入数据
        Toast({
          message: "密码不能为空",
          time: 3000,
          done: () => {
            // console.log("弹窗结束2");
          },
        });
      } else {
        //发送ajax.注册功能
      }
    }
  }

  //confirm弹窗的使用
  delName() {
    // // console.log("点击了");
    //款式一的用法:confirm
    // Confirm("您确定要提交吗2", [
    //   {
    //     tex: "取消2",
    //     callback: () => {
    //       // console.log("取消删除");
    //     },
    //   },
    //   {
    //     tex: "确定2",
    //     callback: () => {
    //       // console.log("确定删除");
    //       this.setState({
    //         tex: "",
    //       });
    //     },
    //   },
    // ]);

    //款式2:confirm2
    // Confirm({
    //   message: "您确定要提交吗？", //选填
    //   sureTex: "确定", //选填
    //   cancalTex: "取消", //选填
    //   sureFn: () => {
    //     //必填
    //     this.setState({
    //       tex: "",
    //     });
    //   },
    //   cancleFn: () => {
    //     //选填
    //     console.log("取消了");
    //   },
    // });

    //简写
    Confirm({
      sureFn: () => {
        //必填
        this.setState({
          tex: "",
        });
      },
    });
  }

  render() {
    return (
      <div>
        {/* <Son getdata={this.getSonData} name={this.state.tex}></Son> */}
        {/* <Son delUser={this.del.bind(this)} name={this.state.tex}></Son> */}
        <Son onClick={this.del.bind(this)} name={this.state.tex}></Son>
        <h3>9.1 使用自己封装的button组件</h3>
        <Button type="submit" style={{ width: "120px", height: "50px" }}>
          提交
        </Button>
        <Button className="cg-danger">删除</Button>
        <Button className="cg-primary" name="重置666">
          重置
        </Button>
        <Button>删除我吗</Button>
        <Button>确定</Button>
        <h3>9.2 用户注册-Toast组件的使用</h3>
        用户名:
        <input
          type="text"
          value={this.state.username}
          onChange={(ev) => {
            this.add1(ev);
          }}
        />{" "}
        <br />
        密码:
        <input
          type="text"
          value={this.state.password}
          onChange={(ev) => {
            this.add2(ev);
          }}
        />{" "}
        <br />
        <button onClick={this.checkFrom.bind(this)}>注册</button>
        <h3 className="redf">9.3 confirm组件的调用</h3>
        <button onClick={this.delName.bind(this)}>删除</button>
        {/* <Confirm /> */}
        <h3 className={css.greenf2}>模块化webpack的方式</h3>
        <h4>我是father里面的h4</h4>
        <h3 class={css.mycolor}>我是class名字的样式</h3>
      </div>
    );
  }
}

export default Father;

//子组件:数据在父组件，子组件想删除数据的时候

// div.onclick = {
//     getdata('数据');//实参
// }

//父组件

// function getdata(val) {
//     getSonData(val);
// }

// function getSonData(val) {
//     console.log(val);
// }
