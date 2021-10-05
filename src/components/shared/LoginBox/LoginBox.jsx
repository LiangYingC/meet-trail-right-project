import React, { Component } from 'react';
import { DB } from '../../../lib';
import SignInPanel from './SignInPanel.jsx';
import SignUpPanel from './SignUpPanel.jsx';

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSignIn: true,
      inputValue: {
        name: '',
        email: '',
        pwd: '',
      },
      alertWord: {
        isShow: false,
        word: '歡迎登入 / 註冊',
      },
    };
  }

  changeValue = e => {
    e.persist();
    const id = e.target.id;
    const value = e.target.value;
    if (id === 'sign-up-name') {
      this.setState(preState => ({
        inputValue: {
          ...preState.inputValue,
          name: value,
        },
      }));
    } else if (id === 'sign-up-email' || id === 'sign-in-email') {
      this.setState(preState => ({
        inputValue: {
          ...preState.inputValue,
          email: value,
        },
      }));
    } else {
      this.setState(preState => ({
        inputValue: {
          ...preState.inputValue,
          pwd: value,
        },
      }));
    }
  };

  signWithFirebase = e => {
    const { inputValue } = this.state;
    const { closeLoginBox } = this.props;
    const history = this.props.history;
    const targetId = e.target.id;
    targetId === 'sign-up-btn'
      ? DB.signUp(
          inputValue.email,
          inputValue.pwd,
          inputValue.name,
          history,
          this.toggleAlertWord,
          closeLoginBox
        )
      : DB.signIn(inputValue.email, inputValue.pwd, history, this.toggleAlertWord, closeLoginBox);
  };

  signWithGoogle = () => {
    const { closeLoginBox } = this.props;
    DB.signWithGoogle(closeLoginBox);
  };

  toggleAlertWord = error => {
    this.setState(preState => {
      let alertword;
      switch (error.code) {
        case 'auth/wrong-password':
          alertword = '密碼輸入錯誤，請重新輸入';
          break;
        case 'auth/invalid-email':
          alertword = '信箱輸入錯誤，請重新輸入';
          break;
        case 'auth/email-already-in-use':
          alertword = '信箱已經註冊過囉';
          break;
        case 'auth/weak-password':
          alertword = '密碼至少需六位數';
          break;
        default:
          break;
      }
      return {
        ...preState,
        alertWord: {
          isShow: true,
          word: alertword,
        },
      };
    });
  };

  toggleSignInUp = () => {
    this.setState(preState => ({
      isShowSignIn: !preState.isShowSignIn,
      alertWord: {
        isShow: false,
        word: '歡迎登入 / 註冊',
      },
    }));
  };

  render() {
    const { isShowSignIn, inputValue, alertWord } = this.state;

    const { isShowLoginBox, closeLoginBox } = this.props;

    return (
      <>
        <div className={`login-panel-wrap ${isShowLoginBox ? 'active' : ''} `}>
          <div className="layer"></div>
          <SignInPanel
            isShowSignIn={isShowSignIn}
            toggleSignInUp={this.toggleSignInUp}
            inputValue={inputValue}
            changeValue={this.changeValue}
            alertWord={alertWord}
            signWithFirebase={this.signWithFirebase}
            signWithGoogle={this.signWithGoogle}
            closeLoginBox={closeLoginBox}
          />

          <SignUpPanel
            isShowSignIn={isShowSignIn}
            toggleSignInUp={this.toggleSignInUp}
            inputValue={inputValue}
            changeValue={this.changeValue}
            alertWord={alertWord}
            signWithFirebase={this.signWithFirebase}
            signWithGoogle={this.signWithGoogle}
            closeLoginBox={closeLoginBox}
          />
        </div>
      </>
    );
  }
}

export default LoginBox;
