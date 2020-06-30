import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from "antd-mobile";
import HeaderSelector from "../../components/header-selector/header-selector";

class BossInfo extends Component {

    state = {
        header:'',
        post:'',
        info:'',
        company:'',
        salary:''
    }

    setHeader = (header) =>{
        this.setState({
            header
        })
    }

    handleChange  = (name, val) =>{
        this.setState({
            [name]:val
        })
    }

    save = () =>{
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <NavBar>Complete Boss Information</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='请输入招聘职位' onChange={value => this.handleChange('post', value)}>招聘职位:</InputItem>
                <InputItem placeholder='请输入公司名称' onChange={value => this.handleChange('company', value)}>公司名称:</InputItem>
                <InputItem placeholder='请输入职位薪资' onChange={value => this.handleChange('salary', value)}>职位薪资:</InputItem>
                <TextareaItem title="职位要求:" onChange={value => this.handleChange('info', value)}
                              rows={3}/>
                <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        );
    }
}

export default connect(
    state => ({}),
    {}
)(BossInfo);