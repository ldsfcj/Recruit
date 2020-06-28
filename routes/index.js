var express = require('express');
var router = express.Router();
const { UserModel } = require('../db/models');
const md5 = require('blueimp-md5');
const filter = {password: 0, _v: 0}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//注册一个路由：用户注册
// router.post('/register', function (req, res) {
//   //获取请求参数
//   const {username, password} = req.body;
//   //处理
//   if (username === 'admin') {
//     // 注册失败
//     // 返回响应数据(失败)
//     res.send({code:1, msg:'此用户已存在'});
//   } else {
//     // 注册成功
//     // 返回响应数据(成功)
//     res.send({code:0, data: {id:'abc123', username, password}})
//   }
// })

//注册的路由
router.post('/register', function (req, res) {

  const {username, password, type} = req.body;
  UserModel.findOne({username}, function (err, user) {
    if (user) {
      res.send({
        code: 1,
        msg: '此用户已存在'
      });
    } else {
      new UserModel({username, type, password: md5(password)}).save((err, user) =>{
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24});
        const data = {username, type, _id: user._id };
        res.send({
          code: 0,
          data
        });
      });
    }
  })
});

//登录的路由
router.post('/login', function (req, res) {
  const {username, password} = req.body;
  UserModel.findOne({username, password: md5(password)}, filter, function (err, user) {
    if (user) {
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24});
      res.send({
        code:0,
        data: user
      });
    } else {
      res.send({
        code:1,
        msg:'用户名或密码不正确！'
      });
    }
  })
})
module.exports = router;
