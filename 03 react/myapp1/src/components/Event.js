import React from "react";
// import "../assets/css/bootstrap.min.css";
/*
    1.列表渲染和条件渲染
        1.条件渲染：下拉菜单

*/

class Event extends React.Component {
  constructor() {
    super();
    //状态==数据
    this.state = {
      count: 1,
      num: 1,
    };
  }
  //点击加2
  add(n) {
    this.setState({
      count: this.state.count + n,
    });
  }

  //点击加3
  add2 = () => {
    this.setState({
      count: this.state.count + 3,
    });
  };

  //点击加4
  add3(n) {
    this.setState({
      count: this.state.count + n,
    });
  }

  //范围限制
  scopeOf(val) {
    console.log("范围限制");
    //如果输入了非数字，替换掉
    if (val < 1) {
      //下限
      val = 1;
    } else if (val > 10) {
      val = 10; //库存量的限制：上限
    }
    return val;
  }

  //功能：手动输入数据进行检测
  watchNum(ev) {
    // console.log(ev.target.value, 999);
    let val = ev.target.value;
    val = val.replace(/[\D]/g, ""); //如果输入了非数字，就替换掉(去掉)
    val = val === "" ? "1" : this.scopeOf(val);
    this.setState({ num: val });
  }

  //功能：点击加1
  increment() {
    let val = this.state.num + 1;
    val = this.scopeOf(val);
    this.setState({ num: val });
  }

  //功能：点击减1
  decrement() {
    let val = this.state.num - 1;
    val = this.scopeOf(val);
    this.setState({ num: val });
  }

  render() {
    return (
      <div>
        <p>数量:{this.state.count}</p>
        {/* 第一种绑定事件的方式，bind修正指向 */}
        <button onClick={this.add.bind(this, 2)}>加2</button>
        <button onClick={this.add2}>加3</button>
        <button
          onClick={() => {
            this.add3(4);
          }}
        >
          加4
        </button>

        <h3>数量的控制</h3>
        <button onClick={this.decrement.bind(this)}>减1</button>
        <input
          type="text"
          value={this.state.num}
          onChange={(ev) => {
            this.watchNum(ev);
            // this.setState({ num: ev.target.value }); v-m
          }}
        />
        {/* m-v */}
        {/* <p>模拟数据的双向绑定v-model:{this.state.num}</p> */}
        <button onClick={this.increment.bind(this)}>加1</button>
      </div>
    );
  }
}

export default Event;
