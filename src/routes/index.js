import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";

import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Test from '../pages/Test';
import Trails from '../pages/Trails';
import TrailsRecommend from '../pages/TrailsRecommend';
import TrailDetail from '../pages/TrailDetail';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/trails/recommend"><TrailsRecommend /></Route>
                <Route path="/trails/detail"><TrailDetail /></Route>
                <Route path="/test"><Test /></Route>
                <Route path="/trails"><Trails /></Route>
                <Route path="/profile"><Profile /></Route>
                <Route path="/login"><Login /></Route>
                <Route path="/"><Home /></Route>
            </Switch >
        )
    }
}

export default Routes