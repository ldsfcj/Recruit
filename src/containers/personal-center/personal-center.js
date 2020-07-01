import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Result, Button, WhiteSpace, Modal } from 'antd-mobile';
import Cookies from 'js-cookie';
import {reset_user} from '../../redux/actions'

const Item = List.Item;
const Brief = Item.Brief;

class PersonalCenter extends Component {

    logout = () =>{
        Modal.alert('退出','确认退出登录吗?',[
            {
                text: '取消',
                onPress: () => console.log('cancel')
            },
            {
                text: '确认',
                onPress: () => {
                    // 删除cookie中的userid
                    Cookies.remove('userid');
                    // 删除redux中的user
                    this.props.reset_user();
                }
            }
        ])
    }

    render() {
        const {username, type, header, company, info, salary, post} = this.props.user;
        return (
            <div>
                <Result
                    className='personal-result-header'
                    imgUrl={require(`../../assets/images/${header}.png`)}
                    title={username}
                    message={company}
                />
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位: {post}</Brief>
                        <Brief>简介: {info}</Brief>
                        {salary? <Brief>薪资: {salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace />
                <Button type='warning' onClick={this.logout}>退出登录</Button>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {reset_user}
)(PersonalCenter);