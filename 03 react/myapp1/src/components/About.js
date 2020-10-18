import React from "react";

/*
    组件的分类：组件名必须首字母大写
        1. 函数组件：（无状态组件(没有state)、受控组件(数据是由父组件传入)、UI组件(样式结构)
            * 就是一个普通的函数：里面必须return jsx代码(虚拟DOM)
        2.类组件：（有状态组件、非受控组件、容器组件) 有state有生命周期函数
            * class extends construtor super()
            * construtor和render里面是含有this的，this指向组件实例
            * 其他普通的方法，this的指向会出错(有事件绑定)：需要修正指向 bind()
            * bind()只会触发一次
*/

//2.类组件：
class About extends React.Component {
  //构造器
  constructor() {
    super(); //继承属性

    //状态==数据==相当于vue里面的data
    this.state = {
      name: "我是数据",
      count: 0,
    };

    this.add = this.add.bind(this); //修正指向：方式一
  }

  //普通方法
  add(n) {
    // console.log("666");
    // console.log(this.state.count, 999); //本来this指向button。因为用了bind(this)修正指向，修正this指向是组件实例
    // this.state.count += 1; //这个方式确实让数据变化了。但是不会作用到this.state里面。只作用于当前作用域
    // console.log(this.state.count, 888);

    //用指定的方式修改state
    this.setState({
      count: this.state.count + n,
    });
  }

  //模板:里面放的是jsx代码
  render() {
    let name = "我是render里面的数据";
    return (
      <div>
        <h3>render里面普通变量数据:{name}</h3>
        <h3>state里面的数据:{this.state.name}</h3>
        {/* onClick必须是驼峰命名法 */}
        {/* <button onClick={this.add}>加数量</button> */}
        {/* 修正this的指向：bind写两次的话，只会在第一次生效 */}
        <button onClick={this.add.bind(this, 2)}>加数量</button>
        <p>数量:{this.state.count}</p>
      </div>
    );
  }
}

export default About;

// // class Farther {//父类
// //     //构造器
// //     constructor() {
// //         this.name = '章子怡';
// //     }
// //     showName() {
// //         console.log(this.name);
// //     }
// add() {

// }
// // }

// let f = new Farther();
// console.log(f.name);
// f.showName();

// //写一个子类：方法和属性都是继承父类的
// class Son extends Farther{//extends继承方法
//     constructor() {
//         super();//继承属性
//     }
// }

// let s = new Son();
// console.log(s.name);
// s.showName();

//如何修正this的指向
// btn.onclick = function () {
//   console.log(this); //this->btn
// };

// btn.onclick = function () {
//   console.log(this); //this->外层this
// }.bind(this);

// btn.onclick = () => {
//   console.log(this); //this->外层this
// };

// let _this = this;
// btn.onclick = function() {
//   console.log(_this); //_this->外层this
// };

//vue的组件  about.vue

// {
/* <template></template>
<script>
  export default {

  }
</script> */
// }
