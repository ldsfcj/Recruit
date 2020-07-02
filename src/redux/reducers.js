/*
包含n个reducer函数：根据老的state和指定的action返回一个新的state
 */

import {combineReducers} from 'redux';
import {getRedirectTo} from '../utils/index';

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG
} from './action-types';

const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo:''
};

const initUserList = [];

//产生user状态的reducer
function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const {type, header} = action.data;
            return {...action.data, redirectTo: getRedirectTo(type, header)};
        case ERROR_MSG:
            return {...state, msg:action.data};
        case RECEIVE_USER:
            return action.data;
        case RESET_USER:
            return {...initUser, msg: action.data};
        default:
            return state;
    }
}

//产生userList 状态的reducer
function userList(state=initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data;
        default:
            return state;
    }
}

const initChat ={
    users: {}, //所有用户信息的对象 属性名： userid, 属性值是:{username, header}
    chatMsgs: [], //当前用户所有相关msg的数组
    unReadCount: 0 //总的未读数量
}

//产生聊天状态的reducer
function chat(state=initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST: //data: {users, chatMsgs}
            const {users, chatMsgs} = action.data;
            return {
                users,
                chatMsgs,
                unReadCount: 0
            }
        case RECEIVE_MSG:
            const chatMsg = action.data;
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: 0
            }
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chat
});