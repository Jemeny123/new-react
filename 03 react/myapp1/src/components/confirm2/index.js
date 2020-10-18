import React from "react";
import Confirm from "./confirm";
import ReactDOM from "react-dom";

export default function (opt) {
  let defaultOpt = {
    message: "您确定要提交吗？", //选填
    sureTex: "确定", //选填
    cancalTex: "取消", //选填
    cancleFn: () => {}, //选填
  };

  //替补关系
  Object.assign(defaultOpt, opt); //用是用默认参数defaultOpt

  let div = document.createElement("div"); //创建div
  document.body.appendChild(div); //div插入到body节点
  ReactDOM.render(<Confirm list={defaultOpt} div={div} />, div); //添加子节点
}
