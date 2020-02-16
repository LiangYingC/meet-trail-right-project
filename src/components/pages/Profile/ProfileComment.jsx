import React, { Component, Fragment } from 'react';
import ProfileNoList from './ProfileNoList.jsx';

class ProfileComment extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <div className="title">
                    <h2>步道評論</h2>
                </div>
                <div className="num-list">
                    <p>目前有 <span>0</span> 則步道評論</p>
                </div>
                <ProfileNoList text={'目前尚無提供任何評論喔'} />
            </Fragment>
        )
    }
}

export default ProfileComment;


