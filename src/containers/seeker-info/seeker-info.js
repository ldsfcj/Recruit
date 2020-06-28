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
    render() {
        return (
            <div>
                <NavBar>Complete Seeker Information</NavBar>
                <HeaderSelector />
                <InputItem placeholder='请输入求职岗位'>求职岗位:</InputItem>
                <TextareaItem title="个人介绍:"
                              rows={3}/>
                <Button type='primary'>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        );
    }
}

export default connect(
    state => ({}),
    {}
)(SeekerInfo);