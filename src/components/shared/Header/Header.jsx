import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Link,
} from 'react-router-dom';
import headerLogoImg from '../../../assets/logo/logo260x70-deep .png';
import headerLogoSmallImg from '../../../assets/logo/logo270x270-deep .png';
import userImg from '../../../assets/img/user.png';
import downArrowImg from '../../../assets/img/downArrow.png';
import Loginbox from '../../../components/shared/LoginBox';
import AuthUserContext from '../../../contexts/AuthUserContext';
import SearchBar from '../SearchBar'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            positionY: window.pageYOffset,
            movedY: 0,
            isHideHeader: false,
            isLanguagOptionsOpen: false,
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        // 當往下滾動發生，取得舊的位置，並將位置轉換成新的
        const lastPositonY = this.state.positionY
        this.setState((preState) => ({
            ...preState,
            positionY: window.pageYOffset
        }), () => this.calculateScrollHeight(lastPositonY))
    }

    calculateScrollHeight = (lastPositonY) => {
        // 取得新舊位置後，計算出目前往下滑動多少距離
        const scrollHeight = window.pageYOffset - lastPositonY
        this.setState((preState) => ({
            ...preState,
            movedY: preState.movedY + scrollHeight
        }), this.shouldHidden)
    }

    shouldHidden = () => {
        const { movedY, positionY } = this.state
        if (movedY > 30) {
            this.setState(preState => ({
                ...preState,
                movedY: 0,
                isHideHeader: true
            }))
        } else if (movedY <= -90 || positionY <= 30) {
            this.setState(preState => ({
                ...preState,
                movedY: 0,
                isHideHeader: false
            }))
        }
    }

    toggleLanguagOptions = () => {
        this.setState(preState => ({
            ...preState,
            isLanguagOptionsOpen: !preState.isLanguagOptionsOpen
        }))
    }

    render() {
        const { history } = this.props
        const { isLanguagOptionsOpen, isHideHeader } = this.state
        const { isLogin, userData } = this.context

        return (
            <Fragment >
                <header id="header" className={`${isHideHeader ? 'hide' : ''}`}>
                    <div className="flex wrap">
                        <Link to='/' >
                            <div className="header-logo">
                                <img src={headerLogoImg} alt="選山步道 logo" />
                            </div>
                        </Link>
                        <Link to='/' >
                            <div className="header-small-logo">
                                <img src={headerLogoSmallImg} alt="選山步道 logo" />
                            </div>
                        </Link>
                        {history ?
                            history.location.pathname === '/' ?
                                ''
                                :
                                <div className="header-search-bar">
                                    <SearchBar
                                        history={history}
                                        handleSearch={this.props.handleSearch}
                                    />
                                </div>
                            : <div className="header-search-bar">
                                <SearchBar
                                    history={history}
                                    handleSearch={this.props.handleSearch}
                                />
                            </div>
                        }
                        <div className="header-nav">
                            <ul>
                                <Link to='/trails' >
                                    <li>全部步道</li>
                                </Link>
                                <Link to={`${isLogin ? '/trailCreate' : '/login'}`} >
                                    <li>提供步道</li>
                                </Link>
                                {/* <li >
                                <div id="header-language-btn" onClick={this.toggleLanguagOptions}>
                                    <p>繁體中文</p>
                                    <div className={`down-arrow-icon ${isLanguagOptionsOpen ? 'active' : ''}`}><img src={downArrowImg} alt="more options logo" /></div>
                                    <div className={`language-options-box ${isLanguagOptionsOpen ? 'active' : ''}`} >
                                        <p>繁體中文</p>
                                        <p>English</p>
                                    </div>
                                </div>
                            </li> */}
                                <Link to={`${isLogin ? '/profile' : '/login'}`} >
                                    <div id="header-user-btn">
                                        {
                                            isLogin ? <img src={userData.picture} alt={`${userData.name}的照片`} />
                                                : <img src={userImg} alt="user logo" />
                                        }
                                    </div>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </header>
                <div className={`header-mobile-nav ${isHideHeader ? 'hide' : ''}`}>
                    <ul>
                        <Link to='/trails' >
                            <li>
                                <i className="fas fa-mountain"></i>
                                <p>全部步道</p>
                            </li>
                        </Link>
                        <Link to={`${isLogin ? '/trailCreate' : '/login'}`} >
                            <li>
                                <i className="fas fa-pen-square"></i>
                                <p>提供步道</p>
                            </li>
                        </Link>
                        {/* <li >
                                <div id="header-language-btn" onClick={this.toggleLanguagOptions}>
                                    <p>繁體中文</p>
                                    <div className={`down-arrow-icon ${isLanguagOptionsOpen ? 'active' : ''}`}><img src={downArrowImg} alt="more options logo" /></div>
                                    <div className={`language-options-box ${isLanguagOptionsOpen ? 'active' : ''}`} >
                                        <p>繁體中文</p>
                                        <p>English</p>
                                    </div>
                                </div>
                            </li> */}
                        <Link to={`${isLogin ? '/profile' : '/login'}`} >
                            <div id="header-user-btn">
                                {
                                    isLogin ? <img src={userData.picture} alt={`${userData.name}的照片`} />
                                        : <img src={userImg} alt="user logo" />
                                }
                                <p>個人資料</p>
                            </div>
                        </Link>
                    </ul>
                </div>
            </Fragment >
        )
    }
}

Header.contextType = AuthUserContext
export default Header;