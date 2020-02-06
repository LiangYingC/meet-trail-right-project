import firebaseConfig from './config'
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './styles/main.scss';


// Initialize Firebase
firebase.initializeApp(firebaseConfig)

ReactDom.render(<App />, document.getElementById('root'))