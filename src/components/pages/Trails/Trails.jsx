import React, { Component, Fragment } from 'react';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import TrailsFilter from './TrailsFilter';
import TrailsList from './TrailsList';

class Trails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trailsData: null
        }
    }

    componentDidMount() {
        const db = firebase.firestore();
        const trailsRef = db.collection('trails')
        let trailsData = []
        trailsRef.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                trailsData.push(doc.data())
                this.setState({
                    trailsData: trailsData
                })
            })
        })
    }

    render() {
        const { trailsData } = this.state
        if (trailsData === null) {
            return <div>Loading</div>
        } return (
            <Fragment>
                <Header />
                <TrailsFilter />
                <TrailsList trailsData={trailsData} />
                <Footer />
            </Fragment>
        )
    }
}

export default Trails;