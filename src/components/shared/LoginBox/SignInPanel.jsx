import React from 'react';
import Button from '../../shared/Button';
import googleLoginImg from '../../../assets/img/googleLogin.png';

const SignInPanel = ({
    isShowSignIn,
    toggleSignInUp,
    inputValue,
    changeValue,
    alertWord,
    signWithFirebase,
    signWithGoogle,
    closeLoginBox
}) => {
    return (
        <div className={`login-sign-in-panel ${isShowSignIn ? 'active' : ''}`}>
            <div className="login-title">
                <h3><i className="fas fa-sign-in-alt"></i>登入</h3>
                <p>登入即可
                <span>提供步道</span>、
                <span>收藏步道</span>與
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
                        onChange={changeValue}
                    />
                </div>
                <div className="flex sign-item">
                    <i className="fas fa-key"></i>
                    <input
                        type="password"
                        id="sign-in-pwd"
                        placeholder="輸入密碼"
                        value={inputValue.pwd}
                        onChange={changeValue}
                    />
                </div>
                <div className={`alert-word ${alertWord.isShow ? 'active' : ''}`}>
                    {alertWord.word}
                </div>
                <Button
                    text={'登入'}
                    id={'sign-in-btn'}
                    onClick={signWithFirebase}
                />
            </div>
            <div className="flex forgot-and-sign-up">
                <button id="forgot-pwd-btn">忘記密碼</button>
                <div className="flex go-sign-up">
                    <p>還不是會員嗎？</p>
                    <button id="go-sign-up-btn" onClick={toggleSignInUp}>前往註冊</button>
                </div>
            </div>
            <div className="flex divider">
                <span></span>
                <p>使用社群帳號登入</p>
                <span></span>
            </div>
            <div className="social-sign-container">
                <div className="flex google-sign-btn" onClick={signWithGoogle}>
                    <img src={googleLoginImg} alt="google login logo" />
                    <p>Google 登入</p>
                </div>
            </div>
            <div className="close-btn" onClick={closeLoginBox}></div>
        </div>
    )
}

export default SignInPanel;