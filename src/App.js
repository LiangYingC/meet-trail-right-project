import React, { Component } from 'react';
import Routes from './routes';
import { HashRouter as Router } from "react-router-dom";
import { DB } from './lib';
import { firebaseConfig } from './config'
import AuthUserContext from './contexts/AuthUserContext';
import './styles/main.scss';

firebase.initializeApp(firebaseConfig)

class App extends Component {
    constructor(props) {
        super(props)

        this.toggleLogin = (boolen) => {
            this.setState({
                isLogin: boolen,
            })
        }

        this.handleUserData = (userData) => {
            this.setState({
                userData: {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    picture: userData.picture,
                    status: userData.status
                }
            })
        }

        this.state = {
            isLogin: null,
            userData: {
                id: '',
                name: '',
                email: '',
                picture: '',
                status: ''
            },
            toggleLogin: (boolen) => { this.toggleLogin(boolen) },
            handleUserData: (userData) => { this.handleUserData(userData) }
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('onAuthState true')
                DB.ref('users').doc(user.uid)
                    .get()
                    .then(doc => {
                        console.log(doc.data())
                        const userData = {
                            id: doc.data().id,
                            name: doc.data().name,
                            email: doc.data().email,
                            picture: doc.data().picture,
                            state: doc.data().status
                        }
                        this.state.toggleLogin(true)
                        this.state.handleUserData(userData)
                    })
            } else {
                console.log('onAuthState false')
                this.state.toggleLogin(false)
            }
        })
    }

    render() {
        if (this.state.isLogin === null) {
            return <div>Loading</div>
        }
        return (
            <Router>
                <AuthUserContext.Provider value={this.state}>
                    <Routes />
                </AuthUserContext.Provider>
            </Router>
        )
    }
}

App.contextType = AuthUserContext;

export default App