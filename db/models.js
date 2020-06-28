
const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/recruit';
mongoose.connect(mongoURL,{useNewUrlParser:true,useUnifiedTopology: true});
const conn = mongoose.connection;
conn.on('connected', () =>{
    console.log('db connect success');
});

const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true},
    header: {type: String},
    post: {type: String},
    info: {type: String},
    company: {type: String},
    salary: {type: String}
})

const UserModel = mongoose.model('user', userSchema);

exports.UserModel = UserModel;
//module.exports = XXX 一次性暴露