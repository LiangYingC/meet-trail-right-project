import React, { Component } from 'react';
import Routes from './routes';
import { BrowserRouter as Router } from "react-router-dom";
import { DB } from './lib';
import { firebaseConfig } from './config'
import AuthUserContext from './contexts/AuthUserContext';
import LoadingPage from './components/shared/LoadingPage'
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
                    status: userData.status,
                    likeList: userData.likeList,
                    createList: userData.createList,
                    reportList: userData.reportList
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
                status: '',
                likeList: [],
                createList: [],
                reportList: []
            },
            handleUserData: (userData) => { this.handleUserData(userData) },
            toggleLogin: (boolen) => { this.toggleLogin(boolen) }
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('onAuthState true')

                DB.ref('users').doc(user.uid)
                    .onSnapshot(doc => {
                        console.log('app/users' + doc.data())
                        const userData = {
                            id: doc.data().id,
                            name: doc.data().name,
                            email: doc.data().email,
                            picture: doc.data().picture,
                            status: doc.data().status,
                            likeList: doc.data().like_list,
                            createList: doc.data().create_list,
                        }
                        console.log('app user do')
                        console.log(userData)
                        this.state.handleUserData(userData)
                        this.state.toggleLogin(true)
                    })


            } else {
                console.log('onAuthState false')
                const userData = {
                    id: '',
                    name: '',
                    email: '',
                    picture: '',
                    status: '',
                    likeList: [],
                    createList: [],
                    reportList: []
                }
                this.state.handleUserData(userData)
                this.state.toggleLogin(false)
            }
        })
    }

    render() {
        console.log(this.state)
        if (this.state.isLogin === null) {
            return <LoadingPage isShow={true} />
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