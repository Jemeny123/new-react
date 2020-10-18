import React from "react";
import "../assets/css/list.css";
/*
    移动端常用事件：
        * ontouchstart 手指按下的时候(相当于onmousedown)
        * ontouchmove 手指抚摸的时候(相当于onmousemove)
        * ontouchend 手指离开的时候(相当于onmouseup)

*/

class PhoneEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      left: 10,
      top: 20,
    };
    this.disX = 0; //相对距离:按下的时候，手指离元素最左侧距离
    this.disY = 0;
  }
  //手指按下的时候
  touchstart(ev) {
    // console.log(this, 999);
    // console.log("手指按下的时候ontouchstart");
    console.log(ev.touches[0]);
    this.disX = ev.touches[0].pageX - this.state.left;
    // console.log("PhoneEvent -> touchstart -> disX", this.disX);
    this.disY = ev.touches[0].pageY - this.state.top;
    // console.log("PhoneEvent -> touchstart -> disY", this.disY);
  }
  touchmove(ev) {
    // console.log("手指抚摸的时候ontouchmove");
    let left = ev.touches[0].pageX - this.disX;
    let top = ev.touches[0].pageY - this.disY;
    this.setState({
      left,
      top,
    });
  }
  touchend() {
    console.log("手指离开的时候ontouchend");
  }

  render() {
    return (
      <div>
        <div
          style={{ left: this.state.left + "px", top: this.state.top + "px" }}
          className="movebox"
          onTouchStart={(ev) => {
            this.touchstart(ev);
          }}
          onTouchMove={(ev) => {
            this.touchmove(ev);
          }}
          onTouchEnd={this.touchend}
        ></div>
      </div>
    );
  }
}

export default PhoneEvent;
