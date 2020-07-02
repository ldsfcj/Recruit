import ajax from "./ajax";

export const reqRegister = (user) => ajax('/register', user, 'POST');

export const reqLogin = ({username, password}) => ajax('/login', {username, password},'POST');

export const reqUpdateUser = (user) => ajax('/update', user, 'POST');

export const reqUserInfo = () => ajax('/user','GET');

export const reqUserList = (type) => ajax('/userlist',{type},'GET');

export const reqMsgList = () => ajax('/msglist', 'GET');

export const reqReadMsg = (from) => ajax('/readmsg', {from},'POST');