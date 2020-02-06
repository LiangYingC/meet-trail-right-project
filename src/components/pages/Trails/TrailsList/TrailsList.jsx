import React, { Component } from 'react';
import {
    HashRouter as Router,
    Link
} from "react-router-dom";
import Button from '../../../shared/Button';



const TrailsList = ({ trailsData }) => {
    console.log(trailsData)
    return (
        <section className="trails">
            <div className="wrap">
                <div className="flex">
                    <div className="trails-qty">
                        篩選結果有 {trailsData.length} 筆資料
                    </div>
                    <div className="trail-offer-btn">
                        <Button text={'我要提供步道資料'} />
                    </div>
                </div>
                <div className="flex trails-list">
                    {trailsData.map(trail => {
                        return (
                            <Router>
                                <div className="trail-item">
                                    <Link to={`/trails/detail/${trail.id}`}>
                                        <div className="trail-img">
                                            <img src={trail.main_image} alt={`${trail.title}圖片`} />
                                        </div>
                                        <div className="trail-detail">
                                            <h3>
                                                <i className="fas fa-mountain"></i>
                                                {trail.title}
                                            </h3>
                                            <p className="trail-location">
                                                <i className="fas fa-map-marker-alt"></i>
                                                {trail.location.city}{trail.location.dist}
                                            </p>
                                            <p className="trail-difficuty">
                                                <i className="fas fa-hiking"></i>
                                                {trail.difficulty}
                                            </p>
                                            <p className="trail-length">
                                                <i className="fas fa-map"></i>
                                                {trail.length} 公里
                                            </p>
                                            <p className="trail-time">
                                                <i className="far fa-clock"></i>
                                                {trail.time}
                                            </p>
                                            <div className="trail-stars">評價系統的星星（多少則）</div>
                                        </div>
                                        <div className="decoration"></div>
                                    </Link>
                                </div>
                            </Router>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default TrailsList