import React, { Component } from 'react';
import './BasicInfo.css';

class BasicInfo extends Component {
    render() {
        return (
            <section id="trail-detail__basic-info">
                <div className="wrap">
                    <h2>步道資訊</h2>
                    <div className="basic-info-description">
                        知高圳步道位於烏日的知高圳，圳水引入筏子溪溪水，是南屯、烏日、大肚三地農田的重要灌溉水源。
                            沿著水圳以枕木鋪設修建的步道，從烏日善光寺可通至大肚，步道平緩好走，只有好漢坡稍有坡度，但也僅 80 公尺的落差，S 型的水圳步道古樸優美，欣賞架高渡槽的引水道，聽著潺潺的流水聲，沒有太多曝曬的路段，即使在炎炎夏日裡，
                            都能感到沁涼，適合闔家休閒健行。行經好漢坡、雪蓮步道至學田山頂，有一座落日平台，180 度的展望令人身心舒暢，綠色的草坡十分迷人，是欣賞夕陽的秘境。
                                </div>

                    <div className="flex basic-info-list">
                        <div className="top-left">
                            <div className="flex basic-info-item">
                                <p className="subtitle">開放狀態 :</p>
                                <p>全線開放</p>
                            </div>
                            <div className="flex basic-info-item">
                                <p className="subtitle">所在位置 :</p>
                                <p>台中市烏日區</p>
                            </div>
                            <div className="flex basic-info-item">
                                <p className="subtitle">海拔高度 :</p>
                                <p>139 公尺</p>
                            </div>
                        </div>
                        <div className="down-right">
                            <div className="flex basic-info-item">
                                <p className="subtitle">所需時間 :</p>
                                <p>往返 1 小時 40 分鐘</p>
                            </div>

                            <div className="flex basic-info-item">
                                <p className="subtitle">步道全長 :</p>
                                <p>單趟 2 公里</p>
                            </div>
                            <div className="flex basic-info-item">
                                <p className="subtitle">步道難度 :</p>
                                <p>輕鬆</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default BasicInfo