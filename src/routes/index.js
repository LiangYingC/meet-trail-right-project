import React, { Component } from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import Profile from '../components/pages/Profile';
import Trails from '../components/pages/Trails';
import TrailDetail from '../components/pages/TrailDetail';
import TrailCreate from '../components/pages/TrailCreate';
import AuthUserContext from '../contexts/AuthUserContext';

class Routes extends Component {
    render() {
        const { isLogin } = this.context
        return (
            <Switch>
                <Route
                    path="/trails/detail/:id"
                    render={(props) => <TrailDetail {...props} key={props.location.key} />}
                />
                <Route
                    path="/trails"
                    render={(props) => <Trails {...props} key={props.location.key} />}
                />
                <Route path="/trailCreate" component={TrailCreate} />
                <Route path="/profile" >
                    {isLogin ? <Route path="/profile" component={Profile} /> : <Redirect to="/login" />}
                </Route>
                <Route path="/login" >
                    {isLogin ? <Redirect to="/profile" /> : <Route path="/login" component={Login} />}
                </Route>
                <Route path="/" component={Home} />
            </Switch >
        )
    }
}

Routes.contextType = AuthUserContext;
export default Routes;