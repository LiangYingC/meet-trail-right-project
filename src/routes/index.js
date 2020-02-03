import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";

import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import Profile from '../components/pages/Profile';
import Test from '../components/pages/Test';
import Trails from '../components/pages/Trails';
import TrailsRecommend from '../components/pages/TrailsRecommend';;
import TrailDetail from '../components/pages/TrailDetail';;

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/trails/recommend" component={TrailsRecommend} />
                <Route path="/trails/detail/:id" component={TrailDetail} />
                <Route path="/test" component={Test} />
                <Route path="/trails" component={Trails} />
                <Route path="/profile" component={Profile} />
                <Route path="/login" component={Login} />
                <Route path="/" component={Home} />
            </Switch >
        )
    }
}

export default Routes