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
                        <div className="flex top-info__content">
                            <p className="flex">創建者：
                            <img src={topInfoData.createUser.picture} alt="創建者圖片" />
                                <span>{topInfoData.createUser.name}</span>
                            </p>
                            <p>創建日期：{topInfoData.createTime}</p>
                        </div>
                    </div>
                    <div className="flex top-info__pic-and-report">
                        <div className="top-info__pic">
                            <img src={topInfoData.mainImage} alt={`${topInfoData.title}圖片`} />
                        </div>
                        <Report
                            id={topInfoData.id}
                            title={topInfoData.title}
                            picture={topInfoData.createUser.picture}
                        />
                    </div>
                    <Weather location={topInfoData.location} />
                </div>
            </div>
        </section>
    )

}


export default TopInfo
