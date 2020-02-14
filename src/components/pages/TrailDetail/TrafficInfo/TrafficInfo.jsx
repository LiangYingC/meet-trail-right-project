import React, { Component } from 'react';
import GoogleMap from './GoogleMap.jsx'



const TrafficInfo = ({ trafficInfoData }) => {
    return (
        <section id="trail-detail__traffic-info">
            <div className="wrap">
                <h2>路線資訊</h2>
                <div className="traffic-info__trail-map">
                    <h3>步道路線圖</h3>
                    <div className="flex route-content">
                        <div className="flex start-and-end">
                            <div className="flex">
                                <img src="https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FhikingIcon%2F%E4%B8%8A%E5%B1%B1.png?alt=media&token=da1b6e23-f3ba-43eb-99f5-05a51424f5e8" alt="上山圖" />
                                <p>推薦步道起點：<span>{trafficInfoData.start}</span></p>
                            </div>
                            <div className="flex" >
                                <img src="https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FhikingIcon%2F%E4%B8%8B%E5%B1%B1.png?alt=media&token=9ab0487b-1006-4a35-ada9-0964aa888d48" alt="下山圖" />
                                <p>推薦步道終點：<span>{trafficInfoData.end}</span></p>
                            </div>
                            <div className="flex" >
                                <img src="https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FhikingIcon%2F%E8%B7%AF%E5%BE%91.png?alt=media&token=c0a30495-f666-489b-b6b1-7cbaf373d3c0" alt="路徑圖" />
                                <p>推薦步道型態：<span>{trafficInfoData.type}</span></p>
                            </div>
                            <a href={trafficInfoData.routeImage} target="_blank">
                                <button className="basic-btn">
                                    看大圖
                                </button>
                            </a>
                        </div>
                        <div className="route-map">
                            <img src={trafficInfoData.routeImage}
                                alt={`${trafficInfoData.title}路線圖`} />
                        </div>
                    </div>
                </div>
                <div className="traffic-info__google-map">
                    <h3>Google 地圖</h3>
                    <div className="google-map">
                        <GoogleMap trailTitle={trafficInfoData.title} />
                    </div>
                </div>
            </div>
        </section>
    )
}


export default TrafficInfo