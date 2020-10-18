import React from "react";
import "./style.css";
/*
    confirm弹窗的封装

*/

class Confirm extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  getData(data) {
    // console.log(data, 888);
    this.setState(
      {
        mes: data.mes,
        arr: data.arr,
      },
      () => {
        // console.log(this.state, "拿到了");
      }
    );
  }

  //按钮的功能
  btnfn(fn, divElement) {
    if (fn) {
      //1.执行回调
      fn();
      //2.关掉弹窗
      //   console.log(divElement, 999);
      //   console.log(this.props, 333);
    }
    document.body.removeChild(this.props.div);
  }

  render() {
    console.log(this.props, 999);
    return (
      <div className="cg-confirm-mask">
        <div className="confirm">
          <div className="message">{this.props.mes}</div>
          <div className="handle">
            {this.props.arr.map((item) => {
              return (
                <div
                  key={item.tex}
                  className="button"
                  onClick={this.btnfn.bind(this, item.callback)}
                >
                  {item.tex}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
