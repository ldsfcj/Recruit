/*
Main router component
*/
import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'js-cookie'; // 可以操作前端cookie的对象

import BossInfo from "../boss-info/boss-info";
import SeekerInfo from "../seeker-info/seeker-info";

import {getRedirectTo} from '../../utils/index';

class Main extends Component {

    componentDidMount() {
        const userid = Cookies.get('userid');
        const {_id} = this.props.user;
        if (userid && !_id){
            //发送异步请求获取user信息
            console.log("发送ajax请求获取user!");
        }
    }

    render() {
        //读取cookie中的userid
        const userid = Cookies.get('userid');
        //如果没有，自动重定向到登录界面
        if (!userid) {
            return (<Redirect to='/login'/>);
        }
        //如果有，读取redux中的user状态
        const {user} = this.props;
        if (!user._id) { //如果user没有_id,返回null(不做任何显示)
            return null;
        } else {  //如果有_id,显示对应的界面
            let path = this.props.location.pathname;
            if (path === '/'){
                path = getRedirectTo(user.type, user.header);
                return <Redirect to={path}/>
            }
        }

        //根据user的type和header来计算出一个重定向的路径，并且自动重定向

        // // 检查用户是否登录，如果没有，自动重定向到登陆界面
        // const {user} = this.props;
        // if (!user._id){
        //     return (<Redirect to='/login'/>)
        // }

        return (
            <div>
                <Switch>
                    <Route path='/seekerinfo' component={SeekerInfo}/>
                    <Route path='/bossinfo' component={BossInfo}/>
                </Switch>
            </div>
        );
    }
}

export default connect(
    state =>({user: state.user})
)(Main);


/*
1.实现自动登录：
1）如果cookie中有userid, 发请求获取对应的user，暂时不做任何显示
2）如果cookie中没有userid， 自动进入Login界面
2.如果已经登录了，且如果请求根路径：
根据user的type和header来计算出一个重定向的路径，并且自动重定向
 */