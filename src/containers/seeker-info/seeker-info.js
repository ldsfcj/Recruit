import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Button,
    InputItem,
    NavBar,
    TextareaItem
} from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector";
import {Redirect} from "react-router-dom";
import {updateUser} from "../../redux/actions";

class SeekerInfo extends Component {

    state = {
        header:'',
        post:'',
        info:''
    }

    setHeader = (header) =>{
        this.setState({
            header
        })
    }

    handleChange  = (name, val) =>{
        this.setState({
            [name]:val
        });
    }

    save = () =>{
        this.props.updateUser(this.state);
    }

    render() {
        const {header, type} = this.props.user;
        if (header) { //如果header有值，那么信息已经完善（简单的检查）
            const path = (type === 'boss')? '/boss' : '/seeker';
            return (<Redirect to={path}/>)
        }
        return (
            <div>
                <NavBar>Complete Seeker Information</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='请输入求职岗位' onChange={value => this.handleChange('post', value)}>求职岗位:</InputItem>
                <TextareaItem title="个人介绍:" onChange={value => this.handleChange('info', value)}
                              rows={3}/>
                <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(SeekerInfo);