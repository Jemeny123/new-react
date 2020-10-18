import React from "react";
import usersApi from "../../api/users";
/*
  新闻页：获取数据渲染 axios的使用案例

*/

class NewsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      dataList: {},
    };
  }
  //点击按钮发送ajax获取用户列表
  getData() {
    usersApi.getList(1, 20, {}).then((res) => {
      console.log(res);
      this.setState({
        dataList: res.data,
      });
    });
  }

  //进入页面就马上获取数据渲染
  componentDidMount() {
    // this.getData();
  }

  //验证用户名
  checkName() {
    usersApi.checkName("王昭君").then((res) => {
      console.log(res);
    });
  }

  reg() {
    usersApi.reg("王昭君", "123456").then((res) => {
      console.log(res);
    });
  }

  render() {
    let { data } = this.state.dataList;
    // console.log(data, 123);
    return (
      <div>
        <h2>新闻页内容</h2>
        <h3>axios的使用-获取用户列表</h3>
        <button onClick={this.getData.bind(this)}>获取数据列表</button>
        <ul>
          {data &&
            data.map((item, index) => {
              return (
                <li key={item._id}>
                  {index + 1}.{item.name}-{item.sex}，来自-{item.address}
                </li>
              );
            })}
        </ul>

        <h3>axios的使用-验证用户名是否存在</h3>
        <button onClick={this.checkName.bind(this)}>验证用户名</button>
        <h3>axios的使用-注册功能</h3>
        <button onClick={this.reg.bind(this)}>注册</button>
      </div>
    );
  }
}

export default NewsPage;
