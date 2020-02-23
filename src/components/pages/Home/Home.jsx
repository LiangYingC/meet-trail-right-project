import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import SearchBar from '../../shared/SearchBar';
import Button from '../../shared/Button';

class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <Fragment>
                <Header history={this.props.history} />
                <section id="home">
                    <div className="home-banner">
                        <div className="home-img">
                            <div className="layer"></div>
                            <img src="https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FhomeBanner%2F%E6%96%B0%E5%B1%B1%E5%A4%A2%E6%B9%96%E6%AD%A5%E9%81%93.jpg?alt=media&token=007a9576-446d-43b1-ae3a-99124a034d35" alt="" />
                        </div>
                        <div className="home-content">
                            <div className="home-title">
                                <h2>遇見最嚮往的山林步道</h2>
                                <p>透過資訊整合與山友分享，尋找最適合前往的步道</p>
                            </div>
                            < SearchBar />
                            <div className="home-btn-container">
                                <Link to="/trails">
                                    <Button
                                        text={'前往全部步道'}
                                        id={'home-btn'}
                                    />
                                </Link>
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div className="home-web-intro">
                        <div className="flex wrap">
                            <div className="intro-item">
                                <div className="icon">
                                    <i className="fas fa-mountain"></i>
                                </div>
                                <div className="description">
                                    觀看步道週天氣、基本資訊以及社群近況
                            </div>
                            </div>
                            <div className="intro-item">
                                <div className="icon">
                                    <i className="fas fa-info-circle"></i>
                                </div>
                                <div className="description">
                                    獲得山友回報的步道最新近況與步道評論
                            </div>
                            </div>
                            <div className="intro-item">
                                <div className="icon">
                                    <i className="fas fa-edit"></i>
                                </div>
                                <div className="description">
                                    分享喜愛的步道資訊，讓山友有更佳資訊
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-trail-list">
                        <div className="wrap">
                            <div className="like-rank">
                                <div className="title">最多人收藏</div>
                            </div>
                            <div className="stars-rank">
                                <div className="title">高評價推薦</div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </Fragment>
        )
    }
}

export default Home;