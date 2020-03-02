import React, { Component } from 'react';
import Youtube from './Youtube.jsx';


const CommunityInfo = ({ communityInfoData }) => {
    return (
        <section id="trail-detail__community-info">
            <div className="wrap">
                <h2>社群資訊</h2>
                <div className="community-info__instagram">
                    <h3> Instagram</h3>
                    <div className="instagram-item">
                        <img src="" alt="" />
                    </div>
                    <div className="instagram-item">

                    </div>
                    <div className="instagram-item">

                    </div>
                </div>
                <Youtube title={communityInfoData.title} id={communityInfoData.id} />
            </div>
        </section>
    )
}

export default CommunityInfo