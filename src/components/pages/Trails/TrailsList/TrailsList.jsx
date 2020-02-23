import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { DB } from '../../../../lib';
import LoginBox from '../../../shared/LoginBox';
import AuthUserContext from '../../../../contexts/AuthUserContext';


class TrailsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowLoginBox: false,
            isShowTopBtn: false,
            positionY: window.pageYOffset,
            movedY: 0,
            positionYCount: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        console.log('Trail List component')
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const lastPositionY = this.state.positionY
        this.setState({
            positionY: window.pageYOffset
        }, () => this.calculateScrollHeight(lastPositionY))
    }

    calculateScrollHeight = (lastPositonY) => {
        // 取得新舊位置後，計算出目前往下滑動多少距離
        const scrollHeight = window.pageYOffset - lastPositonY
        const { movedY } = this.state
        this.setState({
            movedY: movedY + scrollHeight
        }, this.shouldShow)
    }

    shouldShow = () => {
        const { positionY } = this.state
        if (positionY >= 150) {
            this.setState({
                isShowTopBtn: true
            })
        } else if (positionY < 150) {
            this.setState({
                isShowTopBtn: false
            })
        }
    }

    scrollToTop = () => {
        let moveHeight = this.state.movedY
        const intervalId = setInterval(() => {
            moveHeight = moveHeight - 30
            window.scrollTo(0, moveHeight)
            if (moveHeight <= 0) {
                clearInterval(intervalId)
                this.setState(preState => ({
                    ...preState,
                    positionY: window.pageYOffset,
                    movedY: 0,
                }))
            }
        }, 0)
    }

    toggleLike = (e, id) => {
        e.preventDefault()
        const { userData, isLogin } = this.context

        if (isLogin) {
            if (userData.likeList.indexOf(id) === -1) {
                const newLikeList = userData.likeList
                newLikeList.push(id)
                DB.ref('users').doc(userData.id)
                    .update({
                        like_list: newLikeList
                    })
            } else {
                const newLikeList = userData.likeList.filter(item => item !== id)
                DB.ref('users').doc(userData.id)
                    .update({
                        like_list: newLikeList
                    })
            }
        } else {
            this.setState(preState => ({
                ...preState,
                isShowLoginBox: true
            }))
        }
    }

    closeLoginBox = () => {
        this.setState(preState => ({
            ...preState,
            isShowLoginBox: false,
        }))
    }


    render() {
        const {
            isShowLoginBox,
            isShowTopBtn
        } = this.state
        const { trailsVisible } = this.props
        const { userData } = this.context

        return (
            <Fragment>
                <section id="trails">
                    <div className="wrap">
                        <div className="flex">
                            <div className="trails-qty">
                                篩選結果有 {trailsVisible.length} 筆資料
                            </div>
                        </div>
                        {
                            trailsVisible.length <= 0 ?
                                <div className="no-trails-list">
                                    <div className="empty-img">
                                        <img src="https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FlogoIcon%2Flogo-empty.png?alt=media&token=111f02e5-c068-4bb0-8b81-e878297b7dfe" alt="沒有相關步道" />
                                    </div>
                                    <h2>目前尚無相關步道哦</h2>
                                </div>
                                :
                                <div className="flex trails-list">
                                    {
                                        trailsVisible.map(trail => {
                                            return (
                                                <div className="trail-item" key={trail.id}>
                                                    <Link to={`/trails/detail/${trail.id}`}>
                                                        <div className="trail-img">
                                                            <img src={trail.images.main_image} alt={`${trail.title}圖片`} />
                                                            <div>
                                                                <i className={`far fa-heart ${userData.likeList.indexOf(trail.id) !== -1 ? 'active' : ''}`}
                                                                    onClick={(e) => { this.toggleLike(e, trail.id) }}
                                                                    name={trail.id}>
                                                                </i>
                                                            </div>
                                                        </div>
                                                        <div className="trail-detail">
                                                            <h3>
                                                                <i className="fas fa-mountain"></i>
                                                                {trail.title}
                                                            </h3>
                                                            <p className="trail-location">
                                                                <i className="fas fa-map-marker-alt"></i>
                                                                {trail.location.city} {trail.location.dist}
                                                            </p>
                                                            <p className="trail-difficuty">
                                                                <i className="fas fa-hiking"></i>
                                                                {trail.difficulty}
                                                            </p>
                                                            <p className="trail-length">
                                                                <i className="fas fa-map"></i>
                                                                {trail.length} 公里
                                                        </p>
                                                            <p className="trail-time">
                                                                <i className="far fa-clock"></i>
                                                                {
                                                                    trail.time > 60 ?
                                                                        `${Math.floor(trail.time / 60)} 小時 
                                                    ${trail.time % 60 > 0 ? `${trail.time % 60}分鐘` : ''}`
                                                                        : `${trail.time} 分鐘`
                                                                }
                                                            </p>
                                                            <div className="trail-stars">評價系統的星星（多少則）</div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        })}
                                </div>
                        }
                    </div>
                    <div className={`top-btn ${isShowTopBtn ? 'active' : ''}`} onClick={this.scrollToTop} >
                        <img src="https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FlogoIcon%2FTopBtn.png?alt=media&token=112dbc3e-01f4-4f31-9004-a436806b82cb" alt="Top Button" />
                    </div>
                </section >
                <LoginBox
                    isShowLoginBox={isShowLoginBox}
                    closeLoginBox={this.closeLoginBox}
                />
            </Fragment>
        )
    }
}

TrailsList.contextType = AuthUserContext
export default TrailsList