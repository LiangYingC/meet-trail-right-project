import React from 'react';
import Button from '../../../shared/Button';

const TrailsSort = ({
    trailsSortChecked,
    changeSort,
    isShowMobileSortList,
    toggleMobileSortList
}) => {
    return (
        <section id="trails-sort" className={`${isShowMobileSortList ? 'active' : ''}`}>
            <div className="layer"></div>
            <div className="wrap">
                <div className="sorts">
                    <div className="flex sort-list">
                        <label className={`sort-item ${trailsSortChecked === '0' ? 'active' : ''}`}>
                            <input
                                name="sort"
                                type="radio"
                                value="0"
                                onChange={changeSort}
                                checked={('0' === trailsSortChecked)}
                            />
                            <i className="fas fa-sort-amount-down"></i>
                            熱門程度
                                </label>
                        <label className={`sort-item ${trailsSortChecked === '1' ? 'active' : ''}`}>
                            <input
                                name="sort"
                                type="radio"
                                value="1"
                                onChange={changeSort}
                                checked={('1' === trailsSortChecked)}
                            />
                            <i className="fas fa-sort-amount-up"></i>
                            時間長短
                                </label>
                        <label className={`sort-item ${trailsSortChecked === '2' ? 'active' : ''}`}>
                            <input
                                name="sort"
                                type="radio"
                                value="2"
                                onChange={changeSort}
                                checked={('2' === trailsSortChecked)}
                            />
                            <i className="fas fa-sort-amount-up"></i>
                            困難程度
                                </label>
                        <label className={`sort-item ${trailsSortChecked === '3' ? 'active' : ''}`}>
                            <input
                                name="sort"
                                type="radio"
                                value="3"
                                onChange={changeSort}
                                checked={('3' === trailsSortChecked)}
                            />
                            <i className="fas fa-sort-amount-down"></i>
                            喜愛排名
                                </label>
                    </div>
                    <Button
                        text={'確認排序'}
                        id={'mobile-confirm-sort-btn'}
                        onClick={toggleMobileSortList}
                    />
                </div>
            </div>
        </section >
    )
}

export default TrailsSort;