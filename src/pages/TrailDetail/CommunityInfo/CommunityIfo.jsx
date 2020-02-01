import React, { Component } from 'react';
import './CommunityInfo.css';

class CommunityInfo extends Component {
    render() {
        return (
            <section id="trail-detail__community-info">
                <div className="wrap">
                    <h2>社群資訊</h2>
                    <div className="community-info__instagram">
                        <h3> Instagram</h3>
                        <div className="instagram-item">

                        </div>
                        <div className="instagram-item">

                        </div>
                        <div className="instagram-item">

                        </div>
                    </div>
                    <div className="community-info__youtube">
                        <h3>Youtube</h3>
                        <div className="flex youtube-list">
                            <div className="youtube-item">
                                <iframe width="355" height="200" src="https://www.youtube.com/embed/JkeQPPSxPyE" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className="youtube-item">
                                <iframe width="355" height="200" src="https://www.youtube.com/embed/tQmmnJq2HT0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                            <div className="youtube-item">
                                <iframe width="355" height="200" src="https://www.youtube.com/embed/n8RSd3F4Kvs" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        )
    }
}

export default CommunityInfo