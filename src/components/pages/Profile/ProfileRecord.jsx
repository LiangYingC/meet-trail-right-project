import React, { Component, Fragment } from 'react';
import ProfileNoList from './ProfileNoList.jsx';

class ProfileRecord extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <div className="title">
                    <h2>步道紀錄</h2>
                </div>
                <div className="num-list">
                    <p>目前去過 <span>0</span> 條步道</p>
                </div>
                <ProfileNoList text={'目前尚無任何步道紀錄喔'} />
            </Fragment>
        )
    }
}

export default ProfileRecord;