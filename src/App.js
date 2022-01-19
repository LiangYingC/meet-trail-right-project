import { Component } from 'react';
import Routes from './routes';
import firebase from './config';
import { BrowserRouter as Router } from 'react-router-dom';
import { DB } from './lib';
import AuthUserContext from './contexts/AuthUserContext';
import LoadingPage from './components/shared/LoadingPage';
import './styles/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
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
        reportList: [],
      },
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        DB.ref('users')
          .doc(user.uid)
          .onSnapshot(doc => {
            const userData = {
              id: doc.data().id,
              name: doc.data().name,
              email: doc.data().email,
              picture: doc.data().picture,
              status: doc.data().status,
              likeList: doc.data().like_list,
              createList: doc.data().create_list,
            };
            this.handleUserData(userData);
            this.toggleLogin(true);
          });
      } else {
        const userData = {
          id: '',
          name: '',
          email: '',
          picture: '',
          status: '',
          likeList: [],
          createList: [],
          reportList: [],
        };
        this.handleUserData(userData);
        this.toggleLogin(false);
      }
    });
  }

  toggleLogin = boolen => {
    this.setState({
      isLogin: boolen,
    });
  };

  handleUserData = userData => {
    this.setState({
      userData: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
        status: userData.status,
        likeList: userData.likeList,
        createList: userData.createList,
        reportList: userData.reportList,
      },
    });
  };

  render() {
    if (this.state.isLogin === null) {
      return <LoadingPage isShow={true} />;
    }
    return (
      <Router>
        <AuthUserContext.Provider
          value={{
            ...this.state,
            handleUserData: userData => {
              this.handleUserData(userData);
            },
            toggleLogin: boolen => {
              this.toggleLogin(boolen);
            },
          }}
        >
          <Routes />
        </AuthUserContext.Provider>
      </Router>
    );
  }
}

App.contextType = AuthUserContext;
export default App;
