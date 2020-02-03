import React, { Component, Fragment } from 'react';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import TopInfo from './TopInfo';
import BasicInfo from './BasicInfo';
import CommunityInfo from './CommunityInfo';
import TrafficInfo from './TrafficInfo';
import './TrailDetail.css';

// function TrailDetail() {
//     const dataId = useParams()
//     console.log(dataId)
//     const db = firebase.firestore()
//     const trailsRef = db.collection('trails').doc(dataId)
//     return (
//         trailsRef.get()
//             .then(doc => {
//                 const trailData = doc.data()
//                 console.log(trailData)
//                 const topInfoData = {
//                     title: trailData.title,
//                     mainImage: trailData.main_image,
//                     createTime: trailData.create_time,
//                     createUser: trailData.create_user
//                 }

//                 const basicInfoData = {
//                     description: trailData.description,
//                     status: trailData.status,
//                     location: trailData.location,
//                     height: trailData.height,
//                     time: trailData.time,
//                     length: trailData.length,
//                     difficulty: trailData.difficulty
//                 }

//                 const communityInfoData = {
//                     title: trailData.title
//                 }

//                 const trafficInfoData = {
//                     title: trailData.title,
//                     start: trailData.tr_start,
//                     end: trailData.tr_end
//                 }

//                 return (
//                     <Fragment>
//                         <Header />
//                         <TopInfo topInfoData={topInfoData} />
//                         <BasicInfo basicInfoData={basicInfoData} />
//                         <CommunityInfo communityInfoData={communityInfoData} />
//                         <TrafficInfo trafficInfoData={trafficInfoData} />
//                         <Footer />
//                     </Fragment >
//                 )
//             })
//     )

// }

class TrailDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trailData: null
        }
    }
    componentDidMount() {
        const dataId = this.props.match.params.id
        const db = firebase.firestore()
        const trailsRef = db.collection('trails')
        trailsRef.where('id', '==', dataId).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.setState({
                    trailData: doc.data()
                })
            })
        })
    }

    render() {
        const { trailData } = this.state
        if (trailData === null) {
            return (
                <Fragment>
                    <div>Loading</div>
                </Fragment>

            )
        }

        const topInfoData = {
            title: trailData.title,
            mainImage: trailData.main_image,
            createTime: trailData.create_time,
            createUser: trailData.create_user
        }

        const basicInfoData = {
            description: trailData.description,
            status: trailData.status,
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
            </Fragment >
        )
    }
}

export default TrailDetail;