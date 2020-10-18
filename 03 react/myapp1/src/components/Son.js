import React from "react";

class Son extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <div>
        {/* <h2 onClick={this.props.getdata.bind(this, "我是子组件的内容")}>
          Son组件
        </h2> */}

        {/* <p>用户:{this.props.name}</p>
        <button onClick={this.props.delUser}>删除该用户</button>
      </div> */}

        <p>用户:{this.props.name}</p>
        <button onClick={this.props.onClick}>删除该用户</button>
      </div>
    );
  }
}

export default Son;
