import React, { Component, Fragment } from 'react';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import TrailsFilter from './TrailsFilter';
import TrailsList from './TrailsList';


class Trails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trailsData: null,
            trailsFilter: [
                {
                    tag: 'area',
                    value: 'area_0'
                },
                {
                    tag: 'difficulty',
                    value: 'difficulty_0'
                },
                {
                    tag: 'length',
                    value: 'length_0'
                },
                {
                    tag: 'time',
                    value: 'time_0'
                },
                {
                    tag: 'hot',
                    value: 'hot_0'
                }
            ]
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

    changeFilter = (e) => {
        e.persist() // React 中，event 換到別的 thread 時，event 屬性資料會清除，用 event.persist() 使導致清空的 synthetic event 脫離 pool。
        this.setState(preState => ({
            trailsFilter: preState.trailsFilter.map(filter => {
                if (filter.tag === e.target.name) {
                    return {
                        tag: e.target.name,
                        value: e.target.value
                    }
                } return filter
            })
        }))
    }

    render() {
        const { trailsData, trailsFilter } = this.state
        if (trailsData === null) {
            return <div style={{ fontSize: '45px', padding: '50px' }}>有資料還在 Loading 別急等我啊啊啊</div>
        } return (
            <Fragment>
                <Header />
                <TrailsFilter trailsFilter={trailsFilter} changeFilter={this.changeFilter} />
                <TrailsList trailsData={trailsData} />
                <Footer />
            </Fragment>
        )
    }
}

export default Trails;