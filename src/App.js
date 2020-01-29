import React, { Component } from 'react';
import Routes from './routes';
import { HashRouter as Router, Switch } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Router>
                <Routes />
            </Router>
        )
    }
}

export default App;