import React from "react";

class AllCheck extends React.Component {
  constructor() {
    super();

    //数据
    this.state = {
      users: [
        {
          uid: "1",
          name: "司徒家辉",
          ischecked: false,
        },
        {
          uid: "2",
          name: "柯盛",
          ischecked: false,
        },
        {
          uid: "3",
          name: "钟兴林",
          ischecked: false,
        },
        {
          uid: "4",
          name: "黄国",
          ischecked: false,
        },
        {
          uid: "5",
          name: "何广盈",
          ischecked: false,
        },
      ],
      allChecked: false,
    };
  }

  //全选
  selecAll() {
    // console.log(this.state, 999);
    let { users, allChecked } = this.state; //解构获取两个属性值
    users.forEach((item) => {
      //点击全选控制下方所有复选框
      item.ischecked = !allChecked;
    });
    // console.log("AllCheck -> selecAll -> users", users);
    this.setState({
      allChecked: !allChecked, //点一次就反选一次:全选按钮
      users,
    });
  }

  //选择某个用户
  selectUser(index) {
    // console.log("AllCheck -> selectUser -> index", index);
    let { users } = this.state; //解构获取两个属性值
    users[index].ischecked = !users[index].ischecked; //点击某个复选框，选中或不选
    let isallcheck = users.every((item) => item.ischecked); //下面的复选框反控制全选按钮
    this.setState({
      users,
      allChecked: isallcheck,
    });
  }

  //删除某个用户
  delUser(index) {
    let { users } = this.state; //解构获取两个属性值
    let isdel = window.confirm("您确定要删除吗");
    if (isdel) {
      users.splice(index, 1);
    }
    this.setState(
      {
        users,
      },
      () => {
        if (users.length <= 0) {
          this.setState({
            allChecked: false,
          });
        }
      }
    );
  }

  //删除多条数据
  delMany() {
    let { users } = this.state; //解构获取两个属性值

    let isdel = window.confirm("您确定要删除多条数据吗");
    if (isdel) {
      users = users.filter((item) => !item.ischecked);
      this.setState(
        {
          users,
        },
        () => {
          if (users.length <= 0) {
            this.setState({
              allChecked: false,
            });
          }
        }
      );
    }
  }

  render() {
    const { users, allChecked } = this.state;
    return (
      <div>
        <table width="100%" border="1" cellSpacing="0" cellPadding="0">
          <tbody>
            <tr style={{ color: "#FFFFFF", fontSize: "14px" }}>
              <td height="40" align="center" bgcolor="#0099CC">
                <label>
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={this.selecAll.bind(this)}
                  />
                  全选
                </label>
              </td>
              <td align="center" bgcolor="#0099CC">
                姓名
              </td>
              <td align="center" bgcolor="#0099CC">
                管理
              </td>
            </tr>
            {users.map((item, index) => {
              return (
                <tr key={item.uid}>
                  <td height="40" align="center">
                    <input
                      type="checkbox"
                      checked={item.ischecked}
                      onChange={this.selectUser.bind(this, index)}
                    />
                  </td>
                  <td align="center">{item.name}</td>
                  <td align="center">
                    <button onClick={this.delUser.bind(this, index)}>
                      删除
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td height="40" colSpan="3">
                <button type="button" onClick={this.delMany.bind(this)}>
                  批量删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default AllCheck;
