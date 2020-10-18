//根组件  App.js
import React, { lazy, Suspense } from "react";
//as重命名
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// import Indexpage from "../pages/index/index";
// import NewsPage from "../pages/news";
// import GoodsPage from "../pages/goods";
// import GoodsDetail from "../pages/goods/detail";
//路由懒加载的实现：异步载入资源
import AuthRoute from "../permission"; //路由守卫
import NavBar from "../components/navBar";
const Indexpage = lazy(() => import("../pages/index/index"));
const NewsPage = lazy(() => import("../pages/news"));
const GoodsPage = lazy(() => import("../pages/goods"));
const GoodsDetail = lazy(() => import("../pages/goods/detail"));
const LoginPage = lazy(() => import("../pages/login"));
const Userspage = lazy(() => import("../pages/users"));
// console.log(AuthRoute, 789);
/*router.js 页面里的代码
HashRouter:有#号 hash mode
BrowserRouter:没有#号 history mode
Route：设置路由与组件关联:路由规则
Switch:只要匹配到一个地址不往下匹配，相当于for循环里面的break(如果有子路由就不要用)
Link:跳转页面，相当于vue里面的router-link，声明式导航
exact :完全匹配路由(如果有子路由就不要用)
Redirect:路由重定向
*/

class RouterComponent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          {/* 导航条 */}
          <NavBar />
          <React.Fragment>
            <Suspense fallback={<div>loading</div>}>
              {/* 路由用的的组件一般放在pages或views里面 */}

              {/* <Route path="/" exact component={Indexpage}></Route> */}
              <Route path="/home" component={Indexpage}></Route>
              <Route
                path="/"
                exact
                render={() => <Redirect to="/home" />}
              ></Route>
              <Route path="/news" component={NewsPage}></Route>
              {/* 登录路由 */}
              <Route path="/login" component={LoginPage}></Route>
              {/* 个人中心 */}
              <AuthRoute path="/users" component={Userspage}></AuthRoute>
              <Route path="/goods" component={GoodsPage}></Route>
              {/* 子路由设置方式一:设置一个子路由 */}
              {/* 传参方式一:动态路由，这种方式适合用于传输简单的数据 */}
              {/* <Route
              path="/goods/type/:id/:title"
              component={GoodsDetail}
            ></Route> */}
              <Route path="/goods/type" component={GoodsDetail}></Route>
              {/* <Route path="/goods/type/three" component={Goodsxxx}></Route> */}
              {/* 子路由设置方式二 */}
              {/* <Route
              path="/goods"
              render={() => (
                <GoodsPage>
                  <Route path="/goods/type/:id" component={GoodsDetail}></Route>
                </GoodsPage>
              )}
            ></Route> */}
            </Suspense>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default RouterComponent;
