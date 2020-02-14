import React, { Component } from "react"
import Button from "../Button"

const Alert = ({
    isShow,
    wordHead,
    wordTail,
    hightlight,
    onClick
}) => {
    return (
        <div className={`alert-box-wrap ${isShow ? 'active' : ''}`} >
            <div className="layer"></div>
            <div className={`flex alert-box ${isShow ? 'active' : ''}`}>
                <div className="flex icon">
                    <i className="fas fa-exclamation-circle"></i>
                    <p>提醒</p>
                </div>
                <div className="content">
                    <p>{wordHead}
                        <span>{hightlight}</span>
                        {wordTail}
                    </p>
                </div>
                <Button
                    text={'確認'}
                    name={'alter-check-btn'}
                    onClick={onClick}
                />
            </div>
        </div>
    )
}

export default Alert

