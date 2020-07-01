import React, {Component} from 'react';
import {connect} from 'react-redux';

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