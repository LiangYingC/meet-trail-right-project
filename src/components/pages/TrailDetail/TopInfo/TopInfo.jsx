import React, { Component } from 'react';
import Weather from './Weather.jsx';
import Report from './Report.jsx';

const TopInfo = ({ topInfoData }) => {
    return (
        <section id="trail-detail__top-info">
            <div className="wrap">
                <div className="trail-detail__top-info">
                    <div className="flex top-info__header">
                        <h1>{topInfoData.title}</h1>
                        <div className="top-info__stars"></div>
                        <p>創建者：{topInfoData.createUser.name}</p>
                        <p>創建日期：{topInfoData.createTime}</p>
                    </div>
                    <div className="flex top-info__pic-and-report">
                        <div className="top-info__pic">
                            <img src={topInfoData.mainImage} alt="知高圳步道圖片" />
                        </div>
                        <Report id={topInfoData.id} />
                    </div>
                    <Weather location={topInfoData.location} />
                </div>
            </div>
        </section>
    )

}


export default TopInfo
