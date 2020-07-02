/*
注册路由组件
 */
import React, {Component} from 'react';
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button,
} from "antd-mobile";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {register} from "../../redux/actions";
import Logo from "../../components/logo/logo";

import "../../assets/css/index.less"

const ListItem = List.Item;

class Register extends Component {

    state = {
        username:'',
        password:'',
        passwords:'',
        type:'boss'
    }

    register = () =>{
        this.props.register(this.state);
    }

    handleChange = (name,val) =>{
        this.setState({
            [name]: val
        })
    }

    toLogin = () =>{
        this.props.history.replace('/login');
    }

    render() {
        const {type} = this.state;
        const {msg,redirectTo} = this.props.user;
        if (redirectTo){
            return <Redirect to={redirectTo}/>
        }

        return (
            <div>
                <NavBar>Melbourne Recruit</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div>: null}
                        <WhiteSpace />
                        <InputItem
                            placeholder="请输入用户名"
                            onChange={(value)=>this.handleChange('username',value)}
                        >
                            用户名:
                        </InputItem>
                        <WhiteSpace />
                        <InputItem
                            placeholder="请输入密码"
                            type="password" onChange={(value)=>this.handleChange('password',value)}
                        >
                            密&nbsp;&nbsp;&nbsp;码:
                        </InputItem>
                        <WhiteSpace />
                        <InputItem
                            placeholder="请再次输入密码"
                            type="password"
                            onChange={(value)=>this.handleChange('passwords',value)}
                        >
                            确认密码:
                        </InputItem>
                        <WhiteSpace />
                        <ListItem>
                            <span>用户类型:</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio
                                checked={type === 'boss'}
                                onChange={(value)=>this.handleChange('type','boss')}>
                                招聘方
                            </Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio
                                checked={type === 'seeker'}
                                onChange={(value)=>this.handleChange('type','seeker')}>
                                求职者
                            </Radio>
                        </ListItem>
                        <WhiteSpace />
                        <Button type='primary' onClick={()=>{this.register()}}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace />
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register);