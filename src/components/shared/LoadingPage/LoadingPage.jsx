import React, { Component, Fragment } from 'react';

const LoadingPage = ({ isShow }) => {
    return (
        <div className={`loading-page-wrap ${isShow ? 'active' : ''} `}>
            <div className="layer"></div>
            <div className="loading-icon">
                <i className="fas fa-mountain m-smail"></i>
                <i className="fas fa-mountain m-big"></i>
            </div>
        </div>
    )
}

export default LoadingPage;