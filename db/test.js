/*
测试使用mongoose操作mongodb数据库
 */
/*
连接数据库
*/
const md5 = require('blueimp-md5');
//1.引入mongoose
const mongoose = require('mongoose');
//2.连接指定数据库
const mongoURL ="mongodb://localhost:27017/recruit";
mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology: true});
//3.获取连接对象
const conn = mongoose.connection;
//4.绑定连接完成监听
conn.on('connected', function () { //连接成功回调
    console.log('数据库连接成功！');
})

// 2.得到对应特定集合的Model，文档是对象(相当于一个记录)，集合(相当于数据表)是多个文档的数组
// 2.1 定义Schema(描述文档结构)
const userSchema = mongoose.Schema({ //指定文档的结构:属性名/属性值的类型，是否是必须的，默认值
    username: {type: String, required: true}, //用户名
    password: {type: String, required: true}, //密码
    type: {type: String, required: true}, //类型
    header: {type:String}
})

// 2.2 定义Model(与集合对应，可以操作集合)
const UserModel = mongoose.model('user', userSchema); //集合的名称为users(只要写user,会自动补)

// 3. 通过Model或其他实例对集合数据进行CRUD操作
// 3.1. 通过Model实例的save()添加数据
function testSave() {
    //创建UserModel的实例
    const userModel = new UserModel({username: 'Tom',password: md5('123'), type:'boss'});
    //调用save保存
    userModel.save(function (err,user) {
        console.log('save()', err, user);
    })
}
// testSave();

// 3.2. 通过Model的find()/findOne()查询多个或一个数据
function testFind() {
    UserModel.find(function (err, users) { //返回的是数组
        console.log('find()', err, users);
    });
    // UserModel.findOne({_id:''},function (err,user) { //返回的是对象
    //     console.log('findOne()', err, user)
    // });
}
// testFind();

// 3.3. 通过Model的findByIdAndUpdate()更新某个数据
function testUpdate() {
    UserModel.findByIdAndUpdate({_id:''},{username:'jack'},
        function (err, doc) {
            console.log('update()', err, doc); //返回了老的对象，被更改的对象
        })
}
// testUpdate();
// 3.4. 通过Model的remove()删除匹配的数据
function testDelete() {
    UserModel.remove({_id:''},function (err, doc) {
        console.log('remove()', err, doc); //n是删除数量. ok为1是执行成功
    })
}
// testDelete();