import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserList from "../../components/user-list/user-list";

class Seeker extends Component {
    render() {
        return (
            <div>
                Seeker
            </div>
        );
    }
}

export default connect(
    state => ({}),
    {}
)(Seeker);