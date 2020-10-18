import React from "react";
import ReactDOM from "react-dom"; //引入我们DOM的核心
import ToastCon from "./toast";

/*
    Toast 组件的主入口

*/
export default function (opt) {
  console.log(opt, 999);
  let div = document.createElement("div");
  document.body.appendChild(div);
  ReactDOM.render(<ToastCon optobj={opt} />, div);
  setTimeout(() => {
    div.querySelector(".cg-toast").style.animation = "hideToast 0.3s forwards";
    // document.body.removeChild(div);
    setTimeout(() => {
      document.body.removeChild(div);
    }, 350);
    if (opt.done) {
      opt.done();
    }
  }, opt.time);
}
