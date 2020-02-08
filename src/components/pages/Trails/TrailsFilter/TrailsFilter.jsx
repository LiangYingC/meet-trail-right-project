import React, { Component } from 'react';
import QuestionButton from '../../../shared/QuestionButton'



const trailsFilterList = [
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
        list: ['全部', '輕鬆', '普通', '有點挑戰', '很有挑戰']
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
        list: ['全部', '3 公里以下', '3 - 6 公里', '6 - 9 公里', '9 公里以上']
    }
]

const TrailsFilter = ({ trailsFilter, changeFilter }) => {
    return (
        <section id="trails-filter">
            <div className="wrap">
                <div className="filters">
                    {
                        trailsFilterList.map(filter => {
                            console.log(trailsFilter)
                            return (
                                <div className="flex filter" key={filter.id}>
                                    <div className="flex filter-title" >{filter.title}
                                        <div className="filter-QustionBtn" style={{ opacity: `${filter.questionIcon ? '1' : '0'}` }}>
                                            <QuestionButton />
                                        </div>
                                    </div>
                                    <div className="filter-list">
                                        {filter.list.map((filterItem, index) => {
                                            return (
                                                <label
                                                    className={
                                                        `filter-item 
                                                    ${(filter.tag + '_' + index === trailsFilter[filter.id].value) ? 'active' : ''}
                                                `}
                                                    key={index}
                                                >
                                                    <input type="radio"
                                                        name={filter.tag}
                                                        value={`${filter.tag}_${index}`}
                                                        checked={(filter.tag + '_' + index === trailsFilter[filter.id].value)}
                                                        onChange={changeFilter}
                                                    />

                                                    {filterItem}
                                                </label>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section >
    )
}

export default TrailsFilter