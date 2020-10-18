import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <Link to="/home">首页</Link>
        </li>
        <li>
          <Link to="/news">新闻</Link>
        </li>
        <li>
          <Link to="/goods">商品分类</Link>
        </li>
        <li>
          <Link to="/users">个人中心</Link>
        </li>
        <li>
          <Link to="/login">登录</Link>
        </li>
      </ul>
    );
  }
}

export default NavBar;
