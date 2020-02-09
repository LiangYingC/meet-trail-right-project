import React, { Component } from 'react';

const weatherCitys = [
    {
        id: 'F-D0047-003',
        name: '宜蘭縣'
    },
    {
        id: 'F-D0047-007',
        name: '桃園市'
    },
    {
        id: 'F-D0047-011',
        name: '新竹縣'
    },
    {
        id: 'F-D0047-019',
        name: '彰化縣'
    },
    {
        id: 'F-D0047-023',
        name: '南投縣'
    },
    {
        id: 'F-D0047-027',
        name: '雲林縣'
    },
    {
        id: 'F-D0047-031',
        name: '嘉義縣'
    },
    {
        id: 'F-D0047-035',
        name: '屏東縣'
    },
    {
        id: 'F-D0047-039',
        name: '臺東縣'
    },
    {
        id: 'F-D0047-043',
        name: '花蓮縣'
    },
    {
        id: 'F-D0047-047',
        name: '澎湖縣'
    },
    {
        id: 'F-D0047-051',
        name: '基隆市'
    },
    {
        id: 'F-D0047-055',
        name: '新竹市'
    },
    {
        id: 'F-D0047-059',
        name: '嘉義市'
    },
    {
        id: 'F-D0047-063',
        name: '台北市'
    },
    {
        id: 'F-D0047-067',
        name: '高雄市'
    },
    {
        id: 'F-D0047-071',
        name: '新北市'
    },
    {
        id: 'F-D0047-075',
        name: '台中市'
    },
    {
        id: 'F-D0047-079',
        name: '台南市'
    },
    {
        id: 'F-D0047-083',
        name: '連江縣'
    },
    {
        id: 'F-D0047-087',
        name: '金門縣'
    },

]


