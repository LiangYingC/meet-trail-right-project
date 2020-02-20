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
                console.log(user.uid)
                // report data 有兩層要取用麻煩，因此全部存在 context
                DB.ref('users').doc(user.uid).collection('report_list')
                    .onSnapshot(querySnapshot => {
                        if (querySnapshot.docs.length > 0) {
                            console.log(querySnapshot)
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
                                console.log(reportList)
                                this.setState(preState => ({
                                    ...preState,
                                    reportList: reportList
                                }))
                                this.state.handleUserData({
                                    ...this.state.userData,
                                    reportList: reportList
                                })
                                console.log(this.context)
                            })
                        }
                    })
                // create & like data 只有一層方便取用因此只存 id 
                DB.ref('users').doc(user.uid)
                    .onSnapshot(doc => {
                        console.log(doc.data())
                        const userData = {
                            id: doc.data().id,
                            name: doc.data().name,
                            email: doc.data().email,
                            picture: doc.data().picture,
                            status: doc.data().status,
                            likeList: doc.data().like_list,
                            createList: doc.data().create_list,
                            reportList: this.state.reportList
                        }
                        this.state.handleUserData(userData)
                        this.state.toggleLogin(true)
                    })


            } else {
                console.log('onAuthState false')
                console.log(user)
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