// import React, { lazy, Suspense } from "react";
import React from "react";
//6.到组件内，接收store的数据
import { connect } from "react-redux";
/*
  首页：首页如果比较长，建议再做切片

*/
// const HeadComponnet = lazy(() => import('./components/xxx'));
// const FootComponnet = lazy(() => import('./components/xxx'));
// const NavComponnet = lazy(() => import('./components/xxx'));

class Indexpage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      //8.在react组件内部，调用redux里面的数据。
      //组件局部内的数据。类似vue的data
      num: props.state.counter.count,
    };
    console.log(props, 999);
  }

  increment() {
    //点击把redux里面count数量加1
    // console.log(++this.state.num);
    /*
      触发action的方法:
        this.props.dispatch({})
          * type: 必填，属性名必须是type.value值写成大写
          * payload : 提交载荷； 数据，这个属性名可以任取
    */
    this.props.dispatch({ type: "INC", data: { count: ++this.state.num } });
  }

  decrement() {
    //减1:改变redux里面的数据
    let num = --this.state.num;
    this.props.dispatch({ type: "DEC", data: { count: num } });
  }
  render() {
    console.log(this.props, 899); //dispatch/state
    return (
      <div>
        <h2>首页内容</h2>
        {/* <Suspense><HeadComponnet/></Suspense>
        <Suspense><FootComponnet/></Suspense>
        <Suspense><NavComponnet/></Suspense> */}
        <h3>redux的使用</h3>
        <p>数量:{this.state.num}</p>
        <button onClick={this.decrement.bind(this)}>-</button>
        <button onClick={this.increment.bind(this)}>+</button>
      </div>
    );
  }
}

//7.引入store的数据
export default connect((state) => {
  return {
    state: state,
  };
})(Indexpage);

//高阶函数

// function connect() {
//   return function(comName) {
//   }
// }

// connect()(Indexpage);
