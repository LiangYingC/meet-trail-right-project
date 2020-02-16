import React, { Component, Fragment } from 'react';
import Header from '../../../components/shared/Header';
import Footer from '../../../components/shared/Footer';
import Loginbox from '../../shared/LoginBox';

class Login extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <Header />
                <section id="login">
                    <div className="wrap">
                        <div className="flex login-container">
                            <div className="login-bg">
                                <div className="layer"></div>
                            </div>
                            <Loginbox isShowLoginBox={true} />
                        </div>
                    </div>
                </section>
                <Footer />
            </Fragment>
        )
    }
}

export default Login;