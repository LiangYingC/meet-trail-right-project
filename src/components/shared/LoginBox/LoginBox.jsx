import React, { Component, Fragment } from 'react';
import Button from '../../shared/Button';
import { DB } from '../../../lib';

class LoginBox extends Component {
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
        const { closeLoginBox } = this.props
        const history = this.props.history
        const targetId = e.target.id
        targetId === 'sign-up-btn' ?
            DB.signUp(inputValue.email, inputValue.pwd, inputValue.name, history, this.toggleAlertWord) :
            DB.signIn(inputValue.email, inputValue.pwd, history, this.toggleAlertWord)
        console.log('sign-in-sucess')
        closeLoginBox()
    }

    toggleAlertWord = (error) => {
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
            ...preState,
            isShowSignIn: !preState.isShowSignIn,
            alertWord: {
                isShow: false,
                word: '歡迎登入 / 註冊'
            }
        }))
    }

    render() {
        const {
            isShowSignIn,
            inputValue,
            alertWord
        } = this.state

        const {
            isShowLoginBox,
            closeLoginBox
        } = this.props

        return (
            <Fragment>
                <div className={`login-panel-wrap ${isShowLoginBox ? 'active' : ''} `}>
                    <div className="layer"></div>
                    <div className={`login-sign-in-panel ${isShowSignIn ? 'active' : ''}`}>
                        <div className="login-title">
                            <h3><i className="fas fa-sign-in-alt"></i>登入</h3>
                            <p>登入即可
                                        <span>提供步道</span>、
                                        <span>即時路況</span>與
                                        <span>參與評論</span>！
                                    </p>
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
                            <Button
                                text={'Facebook 登入'}
                                id={'fb-sign-btn'}
                            />
                            <Button
                                text={'Google 登入'}
                                id={'google-sign-btn'}
                            />
                        </div>
                        <div className="close-btn" onClick={closeLoginBox}></div>
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
                            <Button
                                text={'Facebook 註冊'}
                                id={'fb-sign-btn'}
                            />
                            <Button
                                text={'Google 註冊'}
                                id={'google-sign-btn'}
                            />
                        </div>
                        <div className="close-btn" onClick={closeLoginBox}></div>
                    </div>
                </div>
            </Fragment>
        )
    }

}

export default LoginBox