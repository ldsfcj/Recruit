/*
Main router component
*/
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import BossInfo from "../boss-info/boss-info";
import SeekerInfo from "../seeker-info/seeker-info";

class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/seekerinfo' component={SeekerInfo}/>
                    <Route path='/bossinfo' component={BossInfo}/>
                </Switch>
            </div>
        );
    }
}

export default Main;