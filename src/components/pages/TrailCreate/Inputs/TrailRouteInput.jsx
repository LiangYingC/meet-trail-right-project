import React from 'react';
const TrailRouteInput = ({
    inputValue,
    changeValue,
    alterWord
}) => {
    return (
        <div className="form-item">
            <label htmlFor="route">
                步道起終點
                <span className="mark">*</span>
                <span className="alert-word">
                    {alterWord.inputId === 'start' || alterWord.inputId === 'end' ? alterWord.word : ''}
                </span>
            </label>
            <div className="flex route">
                <div className="flex">
                    <input
                        type="text"
                        id="start"
                        placeholder="起點處"
                        value={inputValue.start}
                        onChange={changeValue}
                        autoComplete="off"
                    />
                </div>
                <i className="fas fa-long-arrow-alt-right"></i>
                <div className="flex">
                    <input
                        type="text"
                        id="end"
                        placeholder="終點處"
                        value={inputValue.end}
                        onChange={changeValue}
                        autoComplete="off"
                    />
                </div>
                <i className="fas fa-mountain"></i>
                <div className="flex">
                    <select
                        name="route"
                        id="type"
                        value={inputValue.type}
                        onChange={changeValue}
                    >
                        <option value="單向折返">單向折返</option>
                        <option value="雙向進出">雙向進出</option>
                        <option value="環狀步道">環狀步道</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default TrailRouteInput;