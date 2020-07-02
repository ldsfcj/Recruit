import React, {Component} from 'react';
import {connect} from 'react-redux';
import { List } from "antd-mobile";

const { Item } = List;
const Brief = Item.Brief;


/*
对chatMsgs按chat_id进行分组,并得到每个组的lastMsg组成的数组
 */
function getLastMsgs(chatMsgs) {

}

class Message extends Component {

    render() {

        const {user} = this.props;
        const {users, chatMsgs} = this.props.chat;

        // 对chat按chat_id进行分组
        const lastMsgs = getLastMsgs(chatMsgs)

        return (
            <List className='message-list'>
                <Item
                    // extra={}
                    // thumb={}
                    arrow='horizontal'
                >
                    mingzi
                    <Brief>llll</Brief>
                </Item>
            </List>
        );
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message);