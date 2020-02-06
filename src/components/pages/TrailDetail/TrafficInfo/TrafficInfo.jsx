import React, { Component } from 'react';
import Button from '../../../shared/Button';


const TrafficInfo = ({ trafficInfoData }) => {
    return (
        <section id="trail-detail__traffic-info">
            <div className="wrap">
                <h2>路線資訊</h2>
                <div className="traffic-info__trail-map">
                    <h3>步道路線地圖</h3>
                    <div className="trail-info__start-and-end">
                        <p>步道起點：{trafficInfoData.start}</p>
                        <p>步道終點：{trafficInfoData.end}</p>
                    </div>
                </div>
                <div className="traffic-info__google-map">
                    <h3>如何前往步道</h3>
                    <div className="flex">
                        <input type="text" placeholder="出發地點" />
                        <input type="text" placeholder="抵達地點" />
                        <Button text={'查詢'} />
                    </div>
                </div>
            </div>
        </section>
    )
}


export default TrafficInfo