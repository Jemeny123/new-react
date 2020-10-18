import React from "react";
import Confirm from "./confirm";
import ReactDOM from "react-dom";

export default function (mes, arr) {
  //   console.log("arr", arr);
  //   console.log("mes", mes);
  /*
        * mes : '您确定要提交吗'
        * arr ： 数组
        [
            {
                tex:'取消',
                callback:()=> {
                console.log('取消删除');
                }
            },
            {
                tex:'确定',
                callback:()=> {
                console.log('确定删除');

                }
            }
        ]
    */

  let div = document.createElement("div"); //创建div
  document.body.appendChild(div); //div插入到body节点
  let confirm = ReactDOM.render(<Confirm mes={mes} arr={arr} div={div} />, div); //添加子节点
  confirm.getData({ mes, arr });
}
