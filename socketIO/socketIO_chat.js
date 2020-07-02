const { ChatModel } = require('../db/models');

module.exports = function (server) {
    const io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log('one client connect server!');

        socket.on('sendMsg', function ({from, to, content}) {
            console.log({from, to, content});
            //处理数据(保存消息)
            //准备chatMsg对象的相关数据
            const chat_id = [from, to].sort().join('_');
            const create_time = Date.now();
            new ChatModel({from, to, chat_id, content, create_time}).save(function (err, chatMsg) {
                io.emit('receiveMsg', chatMsg)
            });
            //像客户端发消息
        })
    })
}