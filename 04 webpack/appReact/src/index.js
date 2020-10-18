//在index.js写入react代码：
import React from "react";
import ReactDOM from "react-dom";

import Headcomponent from "./componnets/header";
class App extends React.Component {
  render() {
    return (
      <div>
        Hello React!
        <Headcomponent />
        <img src="http://img8-build.jiwu.com/album/manual/2020/07/28/113247224832.jpg/wap$240x160" />
      </div>
    );
  }
}
export default App;

ReactDOM.render(<App />, document.getElementById("root"));
