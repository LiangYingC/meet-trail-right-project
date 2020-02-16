import React, { Component, Fragment } from 'react';
import ProfileNoList from './ProfileNoList.jsx';

class ProfileLike extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <div className="title">
                    <h2>我的收藏</h2>
                </div>
                <div className="num-list">
                    <p>目前有 <span>0</span> 則收藏</p>
                </div>
                <ProfileNoList text={'目前尚無收藏的步道喔'} />
            </Fragment>
        )
    }
}

export default ProfileLike;