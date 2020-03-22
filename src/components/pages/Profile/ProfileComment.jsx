import React, { Component } from 'react';
import ProfileNoList from './ProfileNoList.jsx';

class ProfileComment extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <div className="title">
                    <h2>步道評論</h2>
                </div>
                <div className="num-list">
                    <p>目前有 <span>0</span> 則步道評論</p>
                </div>
                <ProfileNoList text={'目前尚無提供任何評論喔'} />
            </>
        )
    }
}

export default ProfileComment;


