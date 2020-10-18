import React from "react";
import { Route, Redirect } from "react-router-dom";
//路由守卫
function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        let token = localStorage.getItem("token");
        let next = "";
        if (token) {
          //假设有token。并且假设验证通过
          //ajax
          console.log("可以看");
          next = <Component {...props} />;
        } else {
          console.log("回到登录页");
          next = (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
        return next;
      }}
    />
  );
}

export default AuthRoute;
