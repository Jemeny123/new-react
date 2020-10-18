var request = require("request");
var querystring = require("querystring");
const express = require("express");
const Router = express.Router(); //Router==app

//验证用户是否存在 :get请求
Router.get("/check", async (req, res) => {
  let { phone } = req.query; //获取电话号码
  let str = ""; //准备拼接四位随机数：这里就是发到用户手机的随机数
  for (let i = 0; i < 4; i++) {
    str += parseInt(Math.random() * 10); //0-9的随机数
  }
  var queryData = querystring.stringify({
    mobile: phone, // 接受短信的用户手机号码
    tpl_id: "144712", // 您申请的短信模板ID，根据实际情况修改
    tpl_value: "#code#=" + str, // 您设置的模板变量，根据实际情况修改
    key: "360467c49f4c1899234735dbac01ea94", // 应用APPKEY(应用详细页查询)
  });

  var queryUrl = "http://v.juhe.cn/sms/send?" + queryData;

  request(queryUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body); // 打印接口返回内容

      var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
      console.log(jsonObj);
      //   res.send(jsonObj); //实际的需求：这个不用返回，直接存到数据库中，点击提交的时候拿到的验证码和这个验证码对比就行
      res.send("发送成功");
    } else {
      console.log("请求异常");
      res.send("发送失败");
    }
  });
});

module.exports = Router; //导出路由对象
