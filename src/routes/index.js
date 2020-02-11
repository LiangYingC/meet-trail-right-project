import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import Profile from '../components/pages/Profile';
import Trails from '../components/pages/Trails';
import TrailDetail from '../components/pages/TrailDetail';
import TrailCreate from '../components/pages/TrailCreate';


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/trails/detail/:id" component={TrailDetail} />
                <Route path="/trails" component={Trails} />
                <Route path="/trailCreate" component={TrailCreate} />
                <Route path="/profile" component={Profile} />
                <Route path="/login" component={Login} />
                <Route path="/" component={Home} />
            </Switch >
        )
    }
}

export default Routes