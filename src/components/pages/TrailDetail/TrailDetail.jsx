import React, { Component, Fragment } from 'react';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import TopInfo from './TopInfo';
import BasicInfo from './BasicInfo';
import CommunityInfo from './CommunityInfo';
import TrafficInfo from './TrafficInfo';


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

class TrailDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trailData: null,
            weatherData: null
        }
    }
    componentDidMount() {
        // Firebase API 取得單一步道詳細資訊
        const dataId = this.props.match.params.id
        const db = firebase.firestore()
        const trailsRef = db.collection('trails').doc(dataId)
        trailsRef.get().then(doc => {
            const trailData = doc.data()
            this.setState({
                trailData: trailData
            })

            // Wheather API 取得天氣資訊
            const weatherConfig = {
                apiKey: 'CWB-8C6758C8-C956-44EB-B0AD-7228A59F92C0',
                baseUrl: 'https://opendata.cwb.gov.tw/api/v1/rest/datastore'
            }
            const cityId = weatherCitys.filter(city => city.name === trailData.location.city)[0].id
            const dist = trailData.location.dist
            const url = `${weatherConfig.baseUrl}/${cityId}?Authorization=${weatherConfig.apiKey}&locationName=${dist}&elementName=MaxAT,MinAT,PoP12h,WeatherDescription`
            fetch(url, { method: 'GET' })
                .then(res => res.json())
                .then(result => {
                    this.setState({
                        weatherData: result
                    })
                })
        })
    }

    render() {
        const { trailData, weatherData } = this.state
        if (trailData === null) {
            return (
                <Fragment>
                    <div style={{ fontSize: '45px', padding: '50px' }}>有資料還在 Loading 別急等我啊啊啊</div>
                </Fragment>

            )
        } else {
            const topInfoData = {
                title: trailData.title,
                mainImage: trailData.main_image,
                createTime: trailData.create_time,
                createUser: trailData.create_user,
                weatherData: weatherData
            }

            const basicInfoData = {
                description: trailData.description,
                scenery: trailData.scenery,
                location: trailData.location,
                height: trailData.height,
                time: trailData.time,
                length: trailData.length,
                difficulty: trailData.difficulty
            }

            const communityInfoData = {
                title: trailData.title
            }

            const trafficInfoData = {
                title: trailData.title,
                start: trailData.tr_start,
                end: trailData.tr_end
            }

            return (
                <Fragment>
                    <Header />
                    <TopInfo topInfoData={topInfoData} />
                    <BasicInfo basicInfoData={basicInfoData} />
                    <CommunityInfo communityInfoData={communityInfoData} />
                    <TrafficInfo trafficInfoData={trafficInfoData} />
                    <Footer />
                    {/* <div className="flex side-bar">
                    <div className="dot dot-1">
                        <a href="#trail-detail__top-info"></a>
                    </div>
                    <a href="#trail-detail__basic-info">
                        <div className="dot dot-2"></div>
                    </a>
                    <div className="dot dot-3">
                        <a href="#trail-detail__community-info"></a>
                    </div>
                    <div className="dot dot-4">
                        <a href="#trail-detail__traffic-info"></a>
                    </div>
                    <div className="dot dot-5">
                        <a href=""></a>
                    </div>
                </div> */}
                </Fragment >
            )
        }
    }
}

export default TrailDetail;