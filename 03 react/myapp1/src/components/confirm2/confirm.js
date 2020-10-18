import React from "react";
import "./style.css";
/*
    confirm弹窗的封装:款式2

*/

class Confirm extends React.Component {
  //取消
  cancelfn() {
    this.props.list.cancleFn();
    document.body.removeChild(this.props.div);
  }

  //确定
  surefn() {
    this.props.list.sureFn();
    document.body.removeChild(this.props.div);
  }

  render() {
    console.log(this.props, 999);
    let { message, sureTex, cancalTex } = this.props.list;
    return (
      <div className="cg-confirm-mask">
        <div className="confirm">
          <div className="message">{message}</div>
          <div className="handle">
            <div className="button" onClick={this.cancelfn.bind(this)}>
              {cancalTex}
            </div>
            <div className="button" onClick={this.surefn.bind(this)}>
              {sureTex}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
