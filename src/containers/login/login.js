/*
Login router component
 */
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
    Button
} from "antd-mobile";
import Logo from "../../components/logo/logo";

import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {login} from "../../redux/actions";

class Login extends Component {

    state = {
        username:'',
        password:'',
    }

    login = () =>{
        this.props.login(this.state);
    }

    handleChange = (name,val) =>{
        this.setState({
            [name]: val
        })
    }

    toRegister = () =>{
        this.props.history.replace('/register');
    }


    render() {

        const {msg, redirectTo} = this.props.user;
        if (redirectTo) {
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
                        <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;陆</Button>
                        <WhiteSpace />
                        <Button onClick={this.toRegister}>没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}

// export default Register;

export default connect(
    state => ({user: state.user}),
    {login}
)(Login);