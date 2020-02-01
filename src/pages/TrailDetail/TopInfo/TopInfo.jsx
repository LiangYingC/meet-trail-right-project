import React, { Component } from 'react';
import Weather from './Weather';
import Button from '../../../components/Button';
import userImg from '../../../assets/img/user.png';
import trailImg from '../../../assets/img/知高圳步道.jpg';
import './TopInfo.css';

class TopInfo extends Component {
    render() {
        return (
            <section id="trail-detail__top-info">
                <div className="wrap">
                    <div className="trail-detail__top-info">
                        <div className="flex top-info__header">
                            <h1>知高圳步道</h1>
                            <div className="top-info__stars"></div>
                        </div>
                        <div className="flex top-info__pic-and-report">
                            <div className="top-info__pic">
                                <img src={trailImg} alt="知高圳步道圖片" />
                            </div>
                            <div className="top-info__report">
                                <div className="flex report-title">
                                    <h2>最新步道狀況回報</h2>
                                    <p> 3 則</p>
                                </div>
                                <div className="report-list">
                                    <div className="report-item">
                                        <div className="flex report-info">
                                            <div className="report-user-img"><img src={userImg} alt="" /></div>
                                            <div className="report-user-name">User Name</div>
                                            <div className="report-time">2020-01-31</div>
                                        </div>
                                        <div className="report-content">目前的步道已經長出新生的綠葉，和照片中有些許不同囉，需要再確認最新狀況</div>
                                    </div>
                                    <div className="report-item">
                                        <div className="flex report-info">
                                            <div className="report-user-img"><img src={userImg} alt="" /></div>
                                            <div className="report-user-name">User Name</div>
                                            <div className="report-time">2020-01-31</div>
                                        </div>
                                        <div className="report-content">目前的步道已經長出新生的綠葉，和照片中有些許不同囉</div>
                                    </div>
                                    <div className="report-item">
                                        <div className="flex report-info">
                                            <div className="report-user-img"><img src={userImg} alt="" /></div>
                                            <div className="report-user-name">User Name</div>
                                            <div className="report-time">2020-01-31</div>
                                        </div>
                                        <div className="report-content">目前的步道已經長出新生的綠葉，和照片中有些許不同囉</div>
                                    </div>
                                    <div className="report-item">
                                        <div className="flex report-info">
                                            <div className="report-user-img"><img src={userImg} alt="" /></div>
                                            <div className="report-user-name">User Name</div>
                                            <div className="report-time">2020-01-31</div>
                                        </div>
                                        <div className="report-content">目前的步道已經長出新生的綠葉，和照片中有些許不同囉</div>
                                    </div>
                                    <div className="report-item">
                                        <div className="flex report-info">
                                            <div className="report-user-img"><img src={userImg} alt="" /></div>
                                            <div className="report-user-name">User Name</div>
                                            <div className="report-time">2020-01-31</div>
                                        </div>
                                        <div className="report-content">目前的步道已經長出新生的綠葉，和照片中有些許不同囉</div>
                                    </div>
                                </div>
                                <Button text={'我要回報步道狀況'} name={'report-btn'} />
                            </div>
                        </div>
                        <Weather />
                    </div>
                </div>
            </section>
        )
    }
}

export default TopInfo
