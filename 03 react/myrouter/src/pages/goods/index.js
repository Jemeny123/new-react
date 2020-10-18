import React from "react";
// import { Link } from "react-router-dom";

/*
  首页

*/

class goodspage extends React.Component {
  constructor() {
    super();
    this.state = {
      navlist: [
        {
          tid: 1,
          title: "水果分类",
          data: [
            {
              gid: 1,
              name: "西瓜",
            },
            {
              gid: 2,
              name: "哈密瓜",
            },
          ],
        },
        {
          tid: 2,
          title: "海鲜分类",
          data: [
            {
              gid: 1,
              name: "皮皮虾",
            },
            {
              gid: 2,
              name: "小龙虾",
            },
          ],
        },
      ],
    };
  }

  //编程式导航:push()跳转某个页面，会被历史管理/replace()跳转某个页面，不被历史管理/go()前进后退n步/goBack()后退一步/goForward()前进一步
  pushPage(index) {
    //传参方式二:query
    //传参方式三:search
    console.log(this.props, 9999);
    this.props.history.replace({
      pathname: "/goods/type",
      search: "?id=1&title=西瓜" + index,
      query: {
        id: 1,
        title: "西瓜",
      },
    });
  }

  pushPage2(item) {
    //传参方式二:query
    //传参方式三:search
    console.log(item, "0000");
    this.props.history.push({
      pathname: "/goods/type",
      search: "?itemlist=" + JSON.stringify(item),
    });
  }
  render() {
    return (
      <div>
        <h1>二级菜单：商品内容</h1>
        <button onClick={this.props.history.goBack.bind(this)}>后退</button>
        <ul>
          {/* 动态路由传参 */}
          {/* 声明式导航 */}
          {/* <li>
            <Link to="/goods/type/1/苹果-西瓜">水果</Link>
          </li>
          <li>
            <Link to="/goods/type/2/皮皮虾-小龙虾">海鲜</Link>
          </li> */}
          <li onClick={this.pushPage.bind(this, 1)}>水果</li>
          <li onClick={this.pushPage.bind(this, 2)}>海鲜</li>

          {/* {this.state.navlist.map((item) => {
            return (
              <li key={item.tid} onClick={this.pushPage2.bind(this, item)}>
                {item.title}
              </li>
            );
          })} */}
        </ul>
        {/* 插槽接收子路由的那个子组件：类似我们vue里面的router-view */}
        {/* <div>{this.props.children}</div> */}
      </div>
    );
  }
}

export default goodspage;
