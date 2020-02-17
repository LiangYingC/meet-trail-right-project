import React, { Component } from 'react';
import QuestionButton from '../../../shared/QuestionButton';


const BasicInfo = ({ basicInfoData }) => {
    return (
        <section id="trail-detail__basic-info">
            <div className="wrap">
                <h2>基本資訊</h2>
                <div className="basic-info-description">
                    {basicInfoData.description}
                </div>

                <div className="flex basic-info-list">
                    <div className="top-left">
                        <div className="flex basic-info-item">
                            <p className="subtitle">所在位置 :</p>
                            <p>{`${basicInfoData.location.city}${basicInfoData.location.dist}`}</p>
                        </div>
                        <div className="flex basic-info-item">
                            <p className="subtitle">登頂風景 :</p>
                            <p>
                                {
                                    basicInfoData.scenery.map((scenery, index) => {
                                        return <span key={index}>{`${scenery} `}</span>
                                    })
                                }
                            </p>
                        </div>
                        <div className="flex basic-info-item">
                            <p className="subtitle">海拔高度 :</p>
                            <p>{basicInfoData.height} 公尺</p>
                        </div>
                    </div>
                    <div className="down-right">
                        <div className="flex basic-info-item">
                            <p className="subtitle">適合時間 :</p>
                            <p>全程約  {
                                basicInfoData.time > 60 ?
                                    `${Math.floor(basicInfoData.time / 60)} 小時 
                                                    ${basicInfoData.time % 60 > 0 ? `${basicInfoData.time % 60}分鐘` : ''}`
                                    : `${basicInfoData.time} 分鐘`
                            } </p>
                        </div>

                        <div className="flex basic-info-item">
                            <p className="subtitle">步道全長 :</p>
                            <p>整趟約 {basicInfoData.length} 公里</p>
                        </div>
                        <div className="flex basic-info-item">
                            <p className="subtitle">步道難度 :</p>
                            <p>{basicInfoData.difficulty}
                                <QuestionButton />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BasicInfo