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
            createList: null
        }
    }

    componentDidMount() {
        const { userData } = this.context
        console.log(userData)
        console.log(userData.createList)
        if (userData.createList.length > 0) {
            DB.ref('trails')
                .get()
                .then(querySnapshot => {
                    let createList = []
                    querySnapshot.forEach(doc => {
                        if (userData.createList.indexOf(doc.id) > -1) {
                            let item = {
                                id: doc.data().id,
                                title: doc.data().title,
                                mainImage: doc.data().images.main_image,
                                createTime: doc.data().create_time
                            }
                            createList.push(item)
                        }
                        this.setState(preState => ({
                            ...preState,
                            createList: createList
                        }))
                    })
                })
        } else {
            this.setState(preState => ({
                ...preState,
                createList: []
            }))
        }
    }


    render() {
        const { createList } = this.state
        if (createList === null) {
            return (
                <Fragment>
                    <div className="title">
                        <h2>我提供的步道</h2>
                    </div>
                    <div>Loading</div>
                </Fragment>
            )
        }
        console.log(createList)
        return (
            <Fragment>
                <Router>
                    <div className="title">
                        <h2>我提供的步道</h2>
                    </div>
                    <div className="num-list">
                        <p>已分享 <span>{createList.length}</span> 個步道囉</p>
                    </div>
                    {
                        createList.length === 0 ?
                            <ProfileNoList text={'目前尚無收藏的步道喔'} /> :
                            <div className="create-list">
                                <div className="flex wrap">
                                    {
                                        createList.map((item, index) => {
                                            return (

                                                <div className={`create-item-container key=${item.id}`}>
                                                    <div className="create-item">
                                                        <div className="img">
                                                            <div className="layer"></div>
                                                            <img src={item.mainImage} alt={`${item.title}的圖片`} />
                                                            <div className="title">{item.title}</div>
                                                        </div>
                                                        <div className="btn-container">
                                                            <Link to={`/trails/detail/${item.id}`}>
                                                                <button id='go-to-trail'>前往步道</button>
                                                            </Link>
                                                            <button id='go-to-edited-trail'>編輯步道</button>
                                                        </div>
                                                    </div>
                                                </div>
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