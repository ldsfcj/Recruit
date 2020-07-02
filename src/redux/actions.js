/*
包含n个action creator
异步action
同步action
 */
import io from 'socket.io-client';
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG
} from './action-types';
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUserInfo,
    reqUserList,
    reqMsgList,
    reqReadMsg
} from '../api/index';

/*
单例对象
1. 创建对象之前：判断对象是否已经创建，只有没有创建时，才去创建
2. 创建对象之后：保存对象
 */

function initIO() {
    if (!io.socket) {
        io.socket = io('ws://localhost:4000');

        io.socket.on('receiveMsg', function (chatMsg) {
            console.log(chatMsg);
        })
    }
}

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});

const errorMsg = (msg) => ({type:ERROR_MSG, data: msg});

const receiveUser = (user) =>({type:RECEIVE_USER, data: user}); //接收用户的同步action

export const reset_user = (msg) =>({type:RESET_USER, data: msg}); //重置用户的同步action

export const receive_user_list = (userList) =>({type:RECEIVE_USER_LIST, data: userList});

const receive_msg_list = ({users, chatMsgs}) =>({type:RECEIVE_MSG_LIST, data: {users, chatMsgs}});

// const receive_msg = () =>({type:RECEIVE_MSG, data:});

export const register = (user) =>{
    const {username, password, passwords, type} = user;
    // 做表单的前台验证，如果不通过，返回一个errorMsg的同步action
    if (!username) {
        return errorMsg('用户名不能为空');
    } else if (password !== passwords){
        return errorMsg('两次密码不一致');
    }
    //表单数据合法，返回一个发ajax请求的异步action函数
    return async dispatch => {
        // reqRegister(user).then(response=>{
        //     const result = response.data;
        // });
        const response = await reqRegister({username, password, type});
        const result = response.data;
        if (result.code === 0) {
            getMsgList(dispatch)
            dispatch(authSuccess(result.data));
        } else {
            dispatch(errorMsg(result.msg));
        }
    }
}

export const login = (user) =>{
    const {username, password} = user;
    if (!username) {
        return errorMsg('用户名不能为空');
    } else if(!password) {
        return errorMsg('密码不能为空');
    }
    return async dispatch => {
        const response = await reqLogin(user);
        const result = response.data;
        if (result.code === 0) {
            getMsgList(dispatch);
            dispatch(authSuccess(result.data));
        } else {
            dispatch(errorMsg(result.msg));
        }
    }
}

//更新用户异步action
export const updateUser = (user) =>{
    return async dispatch => {
        const response = await reqUpdateUser(user);
        const result = response.data;
        if (result.code ===0 ) { //更新成功 data
            dispatch(receiveUser(result.data));
        } else { //更新失败 msg
            dispatch(reset_user(result.msg));
        }
    }
}

//获取用户异步action，用于登陆后再次自动登录
export const getUserInfo = () =>{
    return async dispatch => {
        const response = await reqUserInfo();
        const result = response.data;
        // console.log(response);
        if (result.code === 0) {
            getMsgList(dispatch);
            dispatch(receiveUser(result.data));
        } else {
            dispatch(reset_user(result.msg));
        }
    }
}

//获取用户列表的异步action
export const getUserList = (type) =>{
    return async dispatch => {
        const response = await reqUserList(type);
        const result = response.data;
        if (result.code === 0) {
            // console.log(result.data);
            dispatch(receive_user_list(result.data));
        }
    }
}

// 不是action，异步获取消息列表数据
async function getMsgList(dispatch) {
    initIO();
    const response = await reqMsgList();
    const result = response.data;
    if (result.code === 0) {
        const {users, chatMsgs} = result.data
        dispatch(receive_msg_list({users, chatMsgs}))
    }
}

export const sendMsg = ({from, to, content}) => {
    return dispatch => {
        console.log('客户端向服务器发送消息',{from, to, content});
        io.socket.emit('sendMsg', {from, to, content})
    }
}