import React, {Component} from 'react';
import {connect} from 'react-redux';

class PersonalCenter extends Component {
    render() {
        return (
            <div>
                PersonalCenter
            </div>
        );
    }
}

export default connect(
    state => ({}),
    {}
)(PersonalCenter);