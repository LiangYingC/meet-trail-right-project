import React, { Component, Fragment } from 'react';
import Header from '../../../components/shared/Header'
import Footer from '../../../components/shared/Footer'

class Login extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <section id="login">
                    <div className="wrap">
                        <div className="banner">
                            <div className="layer"></div>
                        </div>
                        <div className="banner-word-mobile">尋找最適合你的山林步道</div>
                        <div className="banner-word-web">尋找最適合你的山林步道</div>
                        <div className="sign-in">
                            <h2>選山步道 登入</h2>
                            <div className="description">登入即可快速結帳 !</div>
                            <div className="sign-in_input">
                                <i class="fas fa-envelope"></i>
                                <input type="email" id="sign_in_account" placeholder="請輸入信箱" />
                            </div>
                            <div className="sign-in_input">
                                <i class="fas fa-unlock"></i>
                                <input type="password" id="sign_in_pwd" placeholder="請輸入密碼" />
                            </div>
                            <button id="sign_in_submit">登入會員</button>
                            <div className="description">
                                <a href="#">忘記密碼</a>
                            </div>
                            <div className="go-sign-up">
                                <div className="description">還沒有會員嗎？</div>
                                <button id="go-sign-up_submit">立即註冊</button>
                            </div>

                            <div className="sign-up">
                                <h2>Stylish 註冊</h2>
                                <div className="description">註冊享有會員福利 !</div>
                                <div className="sign-in_input">
                                    <i class="fas fa-user"></i>
                                    <input type="text" id="sign_up_name" placeholder="請輸入稱謂" />
                                </div>
                                <div className="sign-in_input">
                                    <i class="fas fa-envelope"></i>
                                    <input type="email" id="sign_up_account" placeholder="請輸入信箱" />
                                </div>
                                <div className="sign-in_input">
                                    <i class="fas fa-unlock"></i>
                                    <input type="password" id="sign_up_pwd" placeholder="請輸入密碼" />
                                </div>
                                <div className="description agree_contact">
                                    <div><input type="checkbox" className="agree_checkbox" /></div>
                                    <a href="#">同意服務條款</a>
                                </div>
                                <button id="sign_up_submit">註冊會員</button>
                                <div className="go-sign-in">
                                    <div className="description">已有會員了嗎？</div>
                                    <button id="go-sign-in_submit">立即登入</button>
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