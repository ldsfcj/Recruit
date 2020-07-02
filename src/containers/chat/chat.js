import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBar, List, InputItem, Icon} from "antd-mobile";
import {sendMsg} from '../../redux/actions';
import logo from "../../components/logo/logo";

const {Item} = List;

class Chat extends Component {

    state = {
        content: ''
    }

    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight);
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
            const {user} = this.props;
            const {users, chatMsgs} = this.props.chat;

            const meId = user._id;
            if (!users[meId]) { //如果还没有获取数据，直接不做任何显示
                return null;
            }
            const targetId = this.props.match.params.userid;
            const chatId = [meId, targetId].sort().join('_');
            const msgs = chatMsgs.filter(msg => msg.chat_id === chatId);

            const targetHeader = users[targetId].header;
            const targetIcon = targetHeader? require(`../../assets/images/${targetHeader}.png`) : null;

                return (
                <div id='chat-page'>
                    <NavBar
                        className='fix-header'
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.goBack()}
                    >
                        {users[targetId].username}
                    </NavBar>
                    <List className='personal-chat-list'>
                        {
                            msgs.map((msg) =>{
                                if (msg.to === meId) { //对方发给我的
                                    return (
                                        <Item
                                            key={msg._id}
                                            thumb={targetIcon}
                                        >
                                            {msg.content}
                                        </Item>
                                    )
                                } else { //我发给对方的
                                    return (
                                        <Item
                                            key={msg._id}
                                            className='chat-me'
                                            extra='我'
                                        >
                                            {msg.content}
                                        </Item>
                                    )
                                }
                            })
                        }
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
    state => ({user: state.user, chat: state.chat}),
    {sendMsg}
)(Chat);