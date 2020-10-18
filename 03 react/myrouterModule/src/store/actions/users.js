function logins(data) {
  //登录功能
  return {
    type: "LOGIN",
    data,
  };
}

function logouts(data) {
  //退出功能
  return {
    type: "LOGOUT",
    data,
  };
}

export default {
  logins,
  logouts,
};
