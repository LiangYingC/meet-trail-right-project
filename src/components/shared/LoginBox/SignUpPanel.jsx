import Button from '../../shared/Button';
import googleLoginImg from '../../../assets/img/googleLogin.png';

const SignUpPanel = ({
  isShowSignIn,
  toggleSignInUp,
  inputValue,
  changeValue,
  alertWord,
  signWithFirebase,
  signWithGoogle,
  closeLoginBox,
}) => {
  return (
    <div className={`login-sign-up-panel ${isShowSignIn ? '' : 'active'}`}>
      <div className="login-title">
        <h3>
          <i className="fas fa-user-plus"></i>註冊
        </h3>
      </div>
      <div className="sign-container">
        <div className="flex sign-item">
          <i className="fas fa-user"></i>
          <input
            type="name"
            id="sign-up-name"
            placeholder="輸入稱謂"
            value={inputValue.name}
            onChange={changeValue}
          />
        </div>
        <div className="flex sign-item">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            id="sign-up-email"
            placeholder="輸入信箱"
            value={inputValue.email}
            onChange={changeValue}
          />
        </div>
        <div className="flex sign-item">
          <i className="fas fa-key"></i>
          <input
            type="password"
            id="sign-up-pwd"
            placeholder="輸入密碼"
            value={inputValue.pwd}
            onChange={changeValue}
          />
        </div>
        <div className={`alert-word ${alertWord.isShow ? 'active' : ''}`}>{alertWord.word}</div>
        <Button text={'註冊'} id={'sign-up-btn'} onClick={signWithFirebase} />
      </div>
      <div className="flex forgot-and-sign-up">
        <div className="flex go-sign-up">
          <p>已經是會員了嗎？</p>
          <button id="go-sign-in-btn" onClick={toggleSignInUp}>
            前往登入
          </button>
        </div>
      </div>
      <div className="flex divider">
        <span></span>
        <p>使用社群帳號註冊</p>
        <span></span>
      </div>
      <div className="social-sign-container">
        <div className="flex google-sign-btn" onClick={signWithGoogle}>
          <img src={googleLoginImg} alt="google login logo" />
          <p>Google 註冊</p>
        </div>
      </div>
      <div className="close-btn" onClick={closeLoginBox}></div>
    </div>
  );
};

export default SignUpPanel;
