/*
选择用户头像的UI组件
 */

import React, {Component} from 'react';
import {
    List,
    Grid
} from 'antd-mobile';
import PropTypes from 'prop-types'

class HeaderSelector extends Component {

    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }

    state = {
        icon: null
    }

    constructor(props) {
        super(props);
        this.headerList = [];
        for (let i=0; i<20; i++){
            this.headerList.push({
                text: 'header' + (i+1),
                icon: require(`../../assets/images/header${i+1}.png`) //不能使用import
            });
        }
    }

    handleClick = ({icon,text}) =>{
        this.setState({
            icon
        });

        this.props.setHeader(text);
    }

    render() {
        const {icon} = this.state;
        const listHeader = !this.state.icon? '请选择头像' : (
            <div>
                已选择头像:<img src={icon} />
            </div>
        );

        return (
            <List renderHeader={() => listHeader}>
                <Grid data={this.headerList} onClick={this.handleClick}
                      columnNum={5} />
            </List>
        );
    }
}

export default HeaderSelector;