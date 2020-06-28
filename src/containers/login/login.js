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

class Register extends Component {

    state = {
        username:'',
        password:'',
    }

    login = () =>{
        console.log(this.state);
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
        return (
            <div>
                <NavBar>Melbourne Recruit</NavBar>
                <Logo />
                <WingBlank>
                    <List>
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

export default Register;