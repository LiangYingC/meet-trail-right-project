import React, { Component, Fragment } from 'react';
import ProfileNoList from './ProfileNoList.jsx';

class ProfileReport extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <div className="title">
                    <h2>步道近況回報</h2>
                </div>
                <div className="num-list">
                    <p>目前有 <span>0</span> 則步道近況回報</p>
                </div>
                <ProfileNoList text={'目前尚無任何步道近況回報喔'} />
            </Fragment>
        )
    }
}

export default ProfileReport;