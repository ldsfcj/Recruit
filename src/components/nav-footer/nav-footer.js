import React, {Component} from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
const Item = TabBar.Item;

class NavFooter extends Component {

    static propTypes = {
        navList: PropTypes.array.isRequired
    }

    render() {
        let {navList} = this.props;
        navList = navList.filter(item => !item.hide);
        const path = this.props.location.pathname;
        return (
            <TabBar>
                {
                    navList.map((item)=> (
                        <Item
                            key={item.path}
                            title={item.text}
                            icon={{uri: require(`./images/${item.icon}.png`)}}
                            selectedIcon={{uri: require(`./images/${item.icon}-selected.png`)}}
                            selected={path === item.path}
                            onPress={() => this.props.history.replace(item.path)}
                        />
                    ))
                }
            </TabBar>
        );
    }
}

// 向外暴露withRouter()包装产生的组件
// 内部会像组件中传入一些路由组件特有的属性：history/location/path
export default withRouter(NavFooter);