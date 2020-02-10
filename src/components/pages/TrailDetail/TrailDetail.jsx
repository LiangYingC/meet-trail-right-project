import React, { Component, Fragment } from 'react';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import TopInfo from './TopInfo';
import BasicInfo from './BasicInfo';
import CommunityInfo from './CommunityInfo';
import TrafficInfo from './TrafficInfo';


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
                id: trailData.id,
                title: trailData.title,
                mainImage: trailData.main_image,
                createTime: trailData.create_time,
                createUser: trailData.create_user,
                weatherData: weatherData,
                location: trailData.location
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
                id: trailData.id,
                title: trailData.title
            }

            const trafficInfoData = {
                title: trailData.title,
                routeImage: trailData.route_image,
                start: trailData.tr_start,
                end: trailData.tr_end,
                type: trailData.tr_type
            }

            return (
                <Fragment>
                    <Header />
                    <TopInfo topInfoData={topInfoData} />
                    <BasicInfo basicInfoData={basicInfoData} />
                    <CommunityInfo communityInfoData={communityInfoData} />
                    <TrafficInfo trafficInfoData={trafficInfoData} />
                    <Footer />
                </Fragment >
            )
        }
    }
}

export default TrailDetail;