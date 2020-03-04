import React from 'react';
import { TrailsConst } from '../../../../constants';
import Button from '../../../shared/Button';
import QuestionButton from '../../../shared/QuestionButton';

const TrailsFilter = ({
    filterCheckedList,
    changeFilter,
    isShowMobileFilterList,
    toggleMobileFilterList
}) => {
    const filterListConst = TrailsConst.filterList
    return (
        <section id="trails-filter" className={`${isShowMobileFilterList ? 'active' : ''}`}>
            <div className="layer"></div>
            <div className="wrap">
                <div className="filters-container">
                    {
                        filterListConst.map((filter, filterIndex) => {
                            return (
                                <div className="flex filter-list-container" key={filterIndex}>
                                    <div className="flex filter-title" >{filter.title}
                                        <div className="filter-QustionBtn" style={{ opacity: `${filter.questionIcon ? '1' : '0'}` }}>
                                            <QuestionButton />
                                        </div>
                                    </div>
                                    <div className="filter-list">
                                        {
                                            filter.optionList.map((option, optionIndex) => {
                                                return (
                                                    <label
                                                        className=
                                                        {`
                                                            filter-item 
                                                            ${(optionIndex === filterCheckedList[filterIndex].value) ? 'active' : ''}
                                                        `}
                                                        key={optionIndex}
                                                    >
                                                        <input type="radio"
                                                            name={filter.tag}
                                                            value={optionIndex}
                                                            onChange={changeFilter}
                                                            checked={(optionIndex === filterCheckedList[filterIndex].value)}
                                                        />
                                                        {option.name}
                                                    </label>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                    <Button
                        text={'確認篩選'}
                        id={'mobile-confirm-filter-btn'}
                        onClick={toggleMobileFilterList}
                    />
                </div>
            </div>
        </section >
    )
}

export default TrailsFilter;