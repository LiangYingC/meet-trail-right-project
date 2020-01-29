import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";

import Home from '../page/Home';
import Login from '../page/Login';
import Profile from '../page/Profile';
import Test from '../page/Test';
import Trails from '../page/Trails';
import TrailsRecommend from '../page/TrailsRecommend';
import TrailDetail from '../page/TrailDetail';

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