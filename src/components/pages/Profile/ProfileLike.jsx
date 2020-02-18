import React, { Component, Fragment } from 'react';
import {
    HashRouter as Router,
    Link
} from "react-router-dom";
import { DB } from '../../../lib';
import ProfileNoList from './ProfileNoList.jsx';
import AuthUserContext from '../../../contexts/AuthUserContext';

class ProfileLike extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likeList: null
        }
    }

    componentDidMount() {
        const { userData } = this.context
        console.log(userData)
        if (userData.likeList.length > 0) {
            DB.ref('trails')
                .get()
                .then(querySnapshot => {
                    let likeList = []
                    querySnapshot.forEach(doc => {
                        if (userData.likeList.indexOf(doc.id) > -1) {
                            let item = {
                                id: doc.data().id,
                                title: doc.data().title,
                                description: doc.data().description,
                                mainImage: doc.data().images.main_image,
                                location: doc.data().location,
                                scenery: doc.data().scenery,
                                time: doc.data().time
                            }
                            likeList.push(item)
                        }
                        this.setState(preState => ({
                            ...preState,
                            likeList: likeList
                        }))
                    })
                })
        } else {
            this.setState(preState => ({
                ...preState,
                likeList: []
            }))
        }
    }

    processDescription = (description, n) => {
        const l = description.length
        if (l <= n) return description

        return description.slice(0, n - 6) + " ..."
    }

    render() {
        const { likeList } = this.state
        if (likeList === null) {
            return (
                <Fragment>
                    <div className="title">
                        <h2>我的收藏</h2>
                    </div>
                    <div>Loading</div>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <Router>
                    <div className="title">
                        <h2>我的收藏</h2>
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
                                                            <div className="title">
                                                                <h3>{item.title}</h3>
                                                            </div>
                                                            <div className="description">
                                                                <p>{this.processDescription(item.description, 105)}</p>
                                                            </div>
                                                            <div className="flex like-item-subcontainer">
                                                                <div className="flex time">
                                                                    <i className="far fa-clock"></i>
                                                                    <p>
                                                                        {
                                                                            item.time > 60 ?
                                                                                `${Math.floor(item.time / 60)} 小時 
                                                    ${item.time % 60 > 0 ? `${item.time % 60}分鐘` : ''}`
                                                                                : `${item.time} 分鐘`
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="flex location">
                                                                    <i className="fas fa-map-marker-alt"></i>
                                                                    <p>{item.location.city} {item.location.dist}</p>
                                                                </div>
                                                                <div className="flex scenery-list">
                                                                    <i className="fas fa-mountain"></i>
                                                                    {item.scenery.map((scenery, index) => {
                                                                        return <span key={index}>{scenery}</span>
                                                                    })}
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
                </Router>
            </Fragment>
        )
    }
}

ProfileLike.contextType = AuthUserContext
export default ProfileLike;