//根组件  App.js
import React from "react";
import RouterComponent from "./routers/router";
//函数组件：在里面return jsx代码(虚拟DOM)
function App() {
  return (
    <div className="App">
      
      <RouterComponent />
    </div>
  );
}

export default App;
