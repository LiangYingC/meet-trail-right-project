import React, { Component, Fragment, useCallback } from 'react';
import { DB } from '../../../lib'
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import TopInfo from './TopInfo';
import BasicInfo from './BasicInfo';
import CommunityInfo from './CommunityInfo';
import TrafficInfo from './TrafficInfo';
import LoadingPage from '../../shared/LoadingPage';


class TrailDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trailData: null,
            weatherData: null
        }
    }
    componentDidMount() {
        const dataId = this.props.match.params.id
        // Firebase API 取得單一步道詳細資訊
        DB.ref('trails').doc(dataId)
            .onSnapshot(doc => {
                const trailData = doc.data()
                console.log(trailData)
                DB.ref('users').doc(trailData.create_user_id)
                    .onSnapshot(doc => {
                        const userData = doc.data()
                        console.log(userData)
                        const newTrailData = {
                            ...trailData,
                            createUser: {
                                id: userData.id,
                                name: userData.name,
                                picture: userData.picture
                            }
                        }
                        this.setState({
                            trailData: newTrailData
                        }, this.getTrailCreateUser)
                    })

            })
    }


    render() {
        const { trailData, weatherData } = this.state
        if (trailData === null) {
            return (
                <div></div>
            )
        } else {
            const topInfoData = {
                id: trailData.id,
                title: trailData.title,
                mainImage: trailData.images.main_image,
                createTime: trailData.create_time,
                createUser: trailData.createUser,
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
                id: trailData.id,
                title: trailData.title,
                routeImage: trailData.images.route_image,
                start: trailData.routes.start,
                end: trailData.routes.end,
                type: trailData.routes.type
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