import React, { Component, Fragment } from 'react';
import { DB } from '../../../lib';
import { TrailsConst } from '../../../constants';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import TrailsFilterSort from './TrailsFilterSort';
import TrailsListArea from './TrailsListArea';

class Trails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trailsAll: null,
            trailsVisible: null,
            filterCheckedList: [
                {
                    tag: 'area',
                    value: 0,
                },
                {
                    tag: 'difficulty',
                    value: 0,
                },
                {
                    tag: 'time',
                    value: 0,
                },
                {
                    tag: 'length',
                    value: 0,
                }
            ],
            sortCheckedValue: 0
        }
    }

    componentDidMount() {
        this.handleSort()
    }

    componentWillUnmount() {
        this.unsubscribeGetTrails()
    }

    handleSort = () => {
        const { sortCheckedValue } = this.state
        let sortKey
        let sortRank
        switch (sortCheckedValue) {
            case 0:
                sortKey = 'view_count'
                sortRank = 'desc'
                break;

            case 1:
                sortKey = 'time'
                sortRank = 'asc'
                break;

            case 2:
                sortKey = 'difficulty'
                sortRank = 'desc'
                break;

            case 3:
                sortKey = 'like_data.count'
                sortRank = 'desc'
                break;

            default:
                break;
        }
        this.handleSearch(sortKey, sortRank)
    }

    handleSearch = (sortKey, sortRank) => {
        const { history } = this.props
        const getSearchValue = (sortKey, sortRank, searchValue) => {
            const equalPosition = history.location.search.indexOf('=')
            searchValue = decodeURI(history.location.search.slice(equalPosition + 1))
            this.getTrailsList(sortKey, sortRank, searchValue)
        }
        let searchValue = ''

        this.clearTrailsList()
        history.location.search ? getSearchValue(sortKey, sortRank, searchValue) : this.getTrailsList(sortKey, sortRank, searchValue)
    }

    clearTrailsList = () => {
        this.setState({
            trailsAll: null,
            trailsVisible: null
        })
    }

    getTrailsList = (sortKey, sortRank, searchValue) => {
        this.unsubscribeGetTrails = DB.ref('trails')
            .orderBy(sortKey, sortRank)
            .onSnapshot(querySnapshot => {
                let trailsData = []
                querySnapshot.forEach(doc => {
                    if (doc.data().title.indexOf(`${searchValue}`) >= 0) {
                        trailsData.push(doc.data())
                    }
                    this.setState({
                        trailsAll: trailsData,
                        trailsVisible: trailsData
                    }, () => this.setVisibleList())
                })
            })
    }

    setVisibleList = () => {
        const filterListConst = TrailsConst.filterList
        this.setState(preState => ({
            trailsVisible: preState.trailsAll.filter(trail => {
                // Every trail's data
                const trailAreaName = trail.location.area
                const trailDifficultyName = trail.difficulty[0]
                const trailTimeValue = trail.time
                const trailLengthValue = trail.length

                // Be checked filter condition data
                const areaFilterChecked = preState.filterCheckedList[0]
                const areaCheckedName = filterListConst[0].optionList[areaFilterChecked.value].name

                const difficultyFilterChecked = preState.filterCheckedList[1]
                const difficultyCheckedName = filterListConst[1].optionList[difficultyFilterChecked.value].name

                const timeFilterChecked = preState.filterCheckedList[2]
                const timeCheckedMinValue = filterListConst[2].optionList[timeFilterChecked.value].minValue
                const timeCheckedMaxValue = filterListConst[2].optionList[timeFilterChecked.value].maxValue

                const lengthFilterChecked = preState.filterCheckedList[3]
                const lengthCheckedMinValue = filterListConst[3].optionList[lengthFilterChecked.value].minValue
                const lengthCheckedMaxValue = trailLengthValue < filterListConst[3].optionList[lengthFilterChecked.value].maxValue

                // Filter visibale trail
                if ((trailAreaName === areaCheckedName || areaFilterChecked.value === 0) &&
                    (trailDifficultyName === difficultyCheckedName || difficultyFilterChecked.value === 0) &&
                    ((timeCheckedMinValue <= trailTimeValue && trailTimeValue < timeCheckedMaxValue) || timeFilterChecked.value === 0) &&
                    ((lengthCheckedMinValue <= trailLengthValue && trailLengthValue < lengthCheckedMaxValue) || lengthFilterChecked.value === 0)
                ) {
                    return trail
                }
            })
        }))
    }

    changeSort = (e) => {
        e.persist()
        this.setState({
            sortCheckedValue: Number(e.target.value)
        }, this.handleSort)
    }

    changeFilter = (e) => {
        e.persist()
        this.setState(preState => ({
            filterCheckedList: preState.filterCheckedList.map((filter, index) => {
                if (filter.tag === e.target.name) {
                    return {
                        tag: e.target.name,
                        value: Number(e.target.value)
                    }
                } return filter
            })
        }), () => this.setVisibleList())
    }

    render() {
        const {
            trailsVisible,
            filterCheckedList,
            sortCheckedValue
        } = this.state

        const { history } = this.props

        return (
            <Fragment>
                <Header history={history} />
                <TrailsFilterSort
                    filterCheckedList={filterCheckedList}
                    changeFilter={this.changeFilter}
                    sortCheckedValue={sortCheckedValue}
                    changeSort={this.changeSort}
                />
                <TrailsListArea trailsVisible={trailsVisible} />
                <Footer />
            </Fragment>
        )
    }
}

export default Trails;


