import React from "react";

/*
    生命周期过程演示
*/

class Live extends React.Component {
  //构造器==数据中心
  constructor() {
    super();

    this.state = {
      msg: "张玉环",
      name: "宋小女",
    };
    console.log(" constructor", 1);
  }

  //页面将要加载  16.10之后UNSAFE_componentWillMount
  //   UNSAFE_componentWillMount() {
  //     console.log("componentWillMount-挂载前");
  //   }

  //页面加载完成：类似vue里面的Mounted;ajax就可以写在这里
  componentDidMount() {
    console.log("componentDidMount-挂载后");
  }

  //在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。16.10之后UNSAFE_componentWillReceiveProps;
  //   UNSAFE_componentWillReceiveProps(newProps) {
  //     console.log("componentWillReceiveProps" + newProps);
  //   }

  //返回一个布尔值。false为不更新组件，true为更新，在组件接收到新的props或者state时被调用。在初始化时不被调用。可以在你确认不需要更新组件时使用。用于优化。类似vue里面watch
  shouldComponentUpdate(newProps, newState) {
    console.log(this.state.name, "old");
    console.log(newState, "new");
    if (this.state.name === newState.name) {
      return false; //不要render
    } else {
      return true; //可以往下面走，render渲染视图
    }
    // return true;
  }

  //在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。16.10之后UNSAFE_componentWillUpdate
  //   UNSAFE_componentWillUpdate(nextProps, nextState) {
  //     console.log("componentWillUpdate", nextProps, nextState);
  //   }

  //在组件完成更新后立即调用。在初始化时不会被调用。
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate", prevProps, prevState);
  }

  //在组件从 DOM 中移除的时候立刻被调用。（当离开页面时调用）；切换路由，销毁实例的时候。
  componentWillUnmount() {
    //回收工作:关掉定时器。关闭ws链接；回收全局的数据。销毁引用。ajax发送(轮询的时候)
    console.log("componentWillUnmount");
  }

  render() {
    console.log("render-挂载中");
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ name: "999" });
          }}
        >
          点击更新数据
        </button>
        <p>{this.state.name}</p>
        {/* <progress></progress> */}
      </div>
    );
  }
}

export default Live;
