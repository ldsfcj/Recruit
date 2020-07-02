import React, {Component} from 'react';
import {connect} from 'react-redux';
import { List, Badge } from "antd-mobile";

const { Item } = List;
const Brief = Item.Brief;


/*
对chatMsgs按chat_id进行分组,并得到每个组的lastMsg组成的数组
 */
function getLastMsgs(chatMsgs, userid) {
    const lastMsgObjs = {};
    chatMsgs.forEach((msg) =>{

        if (msg.to === userid && !msg.read) {
            msg.unReadCount = 1;
        } else {
            msg.unReadCount = 0;
        }

        const chatId = msg.chat_id;
        const lastMsg = lastMsgObjs[chatId];
        if (!lastMsg) {
            lastMsgObjs[chatId] = msg;
        } else {
            const unReadCount = lastMsg.unReadCount;
            if (lastMsg.create_time < msg.create_time) {
                msg.unReadCount += unReadCount;
                lastMsgObjs[chatId] = msg;
            }
        }
    })

    const lastMsgs = Object.values(lastMsgObjs); //由lastMsgObjs的value所组成的数组

    lastMsgs.sort((msg1, msg2) =>{ //针对不同对的聊天室中最后一个消息的时间进行排序
        return msg2.create_time - msg1.create_time;
    })

    return lastMsgs;
}

class Message extends Component {

    render() {

        const {user} = this.props;
        const {users, chatMsgs} = this.props.chat;

        // 对chat按chat_id进行分组
        const lastMsgs = getLastMsgs(chatMsgs, user._id)

        return (
            <List className='message-list'>
                {
                    lastMsgs.map((msg) => {
                        const targetUserId = (user._id === msg.from) ? msg.to : msg.from;
                        const targetUser = users[targetUserId];
                        return (
                            <Item
                                key={msg._id}
                                extra={<Badge text={msg.unReadCount} overflowCount={99} />}
                                thumb={targetUser.header? require(`../../assets/images/${targetUser.header}.png`) : null}
                                arrow='horizontal'
                                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                            >
                                {msg.content}
                                <Brief>{targetUser.username}</Brief>
                            </Item>
                        )
                    })
                }
                {/*<Item*/}
                {/*    // extra={}*/}
                {/*    // thumb={}*/}
                {/*    arrow='horizontal'*/}
                {/*>*/}
                {/*    mingzi*/}
                {/*    <Brief>llll</Brief>*/}
                {/*</Item>*/}
            </List>
        );
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message);