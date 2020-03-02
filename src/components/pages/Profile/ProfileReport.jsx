import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import ProfileNoList from './ProfileNoList.jsx';
import AuthUserContext from '../../../contexts/AuthUserContext';

class ProfileReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reportList: null
        }
    }

    componentDidMount() {
        const { userData } = this.context
        console.log(userData)
        console.log(userData.reportList)
        if (userData.reportList) {
            console.log('hi')
            this.setState(preState => ({
                ...preState,
                reportList: userData.reportList
            }))
        } else {
            this.setState(preState => ({
                ...preState,
                reportList: []
            }))
        }
    }

    render() {
        const { reportList } = this.state
        console.log(reportList)
        if (reportList === null) {
            return <div>Loading</div>
        }
        return (
            <Fragment>
                <div className="title">
                    <h2>步道近況回報</h2>
                </div>
                <div className="num-list">
                    <p>目前有 <span>{reportList.length}</span> 則步道近況回報</p>
                </div>

                {
                    reportList.length === 0 ?
                        <ProfileNoList text={'目前尚無收藏的步道喔'} /> :
                        <div className="report-list">
                            <div className="wrap">
                                {
                                    reportList.map(item => {
                                        return (
                                            <Link to={`/trails/detail/${item.trail.id}`}>
                                                <div className={`report-item-container key=${item.trail.id}`}>
                                                    <div className="flex report-item">
                                                        <div class="flex report-item-subcontainer">
                                                            <div className="icon">
                                                                <i className="fas fa-bullhorn"></i>
                                                            </div>
                                                            <div className="time">
                                                                {item.time.slice(0, 10)}
                                                            </div>
                                                            <div className="title">
                                                                {item.trail.title}
                                                            </div>
                                                        </div>
                                                        <div className="content">
                                                            {item.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                }
            </Fragment>
        )
    }
}

ProfileReport.contextType = AuthUserContext
export default ProfileReport;