import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from "./redux/store";
import Register from "./containers/register/register";
import Login from "./containers/login/login";
import Main from "./containers/main/main";

import './assets/css/index.less';

// import './socketio/socketio_chat'

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route exact component={Main}></Route> {/*default component*/}
            </Switch>
        </HashRouter>
    </Provider>
),document.getElementById('root'));
