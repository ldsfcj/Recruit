/*
Main router component
*/
import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'js-cookie'; // 可以操作前端cookie的对象

import BossInfo from "../boss-info/boss-info";
import SeekerInfo from "../seeker-info/seeker-info";
import Boss from "../boss/boss";
import Seeker from "../seeker/seeker";
import Message from "../message/message";
import PersonalCenter from "../personal-center/personal-center";
import NotFound from "../../components/not-found/not-found";
import NavFooter from "../../components/nav-footer/nav-footer";

import {getRedirectTo} from '../../utils/index';
import {getUserInfo, getUserList} from '../../redux/actions'
import {NavBar} from "antd-mobile";

class Main extends Component {

    navList = [
        {
            path: '/boss',
            component: Boss,
            title: '求职者列表',
            icon: 'seeker',
            text: '求职者'
        },
        {
            path: '/seeker',
            component: Seeker,
            title: '老板列表',
            icon: 'boss',
            text: '老板'
        },
        {
            path: '/message',
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息'
        },
        {
            path: '/personalcenter',
            component: PersonalCenter,
            title: '用户中心',
            icon: 'personalcenter',
            text: '个人'
        }
    ]

    componentDidMount() {
        const userid = Cookies.get('userid');
        const {_id} = this.props.user;
        if (userid && !_id){
            //发送异步请求获取user信息
            this.props.getUserInfo();
            // console.log("发送ajax请求获取user!");
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

        const {navList} = this
        const path = this.props.location.pathname;
        const currentNav = navList.find(nav => nav.path === path);

        if (currentNav){
            // 决定哪个路由需要隐藏
            if (user.type === 'boss'){
                navList[1].hide = true
            } else {
                navList[0].hide = true
            }
        }

        return (
            <div>
                {currentNav ? <NavBar className='fix-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map((item)=>
                            <Route path={item.path} component={item.component}/>
                        )
                    }
                    <Route path='/seekerinfo' component={SeekerInfo}/>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter navList={navList}></NavFooter> : null}
            </div>
        );
    }
}

export default connect(
    state =>({user: state.user}),
    {getUserInfo, getUserList}
)(Main);


/*
1.实现自动登录：
1）如果cookie中有userid, 发请求获取对应的user，暂时不做任何显示
2）如果cookie中没有userid， 自动进入Login界面
2.如果已经登录了，且如果请求根路径：
根据user的type和header来计算出一个重定向的路径，并且自动重定向
 */