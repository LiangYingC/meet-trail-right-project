import React, { Component, Fragment } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TopInfo from './TopInfo'
import BasicInfo from './BasicInfo'
import CommunityInfo from './CommunityInfo'
import TrafficInfo from './TrafficInfo'
import './TrailDetail.css'

class TrailDetail extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <TopInfo />
                <BasicInfo />
                <CommunityInfo />
                <TrafficInfo />
                <Footer />
            </Fragment >
        )
    }
}

export default TrailDetail;