import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Button,
    InputItem,
    NavBar,
    TextareaItem
} from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector";

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
        console.log(this.state);
    }

    render() {
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
    state => ({}),
    {}
)(SeekerInfo);