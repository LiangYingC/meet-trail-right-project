import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { DB, APP } from '../../../lib';
import ProfileNoList from './ProfileNoList.jsx';
import LikeButton from '../../shared/LikeButton';
import AuthUserContext from '../../../contexts/AuthUserContext';
import LoadingWave from '../../shared/LoadingWave';

class ProfileLike extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likeList: null
        }
    }

    componentDidMount() {
        const { userData } = this.context
        if (userData.likeList) {
            DB.ref('trails')
                .get()
                .then(querySnapshot => {
                    let likeList = []
                    querySnapshot.forEach(doc => {
                        userData.likeList.forEach(likeItem => {
                            if (doc.id === likeItem.id) {
                                let item = {
                                    id: doc.data().id,
                                    title: doc.data().title,
                                    description: doc.data().description,
                                    mainImage: doc.data().images.main_image,
                                    location: doc.data().location,
                                    scenery: doc.data().scenery,
                                    time: doc.data().time,
                                    likeTimestamp: likeItem.timestamp
                                }
                                likeList.push(item)
                            }
                        })

                        const sortLikeList = likeList.sort((a, b) => {
                            return a.likeTimestamp < b.likeTimestamp ? 1 : -1
                        })
                        this.setState({
                            likeList: sortLikeList
                        })
                    })
                })
        } else {
            this.setState({
                likeList: []
            })
        }
    }

    render() {
        const { likeList } = this.state
        if (likeList === null) {
            return (
                <>
                    <div className="title">
                        <h2>我的最愛</h2>
                    </div>
                    <LoadingWave />
                </>
            )
        }
        return (
            <>
                <div className="title">
                    <h2>我的最愛</h2>
                </div>
                <div className="num-list">
                    <p>目前有 <span>{likeList.length}</span> 則收藏</p>
                </div>
                {
                    likeList.length === 0 ?
                        <ProfileNoList text={'目前尚無收藏的步道喔'} /> :
                        <div className="like-list">
                            <div className="wrap">
                                {
                                    likeList.map((item, index) => {
                                        return (
                                            <Link to={`/trails/detail/${item.id}`}>
                                                <div className={`flex like-item-container key=${item.id}`}>
                                                    <div className="like-item-img" key={index}>
                                                        <img src={item.mainImage} alt={`${item.title}的圖片`} />
                                                    </div>
                                                    <div className="flex like-item-info">
                                                        <div className="flex title">
                                                            <h3>{item.title}</h3>
                                                            <LikeButton trailId={item.id} />
                                                        </div>
                                                        <div className="description">
                                                            {item.description}
                                                        </div>
                                                        <div className="flex like-item-subcontainer">
                                                            <div className="flex time">
                                                                <i className="far fa-clock"></i>
                                                                <p>
                                                                    {APP.transfromTimefromMinToHourMin(item.time)}
                                                                </p>
                                                            </div>
                                                            <div className="flex location">
                                                                <i className="fas fa-map-marker-alt"></i>
                                                                <p>{item.location.city} {item.location.dist}</p>
                                                            </div>
                                                            <div className="flex scenery-list">
                                                                <i className="fas fa-mountain"></i>
                                                                <div>
                                                                    {item.scenery.map((scenery, index) => {
                                                                        return <span key={index}>{scenery}</span>
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                }
            </>
        )
    }
}

ProfileLike.contextType = AuthUserContext
export default ProfileLike;