class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weatherList: null
        }
    }

    componentDidMount() {
        const { location } = this.props
        // Wheather API 取得天氣資訊
        const weatherConfig = {
            apiKey: 'CWB-8C6758C8-C956-44EB-B0AD-7228A59F92C0',
            baseUrl: 'https://opendata.cwb.gov.tw/api/v1/rest/datastore'
        }
        const cityId = weatherCitys.filter(city => city.name === location.city)[0].id
        const dist = location.dist
        const url = `${weatherConfig.baseUrl}/${cityId}?Authorization=${weatherConfig.apiKey}&locationName=${dist}&elementName=MaxAT,MinAT,PoP12h,WeatherDescription`
        fetch(url, { method: 'GET' })
            .then(res => res.json())
            .then(data => {

                // 處理天氣資料
                const weatherElementList = data.records.locations[0].location[0].weatherElement
                const PoP12h = weatherElementList[0].time
                const MixAT = weatherElementList[1].time
                const WeatherDescription = weatherElementList[2].time
                const MinAT = weatherElementList[3].time

                // 處理時間資料
                const handleTime = (timeSource) => {
                    let isDay = true
                    if (timeSource.slice(11) === '18:00:00') {
                        isDay = !isDay
                    }
                    return {
                        date: `${timeSource.slice(5, 7)} / ${timeSource.slice(8, 10)}`,
                        isDay: isDay
                    }
                }

                // 處理天氣圖資料
                const setIconLink = (isDay, status) => {
                    if (status === '晴天' || status === '晴') {
                        if (isDay) {
                            return 'https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/weatherIcons%2F%E7%99%BD%E5%A4%A9_%E6%99%B4%E5%A4%A9.png?alt=media&token=e468bb84-bce1-48d6-908f-684064a5d1d1'
                        } return 'https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/weatherIcons%2F%E6%99%9A%E4%B8%8A_%E6%99%B4%E5%A4%A9.png?alt=media&token=af5f39ee-2bd4-4dfa-8620-5bd233130593'
                    } else if (status === '晴時多雲' || status === '多雲時晴') {
                        if (isDay) {
                            return 'https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/weatherIcons%2F%E7%99%BD%E5%A4%A9_%E5%A4%9A%E9%9B%B2%E6%99%82%E6%99%B4.png?alt=media&token=21bec8c6-0143-43d8-b825-ae7cfe457260'
                        } return 'https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/weatherIcons%2F%E6%99%9A%E4%B8%8A_%E5%A4%9A%E9%9B%B2%E6%99%82%E6%99%B4.png?alt=media&token=3d6c2709-dce6-442c-a18e-21115ddd16ef'
                    } else if (status === '多雲' || status === '多雲時陰') {
                        return 'https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/weatherIcons%2F%E5%A4%9A%E9%9B%B2.png?alt=media&token=2cf760b0-190a-4539-921c-b2c8f08f450d'
                    } else if (status === '陰天' || status === '陰') {
                        return 'https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/weatherIcons%2F%E9%99%B0%E5%A4%A9.png?alt=media&token=99c6a370-47db-4449-9905-7a6aa6ebd6b1'
                    } else if (status === '短暫雨' || status === '陰短暫雨') {
                        return 'https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/weatherIcons%2F%E7%9F%AD%E6%9A%AB%E9%99%A3%E9%9B%A8.png?alt=media&token=40a71d61-732c-4cab-98ce-6cff5e2674cd'
                    } else if (status === '多雲短暫雨') {
                        return 'https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/weatherIcons%2F%E5%A4%9A%E9%9B%B2%E7%9F%AD%E6%9A%AB%E9%99%A3%E9%9B%A8.png?alt=media&token=a9551eb1-f769-46a0-8322-e2b0de7cea8b'
                    }
                    else {
                        return 'https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/weatherIcons%2F%E9%99%A3%E9%9B%A8.png?alt=media&token=c8f6edab-4b8c-434a-b68c-75e5e4745719'
                    }
                }

                // 製作最終天氣表
                let weatherList = []
                let weatherIndex = {
                    startNum: null,
                    endNum: null
                }

                if (PoP12h.length === 15) {
                    weatherIndex.startNum = 1
                    weatherIndex.endNum = 15
                } else {
                    weatherIndex.startNum = 0
                    weatherIndex.endNum = 14
                }

                for (let i = weatherIndex.startNum; i < weatherIndex.endNum; i++) {
                    let periodPosition = WeatherDescription[i].elementValue[0].value.indexOf('。')
                    let statusProcessed = WeatherDescription[i].elementValue[0].value.slice(0, periodPosition)
                    let descriptionProcessed = WeatherDescription[i].elementValue[0].value.slice(periodPosition + 1)
                    let timeProcessed = handleTime(PoP12h[i].startTime)
                    let iconLink = setIconLink(timeProcessed.isDay, statusProcessed)

                    let weather = {
                        date: timeProcessed.date,
                        isDay: timeProcessed.isDay,
                        maxAT: MixAT[i].elementValue[0].value,
                        minAT: MinAT[i].elementValue[0].value,
                        rainChance: PoP12h[i].elementValue[0].value,
                        status: statusProcessed,
                        description: descriptionProcessed,
                        iconLink: iconLink
                    }

                    weatherList.push(weather)
                }

                this.setState({
                    weatherList: weatherList
                })
            })
    }


    render() {
        const { weatherList } = this.state
        if (weatherList === null) {
            return <div>Loading</div>
        } else {
            return (
                <div className="flex weather-list">
                    {
                        weatherList.map(weather => {
                            return (
                                <div className="weather-item">
                                    <div className="flex weather-date-and-day">
                                        <div className="weather-date">{weather.date}</div>
                                        <div className={`weather-day ${weather.isDay ? 'day' : 'night'}`}>
                                            {weather.isDay ? '白天' : '夜晚'}
                                        </div>
                                    </div>
                                    <div className="weather-Icon" >
                                        <img
                                            src={weather.iconLink}
                                            alt={weather.status}
                                            title={weather.description} />
                                    </div>
                                    <p className="weather-status">{weather.status}</p>
                                    <div className="weather-temperature">
                                        <i className="fas fa-thermometer-half"></i>
                                        {`${weather.minAT}° ～ ${weather.maxAT}°C`}
                                    </div>
                                    <div className="weather-rain-chain">
                                        <i className="fas fa-umbrella"></i>
                                        {weather.rainChance !== ' ' ? `${weather.rainChance} %` : '尚無資訊'}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div >
            )
        }
    }
}



export default Weather