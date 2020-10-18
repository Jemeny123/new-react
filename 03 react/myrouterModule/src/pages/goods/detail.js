import React from "react";
import localParam from "../../untils/localParam";
// console.log(localParam, 678);
/*
  首页

*/

class goodsDetail extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    // console.log(this.props, 899);
  }

  render() {
    // console.log(this.props, 8888);
    //接收query的数据:刷新会丢失
    // let { id, title } = this.props.location.query;
    //接收动态路由参数
    // let id = this.props.match.params.id;
    //接收search的数据:比query数据好用
    let str = this.props.location.search;
    let { id, title } = localParam(str).search;
    // console.log(obj, 789);
    //获取二级列表的数据
    // let { itemlist } = localParam(str).search;
    // console.log(decodeURIComponent(itemlist));
    // let arr = {};
    // if (itemlist) {
    //   arr = JSON.parse(itemlist);
    // }

    // console.log(arr, 678);
    return (
      <div>
        <h2>三级菜单：商品详情</h2>
        <button
          onClick={() => {
            this.props.history.replace({
              pathname: "/goods",
            });
          }}
        >
          后退
        </button>
        <p>
          商品:{id}-{decodeURIComponent(title)}
        </p>
        {/* {arr.data.map((item) => {
          return (
            <p key={item.gid}>
              商品:{item.gid}-{decodeURIComponent(item.name)}
            </p>
          );
        })} */}
      </div>
    );
  }
}

export default goodsDetail;
