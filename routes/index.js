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
});

//更新用户信息的路由
router.post('/update', function (req, res) {
  //从请求的cookie中得到userid
  const userid = req.cookies.userid;
  //如果不存在，则直接返回一个提升信息
  if (!userid) {
     res.send({code:1, msg: '请先登录'});
  } else {
    // 存在， 更具userid更新对应的user文档数
    //得到提交的用户数据
    const user = req.body;
    UserModel.findByIdAndUpdate({_id:userid}, user, function (err, oldUser) {
      if (!oldUser) {
        //通知浏览器删除userid cookie
        res.clearCookie('userid');
        //返回一个提示信息
        res.send({code:1, msg: '请先登录'});
      } else {
        //准备一个返回的user数据对象
        const {_id, username, type} = oldUser;
        const data = Object.assign(user, {_id, username, type});
        //返回
        res.send({
          code: 0,
          data
        })
      }
    })
  }
});

// 获取用户信息的路由(根据cookie中的user_id)
router.get('/user', function (req, res) {
  //从请求的cookie中得到userid
  const userid = req.cookies.userid;
  if (!userid) {
    res.send({code:1, msg: '请先登录'});
  } else {
    //根据userid查询对应的User
    UserModel.findOne({_id: userid}, filter, function (err, user) {
        res.send({
          code: 0,
          data: user
        });
    })
  }
});

router.get('/userlist', function (req, res) {
  const {type} = req.query;
  UserModel.find({type}, filter, function (err, users) {
    res.send({
      code: 0,
      data: users
    });
  })
});

module.exports = router;
