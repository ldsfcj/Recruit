import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, List, InputItem} from "antd-mobile";
import {sendMsg} from '../../redux/actions';

const {Item} = List;

class Chat extends Component {

    state = {
        content: ''
    }

    handleSend = () =>{
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content.trim();
        if (content) {
            this.props.sendMsg({from, to, content})
        }
        this.setState({content:''})
    }

    render() {
                return (
                <div id='chat-page'>
                    <NavBar>aa</NavBar>
                    <List>
                        <Item
                            thumb={require('../../assets/images/header1.png')}
                        > 你好
                        </Item>
                        <Item
                            thumb={require('../../assets/images/header2.png')}
                        > 你好 2
                        </Item>
                        <Item
                            className='chat-me'
                            extra='我'
                        > 很好
                        </Item>
                        <Item
                            className='chat-me' extra='我' >
                            很好 2
                        </Item>
                    </List>
                    <div className='am-tab-bar'>
                        <InputItem
                            onChange={value => this.setState({content: value})}
                            value={this.state.content}
                            placeholder="请输入"
                            extra={ <span onClick={this.handleSend}>发送</span> }
                        />
                    </div>
                </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {sendMsg}
)(Chat);