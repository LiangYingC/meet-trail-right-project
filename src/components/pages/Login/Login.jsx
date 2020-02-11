import React, { Component, Fragment } from 'react';
import Header from '../../../components/shared/Header';
import Footer from '../../../components/shared/Footer';
import Button from '../../shared/Button';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowSignIn: true
        }
    }

    toggleSignInUp = () => {
        this.setState(preState => ({
            isShowSignIn: !preState.isShowSignIn
        }))
    }

    render() {
        const { isShowSignIn } = this.state
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
                                    <h3><i class="fas fa-sign-in-alt"></i>登入</h3>
                                    <p>登入尋找適合您的山林步道！</p>
                                </div>
                                <div className="sign-container">
                                    <div className="flex sign-item">
                                        <i class="fas fa-envelope"></i>
                                        <input type="email" id="sign-in-email" placeholder="輸入信箱" />
                                    </div>
                                    <div className="flex sign-item">
                                        <i class="fas fa-key"></i>
                                        <input type="password" id="sign-in-psd" placeholder="輸入密碼" />
                                    </div>
                                    <div className="alert-word">信箱有誤，請重新確認</div>
                                    <Button text={'登入'} name={'sign-in-btn'} />
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
                                    <h3><i class="fas fa-user-plus"></i>註冊</h3>
                                </div>
                                <div className="sign-container">
                                    <div className="flex sign-item">
                                        <i class="fas fa-user"></i>
                                        <input type="name" id="sign-in-name" placeholder="輸入姓名" />
                                    </div>
                                    <div className="flex sign-item">
                                        <i class="fas fa-envelope"></i>
                                        <input type="email" id="sign-in-email" placeholder="輸入信箱" />
                                    </div>
                                    <div className="flex sign-item">
                                        <i class="fas fa-key"></i>
                                        <input type="password" id="sign-in-psd" placeholder="輸入密碼" />
                                    </div>
                                    <div className="alert-word">信箱有誤，請重新確認</div>
                                    <Button text={'註冊'} name={'sign-up-btn'} />
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