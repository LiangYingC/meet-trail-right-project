import React, { Component } from 'react';
import './TrailsFilter.css'

const trailsFilter = [
    {
        id: 1,
        title: '所在區域',
        questionIcon: false,
        tag: 'area',
        list: ['全部', '北部', '中部', '南部', '東部', '外島']
    },
    {
        id: 2,
        title: '步道難度',
        questionIcon: true,
        tag: 'difficulty',
        list: ['全部', '輕鬆', '普通', '有點挑戰', '很有挑戰', '非常困難']
    },
    {
        id: 3,
        title: '步道全長',
        questionIcon: false,
        tag: 'length',
        list: ['全部', '5 公里以下', '5 - 10 公里', '10 公里以上']
    },
    {
        id: 4,
        title: '所需時間',
        questionIcon: false,
        tag: 'time',
        list: ['全部', '3 小時以下', '3 - 6 小時', '6 - 12 小時', '12 小時以上']
    },
    {
        id: 5,
        title: '熱門程度',
        questionIcon: true,
        tag: 'hot',
        list: ['全部', '低', '中', '高']
    }
]

const TrailsFilter = () => {
    return (
        <section id="trails-filter">
            <div className="wrap">
                <div className="filters">
                    {
                        trailsFilter.map(filter => {
                            return (
                                <div className="flex filter" id={filter.id} key={filter.id}>
                                    <div className="filter-title" >{filter.title}</div>
                                    <div className="filter-list">
                                        {filter.list.map((filterItem, index) => {
                                            return (
                                                <label className="filter-item" key={index}>
                                                    <input type="radio" name={filter.tag} value={`${filter.tag}_${index}`} />
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
        </section>
    )
}

export default TrailsFilter