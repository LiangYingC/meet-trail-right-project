import React, { Component } from 'react';
import trailImg from '../../../../../assets/img/知高圳步道.jpg'
import './Weather.scss'

class Weather extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="flex weather-list">
                <div className="weather-item">
                    <div className="flex weather-date-and-day">
                        <div className="weather-date">02/01</div>
                        <div className="weather-day">星期六</div>
                    </div>
                    <img src={trailImg} className="weather-icon" />
                    <div className="weather-temperature">8~17</div>
                    <p className="weather-status">晴時多雲</p>
                </div>
                <div className="weather-item">
                    <div className="flex weather-date-and-day">
                        <div className="weather-date">02/01</div>
                        <div className="weather-day">星期六</div>
                    </div>
                    <img src={trailImg} className="weather-icon" />
                    <div className="weather-temperature">8~17</div>
                    <p className="weather-status">晴時多雲</p>
                </div>
                <div className="weather-item">
                    <div className="flex weather-date-and-day">
                        <div className="weather-date">02/01</div>
                        <div className="weather-day">星期六</div>
                    </div>
                    <img src={trailImg} className="weather-icon" />
                    <div className="weather-temperature">8~17</div>
                    <p className="weather-status">晴時多雲</p>
                </div>
                <div className="weather-item">
                    <div className="flex weather-date-and-day">
                        <div className="weather-date">02/01</div>
                        <div className="weather-day">星期六</div>
                    </div>
                    <img src={trailImg} className="weather-icon" />
                    <div className="weather-temperature">8~17</div>
                    <p className="weather-status">晴時多雲</p>
                </div>
                <div className="weather-item">
                    <div className="flex weather-date-and-day">
                        <div className="weather-date">02/01</div>
                        <div className="weather-day">星期六</div>
                    </div>
                    <img src={trailImg} className="weather-icon" />
                    <div className="weather-temperature">8~17</div>
                    <p className="weather-status">晴時多雲</p>
                </div>
                <div className="weather-item">
                    <div className="flex weather-date-and-day">
                        <div className="weather-date">02/01</div>
                        <div className="weather-day">星期六</div>
                    </div>
                    <img src={trailImg} className="weather-icon" />
                    <div className="weather-temperature">8~17</div>
                    <p className="weather-status">晴時多雲</p>
                </div>
                <div className="weather-item">
                    <div className="flex weather-date-and-day">
                        <div className="weather-date">02/01</div>
                        <div className="weather-day">星期六</div>
                    </div>
                    <img src={trailImg} className="weather-icon" />
                    <div className="weather-temperature">8~17</div>
                    <p className="weather-status">晴時多雲</p>
                </div>

            </div>
        )
    }
}

export default Weather