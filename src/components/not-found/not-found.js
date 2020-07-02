import React, {Component} from 'react';

class NotFound extends Component {
    render() {
        return (
            <div>
                <div>
                    <h2>抱歉，找不到该页面！</h2>
                    <button
                        type="primary"
                        onClick={() => this.props.history.replace('/')}
                    >回到首页
                    </button>
                </div>
            </div>
        );
    }
}

export default NotFound;