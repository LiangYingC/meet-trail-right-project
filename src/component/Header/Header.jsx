import React, { Component } from 'react';
import logo from '../../assets/logo/logo260x70.png';

class Header extends Component {
    render() {
        return (
            <section id="header">
                <div className="wrap">
                    <div className="header-logo">
                        <img src={logo} alt="選山步道 Logo" />
                    </div>
                    <div className="header-search">
                        <input type="text" className="search__input" />
                        <div className="search__icon"></div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Header;