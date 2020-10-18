import React from "react";
import "./style.css";

/*
    button组件：插槽来实现
      * import Button from "./button";
      * <Button>提交</Button>
          * type:'submit'
          * className: 
          * style
          
*/

class Button extends React.Component {
  render() {
    // console.log(this.props);

    return (
      <React.Fragment>
        <button
          style={this.props.style}
          type={this.props.type}
          className={"btn " + this.props.className}
        >
          {this.props.children}
        </button>
      </React.Fragment>
    );
  }
}

//设置默认值
Button.defaultProps = {
  className: "cg-default",
  type: "button",
};

export default Button;
