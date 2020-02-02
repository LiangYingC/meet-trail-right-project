import React, { Component, Fragment } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TopInfo from './TopInfo'
import BasicInfo from './BasicInfo'
import CommunityInfo from './CommunityInfo'
import TrafficInfo from './TrafficInfo'
import './TrailDetail.css'

class TrailDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        const dataId = '4rHB0kp2rgsiO9IP45aF'
        const db = firebase.firestore();
        const trailsRef = db.collection('trails')
        trailsRef.where('id', '==', dataId).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.setState({
                    data: doc.data()
                })
            })
        })

        // // Get a reference to the storage service, which is used to create references in your storage bucket

        // // Create a storage reference from our storage service

        // // Create a reference to the file whose metadata we want to retrieve
        // var forestRef = storageRef.child('trails/知高圳步道.jpg');
        // // Get metadata properties
        // forestRef.getMetadata().then(function (metadata) {
        //     console.log("取得照片資料", metadata);
        // }).catch(function (error) {
        //     // Uh-oh, an error occurred!
        // })

        // const storage = firebase.storage()
        // const storageRef = storage.ref()
        // storageRef.child('trails/知高圳步道.jpg').getDownloadURL().
        //     then(function (url) { console.log(url) })


        // const storageRef = firebase.storage().ref();
        // storageRef.child('trails/知高圳步道.jpg').getMetadata().then(function (metadata) {
        //     console.log("取得照片資料", metadata);
        // }).catch(function (error) {
        //     // Uh-oh, an error occurred!
        // })
    }

    render() {
        const { data } = this.state
        if (data === null) {
            return <div>Loading</div>
        }
        console.log(data)

        const topInfoData = {
            title: data.title,
            mainImage: data.main_image,
            createTime: data.create_time,
            createUser: data.create_user
        }

        const basicInfoData = {
            description: data.description,
            status: data.status,
            location: data.location,
            height: data.height,
            time: data.time,
            length: data.length,
            difficulty: data.difficulty
        }

        const communityInfoData = {
            title: data.title
        }

        const trafficInfoData = {
            title: data.title,
            start: data.tr_start,
            end: data.tr_end
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