import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserList from "../../components/user-list/user-list";

class Boss extends Component {
    render() {
        return (
            <div>
                BOSS
            </div>
        );
    }
}

export default connect(
    state => ({}),
    {}
)(Boss);