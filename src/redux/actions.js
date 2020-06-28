/*
包含n个action creator
异步action
同步action
 */
import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types';
import {
    reqRegister,
    reqLogin
} from '../api/index';

const authSuccess = (user) => ({type: AUTH_SUCCESS, data:user});

const errorMsg = (msg) => ({type:ERROR_MSG, data: msg});

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