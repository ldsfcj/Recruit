/*
选择用户头像的UI组件
 */

import React, {Component} from 'react';
import {
    List,
    Grid
} from 'antd-mobile';

class HeaderSelector extends Component {

    constructor(props) {
        super(props);
        this.headerList = [];
        for (let i=0; i<20; i++){
            this.headerList.push({
                text: 'profile' + (i+1),
                icon: require(`./images/header${i+1}.png`) //不能使用import
            });
        }
    }


    render() {
        const listHeader = '请选择头像';
        return (
            <List renderHeader={() => listHeader}>
                <Grid data={this.headerList}
                      columnNum={5} />
            </List>
        );
    }
}

export default HeaderSelector;