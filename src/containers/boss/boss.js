import React, {Component} from 'react';
import {connect} from 'react-redux';

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