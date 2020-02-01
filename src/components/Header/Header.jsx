import React, { Component } from 'react';
import headerLogoImg from '../../assets/logo/logo260x70.png';
import searchImg from '../../assets/img/search.png';
import userImg from '../../assets/img/user.png';
import downArrowImg from '../../assets/img/downArrow.png';
import './Header.css'


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLanguagOptionsOpen: false
        }
    }

    toggleLanguagOptions = () => {
        this.setState((preState) => ({
            isLanguagOptionsOpen: !preState.isLanguagOptionsOpen
        }))
    }

    render() {
        const { isLanguagOptionsOpen } = this.state
        return (
            <section id="header">
                <div className="flex wrap">
                    <div className="header-logo">
                        <img src={headerLogoImg} alt="選山步道 logo" />
                    </div>
                    <div className="flex header-search">
                        <input type="text" id="search-input" placeholder="請輸入步道名稱" />
                        <div className="search-icon">
                            <img src={searchImg} alt="search logo" />
                        </div>
                    </div>
                    <div className="header-nav">
                        <ul>
                            <li>全部步道</li>
                            <li >
                                <div id="header-language-btn" onClick={this.toggleLanguagOptions}>
                                    <p>繁體中文</p>
                                    <div className={`down-arrow-icon ${isLanguagOptionsOpen ? 'down-arrow-icon--active' : ''}`}><img src={downArrowImg} alt="more options logo" /></div>
                                    <div className={`language-options-box ${isLanguagOptionsOpen ? 'language-options-box--active' : ''}`} >
                                        <p>繁體中文</p>
                                        <p>English</p>
                                    </div>
                                </div>
                            </li>
                            <div id="header-user-btn">
                                <img src={userImg} alt="user logo" />
                            </div>
                        </ul>
                    </div>
                </div>
            </section>
        )
    }
}

export default Header;