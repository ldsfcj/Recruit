/*
包含n个reducer函数：根据老的state和指定的action返回一个新的state
 */

import {combineReducers} from 'redux';

import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types';

const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo:''
}

//产生user状态的reducer
function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...action.data, redirectTo: getRedirectTo()};
        case ERROR_MSG:
            return {...state, msg:action.data};
        default:
            return state;
    }
}

export default combineReducers({
    user
});

function getRedirectTo(type, header) {
    let path = '';

    if (type === 'boss') {
        path = '/boss';
    } else {
        path = '/seeker';
    }

    if (!header) {
        path += 'info';
    }

    return path;
}