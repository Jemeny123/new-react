import React from "react";
import css from "../assets/css/mycss.module.css";
import style from "../assets/css/mymodul.css";
import mysass from "../assets/scss/list.module.scss";
console.log(css, 999);
console.log(style, 8888);
// console.log(style, 999);
/*
   css的模块化设置：
    * 方式一:因为webpack本身就是支持css模块化，安装指定的格式使用即可。
        * css文件名： xxx.module.css
        * 引入组件的时候: import css from "../assets/css/xxx.module.css";
        * 在render里面调用的时候: className={css.yyy}
        
    * 方式二:npm run eject 暴露webpack配置文件。查找css-loader
        配置webpack,让某些目录下的css是模块化的，某些不是模块化的，这样就可以直接引入css文件，使用
        * css文件名不用加module: list.css
        * 引入组件的时候: import css from "../assets/css/xxx.module.css";
        * 在render里面调用的时候: className={css.yyy}
        * 全局目录：
            * node_modules
            * src/assets/css/common
            * components
            * 
    * 即使样式是写在模块sass或css里面，标签选择器都是全局的：建议不要直接写标签选择器
*/

class CssModule extends React.Component {
  render() {
    return (
      <div>
        <h3 className={css.redf}>css的模块化-方式一:加module的方式</h3>
        <h3 className={style.greenf}>css的模块化-方式二:webpack配置方式</h3>
        <div className={mysass.box}>
          <h3>我是sass样式</h3>
        </div>
        <h4>我是h4标签-</h4>
      </div>
    );
  }
}

export default CssModule;
