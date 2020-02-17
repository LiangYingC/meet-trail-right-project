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
                    status: userData.status,
                    likeList: userData.likeList,
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
                reportList: []
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
                        const userData = {
                            id: doc.data().id,
                            name: doc.data().name,
                            email: doc.data().email,
                            picture: doc.data().picture,
                            status: doc.data().status,
                            likeList: doc.data().likeList,
                            reportList: []
                        }
                        this.state.toggleLogin(true)
                        this.state.handleUserData(userData)
                    })

                DB.ref('users').doc(user.uid).collection('report_list')
                    .onSnapshot(querySnapshot => {
                        if (querySnapshot.docs.length > 0) {
                            let reportList = []
                            querySnapshot.forEach(doc => {
                                const data = doc.data()
                                let reportItem = {
                                    time: data.report_time,
                                    timestamp: data.timestamp,
                                    content: data.report_content,
                                    trail: data.report_trail
                                }
                                reportList.push(reportItem)
                                this.state.handleUserData({
                                    ...this.state.userData,
                                    reportList: reportList
                                })
                            })
                        }
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