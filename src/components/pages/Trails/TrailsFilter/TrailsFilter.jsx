import React, { Component, Fragment } from 'react';
import Button from '../../../shared/Button';
import QuestionButton from '../../../shared/QuestionButton';



const trailsFilterData = [
    {
        id: 0,
        title: '所在區域',
        questionIcon: false,
        tag: 'area',
        list: ['全部', '北部', '中部', '南部', '東部', '外島']
    },
    {
        id: 1,
        title: '步道難度',
        questionIcon: true,
        tag: 'difficulty',
        list: ['全部', '輕鬆', '有點挑戰', '很有挑戰']
    },
    {
        id: 2,
        title: '所需時間',
        questionIcon: false,
        tag: 'time',
        list: ['全部', '1 小時以下', '1 - 3 小時', '3 - 5 小時', '5 小時以上']
    },
    {
        id: 3,
        title: '步道全長',
        questionIcon: false,
        tag: 'length',
        list: ['全部', '2 公里以下', '2 - 4 公里', '4 - 8 公里', '8 公里以上']
    }
]

class TrailsFilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowMobileFilter: false
        }
    }

    toggleMobileFilter = () => {
        this.setState(preSate => ({
            isShowMobileFilter: !preSate.isShowMobileFilter
        }))
    }

    render() {
        const {
            trailsFilterProps,
            changeFilter,
            trailsSort,
            changeSort
        } = this.props

        const {
            isShowMobileFilter
        } = this.state

        return (
            <Fragment>
                <section id="trails-filter" className={`${isShowMobileFilter ? 'active' : ''}`}>
                    <div className="layer"></div>
                    <div className="wrap">
                        <div className="filters">
                            {
                                trailsFilterData.map(filter => {
                                    return (
                                        <div className="flex filter mobile-active" key={filter.id}>
                                            <div className="flex filter-title" >{filter.title}
                                                <div className="filter-QustionBtn" style={{ opacity: `${filter.questionIcon ? '1' : '0'}` }}>
                                                    <QuestionButton />
                                                </div>
                                            </div>
                                            <div className="filter-list">
                                                {
                                                    filter.list.map((filterItem, index) => {
                                                        return (
                                                            <label
                                                                className=
                                                                {`
                                                                    filter-item 
                                                                    ${(index === trailsFilterProps[filter.id].value) ? 'active' : ''}
                                                                `}
                                                                key={index}
                                                            >
                                                                <input type="radio"
                                                                    name={filter.tag}
                                                                    value={index}
                                                                    checked={(index === trailsFilterProps[filter.id].value)}
                                                                    onChange={changeFilter}
                                                                />
                                                                {filterItem}
                                                            </label>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="mobile-filter-btns">
                                <Button
                                    text={'確認篩選'}
                                    id={'mobile-confirm-filter-btn'}
                                    onClick={this.toggleMobileFilter}
                                />
                                <Button
                                    text={'前往排序'}
                                    id={'mobile-go-sort-btn'}
                                    onClick={this.toggleMobileSort}
                                />
                            </div>
                        </div>
                        <div className="sorts">
                            <div className="flex sort-list">
                                <label className={`sort-item ${trailsSort === '0' ? 'active' : ''}`}>
                                    <input
                                        name="sort"
                                        type="radio"
                                        value="0"
                                        onChange={changeSort}
                                        checked={('0' === trailsSort)}
                                    />
                                    <i className="fas fa-sort-amount-up"></i>
                                    時間長短
                                </label>
                                <label className={`sort-item ${trailsSort === '1' ? 'active' : ''}`}>
                                    <input
                                        name="sort"
                                        type="radio"
                                        value="1"
                                        onChange={changeSort}
                                        checked={('1' === trailsSort)}
                                    />
                                    <i className="fas fa-sort-amount-up"></i>
                                    困難程度
                                </label>
                                <label className={`sort-item ${trailsSort === '2' ? 'active' : ''}`}>
                                    <input
                                        name="sort"
                                        type="radio"
                                        value="2"
                                        onChange={changeSort}
                                        checked={('2' === trailsSort)}
                                    />
                                    <i className="fas fa-sort-amount-down"></i>
                                    熱門程度
                                </label>
                                <label className={`sort-item ${trailsSort === '3' ? 'active' : ''}`}>
                                    <input
                                        name="sort"
                                        type="radio"
                                        value="3"
                                        onChange={changeSort}
                                        checked={('3' === trailsSort)}
                                    />
                                    <i className="fas fa-sort-amount-down"></i>
                                    喜愛程度
                                </label>
                            </div>
                            <Button
                                text={'確認排序'}
                                id={'mobile-confirm-sort-btn'}
                                onClick={this.toggleMobileFilter}
                            />
                        </div>
                    </div>
                </section >
                <div className="mobile-show-filter-btn" onClick={this.toggleMobileFilter}>
                    <div className="filter-container">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default TrailsFilter