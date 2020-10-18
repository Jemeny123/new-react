import React from "react";
import "../assets/css/list.css";
/*
    1.列表渲染和条件渲染
        1.条件渲染：下拉菜单
            * 三目运算符控制
            * 面试题:不能显示三目的否则:与运算符
            * if else
        2.列表渲染
*/

class List extends React.Component {
  constructor() {
    super();

    //状态
    this.state = {
      isShow: false,
      goodsList: [
        {
          id: 1,
          title: "精品女装",
        },
        {
          id: 2,
          title: "时尚男装",
        },
        {
          id: 3,
          title: "儿童服装",
        },
      ],
      activeCon: "精品女装",
    };
  }

  //点击按钮改变状态:下拉菜单
  chage() {
    this.setState({
      isShow: !this.state.isShow,
    });
  }

  getData(ev) {
    // console.log("点击了li");
    // console.log(ev.target.innerHTML);
    this.setState({
      activeCon: ev.target.innerHTML,
    });
  }

  render() {
    let box = "";
    if (this.state.isShow) {
      box = <div className="box"></div>;
    }
    return (
      <div id="con">
        <h3>显示隐藏下拉菜单</h3>
        <button onClick={this.chage.bind(this)}>显示隐藏</button>
        {/* 1.三目运算符写法 相当于v-if */}
        {/* {this.state.isShow ? <div className="box"></div> : ""} */}
        {/* 2.与运算符   相当于v-if */}
        {/* {this.state.isShow && <div className="box"></div>} */}
        {/* 3.用传统的if   相当于v-if */}
        {box}
        {/* 用样式来控制显示和隐藏:相当于v-show */}
        {/* <div className={this.state.isShow ? "show" : ""}></div> */}

        <h3>数据列表渲染</h3>
        <ul>
          {this.state.goodsList &&
            this.state.goodsList.length > 0 &&
            this.state.goodsList.map((item) => {
              return (
                <li key={item.id} onClick={this.getData.bind(this)}>
                  {item.title}
                </li>
              );
            })}
        </ul>
        <p>内容:{this.state.activeCon}</p>
      </div>
    );
  }
}

export default List;

// let a = 3;
// let b = 3;
// let c = d = 0;

// if((c=a-b) && (d=a+b)) {

// }
//面试题: abcd分别是多少
