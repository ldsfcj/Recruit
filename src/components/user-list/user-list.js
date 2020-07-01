import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {WingBlank, WhiteSpace, Card} from 'antd-mobile';

const {Header, Body} = Card;

class UserList extends Component {

    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {
        const { userList } = this.props;
        return (
            <WingBlank className='wing-blank'>
                {
                    userList.map((item) =>{
                        // console.log(item.header);
                        return (
                            <div key={item._id}>
                                <WhiteSpace />
                                <Card>
                                    <Header
                                        thumb={item.header? require(`../../assets/images/${item.header}.png`): null}
                                        extra={item.username}
                                    />
                                    <Body>
                                        <div>职位:{item.post}</div>
                                        {item.company? <div>公司:{item.company}</div> : null}
                                        {item.salary? <div>月薪:{item.salary}</div> : null }
                                        <div>描述:{item.info}</div>
                                    </Body>
                                </Card>
                            </div>
                        )
                    })
                }
            </WingBlank>
        );
    }
}

export default UserList;