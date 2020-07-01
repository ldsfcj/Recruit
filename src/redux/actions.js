/*
包含n个action creator
异步action
同步action
 */
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER
} from './action-types';
import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUserInfo
} from '../api/index';

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});

const errorMsg = (msg) => ({type:ERROR_MSG, data: msg});

const receiveUser = (user) =>({type:RECEIVE_USER, data: user}); //接收用户的同步action

const reset_user = (msg) =>({type:RESET_USER, data: msg}); //重置用户的同步action

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
        if (result.code === 0){
            dispatch(receiveUser(result.data));
        } else {
            dispatch(reset_user(result.msg));
        }
    }
}