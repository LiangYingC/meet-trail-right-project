import React, { Component } from 'react';
import Header from '../../../components/shared/Header';
import Footer from '../../../components/shared/Footer';
import Loginbox from '../../shared/LoginBox';

const Login = () => {
    return (
        <>
            <Header />
            <div id="login">
                <div className="wrap">
                    <div className="flex login-container">
                        <section className="login-bg">
                            <div className="layer"></div>
                        </section>
                        <Loginbox isShowLoginBox={true} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login;