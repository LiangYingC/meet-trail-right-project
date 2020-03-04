import React, { Component, Fragment } from 'react';
import TrailsFilter from './TrailsFilter.jsx';
import TrailsSort from './TrailsSort.jsx';

class TrailsFilterSort extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowMobileFilterListSortBtn: true,
            isShowMobileFilterList: false,
            isShowMobileSortList: false,
            positionY: window.pageYOffset,
            movedY: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => {
        const lastPositonY = this.state.positionY
        this.setState((preState) => ({
            ...preState,
            positionY: window.pageYOffset
        }), () => this.calculateScrollHeight(lastPositonY))
    }

    calculateScrollHeight = (lastPositonY) => {
        const scrollHeight = window.pageYOffset - lastPositonY
        this.setState((preState) => ({
            ...preState,
            movedY: preState.movedY + scrollHeight
        }), this.handleMobileFilterSortBtnShow)
    }

    handleMobileFilterSortBtnShow = () => {
        const { movedY, positionY } = this.state
        if (movedY > 30) {
            this.setState(preState => ({
                ...preState,
                movedY: 0,
                isShowMobileFilterListSortBtn: false
            }))
        } else if (movedY <= -120 || positionY <= 30) {
            this.setState(preState => ({
                ...preState,
                movedY: 0,
                isShowMobileFilterListSortBtn: true
            }))
        }
    }

    showFilterSortBtn = () => {
        this.setState(preSate => ({
            ...preSate,
            isShowMobileFilterListSortBtn: true
        }))
    }

    toggleMobileFilterList = () => {
        this.setState(preSate => ({
            isShowMobileFilterList: !preSate.isShowMobileFilterList
        }))
    }

    toggleMobileSortList = () => {
        this.setState(preSate => ({
            isShowMobileSortList: !preSate.isShowMobileSortList
        }))
    }

    render() {
        const {
            filterCheckedList,
            changeFilter,
            sortCheckedValue,
            changeSort
        } = this.props

        const {
            isShowMobileFilterListSortBtn,
            isShowMobileFilterList,
            isShowMobileSortList
        } = this.state

        return (
            <Fragment>
                <TrailsFilter
                    filterCheckedList={filterCheckedList}
                    changeFilter={changeFilter}
                    isShowMobileFilterList={isShowMobileFilterList}
                    toggleMobileFilterList={this.toggleMobileFilterList}
                />
                <TrailsSort
                    sortCheckedValue={sortCheckedValue}
                    changeSort={changeSort}
                    isShowMobileSortList={isShowMobileSortList}
                    toggleMobileSortList={this.toggleMobileSortList}
                />
                <div className={`mobile-show-filter-sort-btn ${isShowMobileFilterListSortBtn ? 'hide' : ''}`} onClick={this.showFilterSortBtn}>
                    <div className="filter-container">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>
                <div className={`mobile-filter-sort-btn ${isShowMobileFilterListSortBtn ? 'active' : ''}`} >
                    <div className="show-filter-btn" onClick={this.toggleMobileFilterList}>
                        <p><i className="fas fa-filter"></i>篩選</p>
                    </div>
                    <div className="show-sort-btn" onClick={this.toggleMobileSortList}>
                        <p><i className="fas fa-sort-amount-up-alt"></i>排序</p>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default TrailsFilterSort;