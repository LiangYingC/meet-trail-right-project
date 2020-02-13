import React, { Component, Fragment } from 'react';
import Header from '../../../components/shared/Header';
import Footer from '../../../components/shared/Footer';
import Button from '../../shared/Button';
import { DB } from '../../../lib';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowSignIn: true,
            inputValue: {
                name: '',
                email: '',
                pwd: '',
            },
            alertWord: {
                isShow: false,
                word: '歡迎登入 / 註冊'
            }
        }
    }

    changeValue = (e) => {
        e.persist()
        const id = e.target.id
        const value = e.target.value
        if (id === 'sign-up-name') {
            this.setState(preState => ({
                inputValue: {
                    ...preState.inputValue,
                    name: value
                }
            }))
        } else if (id === 'sign-up-email' || id === 'sign-in-email') {
            this.setState(preState => ({
                inputValue: {
                    ...preState.inputValue,
                    email: value
                }
            }))
        } else {
            this.setState(preState => ({
                inputValue: {
                    ...preState.inputValue,
                    pwd: value
                }
            }))
        }
    }

    loginFirebase = (e) => {
        const { inputValue } = this.state
        const history = this.props.history
        const targetId = e.target.id
        console.log(history)
        targetId === 'sign-up-btn' ?
            DB.signUp(inputValue.email, inputValue.pwd, inputValue.name, history, this.toggleAlertWord) :
            DB.signIn(inputValue.email, inputValue.pwd, history, this.toggleAlertWord)
    }

    toggleAlertWord = (error) => {
        console.log(error.code)
        this.setState(preState => {
            let alertword
            switch (error.code) {
                case 'auth/wrong-password':
                    alertword = '密碼輸入錯誤，請重新輸入'
                    break;
                case 'auth/invalid-email':
                    alertword = '信箱輸入錯誤，請重新輸入'
                    break;
                case 'auth/email-already-in-use':
                    alertword = '信箱已經註冊過囉'
                    break;
                case 'auth/weak-password':
                    alertword = '密碼至少需六位數'
                    break;
                default:
                    break;
            }
            return {
                isShowSignIn: preState.isShowSignIn,
                inputValue: preState.inputValue,
                alertWord: {
                    isShow: true,
                    word: alertword
                }
            }
        })
    }

    toggleSignInUp = () => {
        this.setState(preState => ({
            isShowSignIn: !preState.isShowSignIn,
            alertWord: {
                isShow: false,
                word: '歡迎登入 / 註冊'
            }
        }))
    }

    render() {
        const { isShowSignIn, inputValue, alertWord } = this.state
        return (
            <Fragment>
                <Header />
                <section id="login">
                    <div className="wrap">
                        <div className="flex login-container">
                            <div className="login-bg">
                                <div className="layer"></div>
                            </div>
                            <div className={`login-sign-in-panel ${isShowSignIn ? 'active' : ''}`}>
                                <div className="login-title">
                                    <h3><i className="fas fa-sign-in-alt"></i>登入</h3>
                                    <p>登入尋找適合您的山林步道！</p>
                                </div>
                                <div className="sign-container">
                                    <div className="flex sign-item">
                                        <i className="fas fa-envelope"></i>
                                        <input
                                            type="email"
                                            id="sign-in-email"
                                            placeholder="輸入信箱"
                                            value={inputValue.email}
                                            onChange={this.changeValue}
                                        />
                                    </div>
                                    <div className="flex sign-item">
                                        <i className="fas fa-key"></i>
                                        <input
                                            type="password"
                                            id="sign-in-pwd"
                                            placeholder="輸入密碼"
                                            value={inputValue.pwd}
                                            onChange={this.changeValue}
                                        />
                                    </div>
                                    <div className={`alert-word ${alertWord.isShow ? 'active' : ''}`}>
                                        {alertWord.word}
                                    </div>
                                    <Button
                                        text={'登入'}
                                        id={'sign-in-btn'}
                                        onClick={this.loginFirebase}
                                    />
                                </div>
                                <div className="flex forgot-and-sign-up">
                                    <button id="forgot-pwd-btn">忘記密碼</button>
                                    <div className="flex go-sign-up">
                                        <p>還不是會員嗎？</p>
                                        <button id="go-sign-up-btn" onClick={this.toggleSignInUp}>前往註冊</button>
                                    </div>
                                </div>
                                <div className="flex divider">
                                    <span></span>
                                    <p>使用社群帳號登入</p>
                                    <span></span>
                                </div>
                                <div className="flex social-sign-container">
                                    <button className="social-login-btn" id="fb-sign-btn">Facebook 註冊</button>
                                    <button className="social-login-btn" id="google-sign-btn">Google 註冊</button>
                                </div>
                            </div>

                            <div className={`login-sign-up-panel ${isShowSignIn ? '' : 'active'}`}>
                                <div className="login-title">
                                    <h3><i className="fas fa-user-plus"></i>註冊</h3>
                                </div>
                                <div className="sign-container">
                                    <div className="flex sign-item">
                                        <i className="fas fa-user"></i>
                                        <input
                                            type="name"
                                            id="sign-up-name"
                                            placeholder="輸入稱謂"
                                            value={inputValue.name}
                                            onChange={this.changeValue} />
                                    </div>
                                    <div className="flex sign-item">
                                        <i className="fas fa-envelope"></i>
                                        <input
                                            type="email"
                                            id="sign-up-email"
                                            placeholder="輸入信箱"
                                            value={inputValue.email}
                                            onChange={this.changeValue}
                                        />
                                    </div>
                                    <div className="flex sign-item">
                                        <i className="fas fa-key"></i>
                                        <input
                                            type="password"
                                            id="sign-up-pwd"
                                            placeholder="輸入密碼"
                                            value={inputValue.pwd}
                                            onChange={this.changeValue}
                                        />
                                    </div>
                                    <div className={`alert-word ${alertWord.isShow ? 'active' : ''}`}>
                                        {alertWord.word}
                                    </div>
                                    <Button
                                        text={'註冊'}
                                        id={'sign-up-btn'}
                                        onClick={this.loginFirebase}
                                    />
                                </div>
                                <div className="flex forgot-and-sign-up">
                                    <div className="flex go-sign-up">
                                        <p>已經是會員了嗎？</p>
                                        <button id="go-sign-in-btn" onClick={this.toggleSignInUp}>前往登入</button>
                                    </div>
                                </div>
                                <div className="flex divider">
                                    <span></span>
                                    <p>使用社群帳號登入</p>
                                    <span></span>
                                </div>
                                <div className="flex social-sign-container">
                                    <button className="social-login-btn" id="fb-sign-btn">Facebook 登入</button>
                                    <button className="social-login-btn" id="google-sign-btn">Google 登入</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </Fragment>
        )
    }
}

export default Login;