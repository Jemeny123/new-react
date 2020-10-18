import React from "react";
import "./style.css";
class ReactDOM extends React.Component {
  render() {
    console.log(this.props, "000");
    return <div className="cg-toast">{this.props.optobj.message}</div>;
  }
}

export default ReactDOM;
