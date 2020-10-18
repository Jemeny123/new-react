import React from "react";
import PropTypes from "prop-types";
/*
   组件通信：
     1.props父子组件通信
     2.自定义事件
     3.插槽

*/

//子组件：接收外部props数据
class PropsComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      total: 10,
    };
    this.dataList = {};
  }

  change() {
    //改变总数量：20
    this.setState(
      {
        total: 20,
      },
      () => {
        //获取最新的总数量：setState里面有两个参数：参数一是对象，用于修改state的数据；参数二:选填，回调函数，解决异步
        console.log(" total", this.state.total);
      }
    );
  }
  render() {
    let props = this.props;
    this.dataList = this.props;
    return (
      // 方式一:直接用this.props.key获取父组件传入的数据
      //   <div>
      //     子<h2>组件-PropsComponent</h2>
      //     <p>
      //       {this.props.data}-{this.props.num}
      //     </p>
      //     {this.props.isHide && (
      //       <div
      //         style={{
      //           width: "100px",
      //           height: "100px",
      //           background: "#ccc",
      //           margin: "0 auto",
      //         }}
      //       ></div>
      //     )}
      //   </div>
      <div>
        子<h2>组件-PropsComponent</h2>
        <p>
          {props.data}-{props.num}
        </p>
        {props.isHide && (
          <div
            style={{
              width: "100px",
              height: "100px",
              background: "#ccc",
              margin: "0 auto",
            }}
          ></div>
        )}
        {/* 按钮 */}
        <p>总数量:{this.state.total}</p>
        <button onClick={this.change.bind(this)}>改变state</button>
      </div>
    );
  }
}

//检测传入的props数据类型(根据实际需要，看要不要检测)
PropsComponent.propTypes = {
  data: PropTypes.string.isRequired, //data是字符串且必须要传入
  isHide: PropTypes.bool,
  num: (props, propName, comName) => {
    console.log("comName", comName);
    console.log("propName", propName);
    console.log("props", props);
    if (props.num < 18) {
      return new Error("未成年不允许注册");
    }
  },
};

//设置默认值
PropsComponent.defaultProps = {
  data: "我还是喜欢vue多一点",
};

export default PropsComponent;
