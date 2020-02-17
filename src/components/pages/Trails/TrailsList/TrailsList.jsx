import React, { Component } from 'react';
import {
    HashRouter as Router,
    Link
} from "react-router-dom";
import { DB } from '../../../../lib';
import AuthUserContext from '../../../../contexts/AuthUserContext';


class TrailsList extends Component {
    constructor(props) {
        super(props)
    }

    toggleLike = (e, id) => {
        e.preventDefault()
        const { userData } = this.context

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
    }

    render() {
        const { trailsVisible } = this.props
        const { userData } = this.context

        return (
            <section className="trails">
                <div className="wrap">
                    <div className="flex">
                        <div className="trails-qty">
                            篩選結果有 {trailsVisible.length} 筆資料
                    </div>
                    </div>
                    <div className="flex trails-list">
                        {
                            trailsVisible.map(trail => {
                                return (
                                    <Router>
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
                                                        {trail.location.city}{trail.location.dist}
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
                                    </Router>
                                )
                            })}
                    </div>
                </div>
            </section >
        )
    }
}

TrailsList.contextType = AuthUserContext
export default TrailsList