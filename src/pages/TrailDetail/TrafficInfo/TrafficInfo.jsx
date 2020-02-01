import React, { Component } from 'react';
import Button from '../../../components/Button';
import './TrafficInfo.css';

class TrafficInfo extends Component {
    render() {
        return (
            <section id="trail-detail__traffic-info">
                <div className="wrap">
                    <h2>交通資訊</h2>
                    <div className="flex traffic-way-btns">
                        <Button text={'開車前往步道'} name={'go-by-car-btn'} />
                        <Button text={'搭乘大眾運輸'} name={'go-by-transport-btn'} />
                    </div>
                    <div className="traffic-info__google-map">
                        <h3>Google 地圖</h3>
                        <div className="flex">
                            <input type="text" placeholder="出發地點" />
                            <input type="text" placeholder="抵達地點" />
                            <Button text={'查詢'} />
                        </div>
                    </div>
                    <div className="traffic-info__trail-map">
                        <h3>步道路線圖</h3>
                        <img src="" alt="" />
                    </div>
                </div>
            </section>
        )
    }
}

export default TrafficInfo