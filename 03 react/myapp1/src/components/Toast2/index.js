// import React from "react";
// import ReactDOM from "react-dom"; //引入我们DOM的核心

import "./style.css";
/*
    Toast 组件的主入口

*/
export default function (opt) {
  console.log(opt, 999);
  let div = document.createElement("div"); //调用这个方法的时候，立马创建一个div
  document.body.appendChild(div); //div插入到body
  div.className = "cg-toast"; //添加类名
  div.innerHTML = opt.message; //添加内容
  let time = opt.time ? opt.time : 2000; //有传时间就用传过来的，没有就默认两秒钟
  setTimeout(() => {
    //3秒后消失
    div.style.animation = "hideToast 0.3s forwards";
    // document.body.removeChild(div);
    setTimeout(() => {
      document.body.removeChild(div);
    }, 350);
    if (opt.done) {
      opt.done();
    }
  }, time);
}
