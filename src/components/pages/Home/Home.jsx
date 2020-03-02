import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { DB } from '../../../lib';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import TrailsList from '../../shared/TrailsList';
import SearchBar from '../../shared/SearchBar';
import Button from '../../shared/Button';
import LoginBox from '../../shared/LoginBox';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowLoginBox: false,
            homeTopList: null,
            likeList: null,
            popularList: null
        }
    }

    componentDidMount() {
        DB.ref('trails')
            .orderBy('timestamp', 'desc')
            .get()
            .then(querySnapshot => {
                let trailsData = []
                querySnapshot.forEach(doc => {
                    if (doc.data().title.indexOf(`合歡`) >= 0) {
                        trailsData.push(doc.data())
                    }
                    this.setState({
                        homeTopList: trailsData
                    })
                })
            })


        DB.ref('trails')
            .orderBy('like_data.count', 'desc')
            .limit(4)
            .get()
            .then(querySnapshot => {
                let trailsData = []
                querySnapshot.forEach(doc => {
                    trailsData.push(doc.data())
                    this.setState({
                        likeList: trailsData
                    })
                })
            })

        DB.ref('trails')
            .orderBy('view_count', 'desc')
            .limit(4)
            .get()
            .then(querySnapshot => {
                let trailsData = []
                querySnapshot.forEach(doc => {
                    trailsData.push(doc.data())
                    this.setState({
                        popularList: trailsData
                    })
                })
            })
    }

    toggleLoginBox = () => {
        this.setState(preState => ({
            ...preState,
            isShowLoginBox: !preState.isShowLoginBox,
        }))
    }

    render() {
        const {
            homeTopList,
            likeList,
            popularList,
            isShowLoginBox
        } = this.state
        const { history } = this.props
        return (
            <Fragment>
                <Header history={history} />
                <section id="home">
                    <div className="home-banner">

                        <div className="layer"></div>

                        <div className="home-content">
                            <div className="home-title">
                                <h2>遇見最嚮往的山林步道</h2>
                                <p>透過資訊整合與山友分享，尋找最適合前往的步道</p>
                            </div>
                            < SearchBar history={history} />
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
                                <div className="description web">
                                    觀看步道週天氣、基本資訊以及社群近況
                                </div>
                                <div className="description mobile">
                                    步道資訊<br />社群近況
                                </div>
                            </div>
                            <div className="intro-item">
                                <div className="icon">
                                    <i className="fas fa-info-circle"></i>
                                </div>
                                <div className="description web">
                                    獲得山友回報的步道最新近況與步道評論
                                </div>
                                <div className="description mobile">
                                    山友回報<br />即時資訊
                                </div>
                            </div>
                            <div className="intro-item">
                                <div className="icon">
                                    <i className="fas fa-edit"></i>
                                </div>
                                <div className="description web">
                                    分享喜愛的步道資訊，讓山友有更佳資訊
                                </div>
                                <div className="description mobile">
                                    分享步道<br />資訊互惠
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-top">
                        <div className="wrap">
                            <div className="home-top-title">
                                <i className="fas fa-hiking"></i>  精選步道輯：合歡山
                            </div>
                            <div className="flex home-top-list">
                                {
                                    homeTopList === null ?
                                        '' :
                                        homeTopList.map(trail => {
                                            return (
                                                <div className="home-top-item" style={{
                                                    backgroundImage: `url(${trail.images.main_image})`
                                                }} key={trail.id}>
                                                    <Link to={`/trails/detail/${trail.id}`}>
                                                        <div className="layer"></div>
                                                        <div className="content">
                                                            <h3>{trail.title}</h3>
                                                        </div>
                                                        <div className="flex tag">
                                                            <div className="time">  {
                                                                trail.time > 60 ?
                                                                    `${Math.floor(trail.time / 60)} 小時 
                                                    ${trail.time % 60 > 0 ? `${trail.time % 60}分鐘` : ''}`
                                                                    : `${trail.time} 分鐘`
                                                            }</div>
                                                            <div className="diffuculty">{trail.difficulty}</div>
                                                            <div className="city">{trail.location.city}</div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="home-trail-list">
                        <div className="wrap">


                            <Fragment>
                                {
                                    likeList === null ?
                                        '' :
                                        <div className="like-rank">
                                            <div className="title"><i className="fas fa-heart"></i> 最多人喜愛</div>
                                            < TrailsList
                                                trailsList={likeList}
                                                toggleLoginBox={this.toggleLoginBox} />
                                        </div>
                                }

                                {
                                    popularList === null ?
                                        '' :
                                        <div className="popular-rank">
                                            <div className="title"> <i className="fas fa-fire"></i> 最熱門觀看</div>
                                            < TrailsList
                                                trailsList={popularList}
                                                toggleLoginBox={this.toggleLoginBox}
                                            />
                                        </div>

                                }
                            </Fragment>

                        </div>
                    </div>
                </section>
                <LoginBox
                    isShowLoginBox={isShowLoginBox}
                    closeLoginBox={this.toggleLoginBox}
                />
                <Footer />
            </Fragment>
        )
    }
}

export default Home;