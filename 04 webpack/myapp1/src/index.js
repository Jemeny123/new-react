import "./assets/css/index/index.css";
// import "./assets/sass/list.scss";

function show() {
  console.log("打包webpack");
}

show();

//引入图片测试
var image = new Image(); //要用var不要用let定义，因为uglifyjs(js压缩)不支持es6
image.src = require("./assets/images/1.png").default;
document.body.appendChild(image);

//es6
let showme = () => {
  let a = 9;
  let b = 10;
  return a + b;
};

alert(showme());
