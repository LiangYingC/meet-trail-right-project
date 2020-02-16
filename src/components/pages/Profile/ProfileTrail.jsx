import React, { Component, Fragment } from 'react';
import ProfileNoList from './ProfileNoList.jsx';

class ProfileTrail extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <div className="title">
                    <h2>我提供的步道</h2>
                </div>
                <div className="num-list">
                    <p>目前已提供 <span>0</span> 則步道資訊</p>
                </div>
                <ProfileNoList text={'目前尚無提供任何步道喔'} />
            </Fragment>
        )
    }
}

export default ProfileTrail;