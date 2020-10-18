//根组件  App.js
import React from "react";
// import logo from "./logo.svg"; //引入一个图片 ：h5新增标签canvas(位图：放大会模糊，像素图) svg(矢量图：logo)
import "./assets/css/common/public.css";
//导入子组件
// import Home from "./components/Home";
// import About from "./components/About";
// import List from "./components/List";
// import PropsComponent from "./components/Props";
// import Event from "./components/Event";
// import Boot from "./components/Boot";
// import Allcheck from "./components/Allcheck";
// import PhoneEvent from "./components/PhoneEvent";
import Father from "./components/Father";
// import Live from "./components/Live";
// import Lazy from "./components/Lazy";
import CssModule from "./components/CssModule";

//函数组件：在里面return jsx代码(虚拟DOM)
function App() {
  return (
    <div className="App">
      {/* <h2>1.导入一个函数组件-Home组件</h2>
      <Home></Home>
      <h2>2.导入一个类组件-About组件</h2>
      <About></About>
      <h2>3.条件和列表渲染-List组件</h2>
      <List></List>
      <h2>4.组件通信props-Props组件</h2>
      <PropsComponent
        data="我喜欢react哦"
        isHide={false}
        num={18}
      ></PropsComponent>
      <h2>5.事件的细节-Event组件</h2>
      <Event></Event>
      <h2>6.bootstrapUI的使用-Boot组件</h2>
      <Boot></Boot> */}
      {/* <h2>7.全选和反选-Allcheck组件</h2>
      <Allcheck></Allcheck> */}
      {/* <h2>8.移动端事件-PhoneEvent组件</h2>
      <PhoneEvent></PhoneEvent> */}
      <h2>9.子父组件通信-Father组件</h2>
      <Father></Father>

      {/* <h2>10.生命周期-Live组件</h2>
      <Live /> */}

      {/* <h2>11.懒加载的运用-Lazy组件</h2>
      <Lazy /> */}

      <h2>12.CssModule模块化-CssModule组件</h2>
      <CssModule />
    </div>
  );
}

export default App;
