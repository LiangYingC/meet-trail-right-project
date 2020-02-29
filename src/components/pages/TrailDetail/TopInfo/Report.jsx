import React, { Component, Fragment } from 'react';
import { DB, APP } from '../../../../lib';
import Button from '../../../shared/Button';
import LoginBox from '../../../shared/LoginBox';
import AuthUserContext from '../../../../contexts/AuthUserContext';
import LoadingWave from '../../../shared/LoadingWave';


class Report extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reportList: null,
            dateValue: APP.getDay(),
            contentValue: '',
            isShowReportInputBox: false,
            isShowLoginBox: false
        }
    }

    componentDidMount() {
        const { id } = this.props
        DB.ref('trails').doc(id).collection('report_list')
            .orderBy('timestamp', 'desc')
            .onSnapshot(querySnapshot => {
                if (querySnapshot.docs.length === 0) {
                    this.setState(preState => ({
                        ...preState,
                        reportList: []
                    }))
                } else {
                    let reportList = []
                    querySnapshot.forEach(doc => {
                        const createUserId = doc.data().create_user_id
                        const reportData = doc.data()
                        DB.ref('users').doc(createUserId)
                            .get()
                            .then(createUserData => {
                                reportList.push({
                                    createUser: {
                                        id: createUserData.data().id,
                                        picture: createUserData.data().picture,
                                        name: createUserData.data().name
                                    },
                                    time: reportData.report_time,
                                    content: reportData.report_content
                                })
                                this.setState(preState => ({
                                    ...preState,
                                    reportList: reportList
                                }))
                            })
                    })
                }
            })
    }

    toggleReportInputBox = () => {
        const { isLogin } = this.context

        if (isLogin) {
            this.setState(preState => ({
                ...preState,
                isShowReportInputBox: !preState.isShowReportInputBox
            }))
        } else {
            this.setState(preState => ({
                ...preState,
                isShowLoginBox: true
            }))
        }

    }

    updateDateValue = (e) => {
        this.setState({
            dateValue: e.target.value,
        })
    }

    updateContentValue = (e) => {
        this.setState({
            contentValue: e.target.value,
        })
    }

    setReportData = () => {
        const { id } = this.props
        const { userData } = this.context
        this.setState(preState => {

            const reportItem = {
                report_time: preState.dateValue + " , " + APP.getTime(),
                report_content: preState.contentValue,
                timestamp: DB.time()
            }

            DB.ref('trails').doc(id).collection('report_list')
                .add({
                    ...reportItem,
                    create_user_id: userData.id
                }).then(newReport => {
                    DB.ref('users').doc(userData.id).collection('report_list').doc(newReport.id)
                        .set({
                            ...reportItem,
                            report_trail_id: id
                        })
                })

            return (
                {
                    reportList: preState.reportList,
                    dateValue: APP.getDay(),
                    contentValue: null,
                    isShowReportInputBox: false
                }
            )
        })
    }

    closeLoginBox = () => {
        this.setState(preState => ({
            ...preState,
            isShowLoginBox: false,
        }))
    }

    render() {
        const {
            dateValue,
            reportList,
            isShowReportInputBox,
            isShowLoginBox
        } = this.state

        if (reportList === null) {
            return (
                <div className="top-info__report">
                    <div className="flex report-title">
                        <h4>
                            <i className="fas fa-bullhorn"></i>
                            最新步道狀況回報
                                </h4>
                    </div>
                    <div className="no-report-list">
                        <div className="flex wrap">
                            <p>分享，讓彼此擁有更棒的步道體驗<i className="far fa-smile"></i></p>
                            < Button
                                text={'立刻分享步道近況'}
                                id={'first-report-btn'}
                                onClick={this.toggleReportInputBox}
                            />
                        </div>
                    </div>
                </div>
            )
        }
        return (
            < Fragment >
                <div className="top-info__report">
                    <div className="flex report-title">
                        <h4>
                            <i className="fas fa-bullhorn"></i>
                            最新步道狀況回報
                                </h4>
                        <p>{reportList.length} 則</p>
                    </div>{
                        reportList.length === 0 ?
                            <div className="no-report-list">
                                <div className="flex wrap">
                                    <p>分享，讓彼此擁有更棒的步道體驗<i className="far fa-smile"></i></p>
                                    < Button
                                        text={'立刻分享步道近況'}
                                        id={'first-report-btn'}
                                        onClick={this.toggleReportInputBox}
                                    />
                                </div>
                            </div>
                            :
                            <div className="report-list">
                                {
                                    reportList.map((reportItem, index) => {
                                        return (
                                            <div className="report-item" key={index}>
                                                <div className="flex report-info">
                                                    <div className="report-user-img">
                                                        <img src={reportItem.createUser.picture} alt={`${reportItem.createUser.name}的照片`} />
                                                    </div>
                                                    <div className="report-user-name">{reportItem.createUser.name}</div>
                                                    <div className="report-time">{reportItem.time}</div>
                                                </div>
                                                <div className="report-content">{reportItem.content}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }

                    {
                        reportList.length === 0 ? '' :
                            <Fragment>
                                <div className="divider"></div>
                                <Button
                                    text={'我要回報步道近況'}
                                    id={'report-btn'}
                                    onClick={this.toggleReportInputBox}
                                />
                            </Fragment>
                    }
                </div>
                <div className={`report-input ${isShowReportInputBox ? 'active' : ''}`} >
                    <div className="layer"></div>
                    <div className={`report-input-box ${isShowReportInputBox ? 'active' : ''}`}>
                        <h3>步道狀況回報</h3>
                        <div className="block">
                            <label htmlFor="input-report-date">
                                發生日期
                            </label>
                            <input type="date" id="input-report-date" value={`${dateValue}`} onChange={this.updateDateValue} />
                        </div>
                        <div className="block">
                            <label htmlFor="input-report-content">
                                回報內容
                            </label>
                            <textarea id="input-report-content" placeholder="簡要描述步道近況，例如：大樹倒塌擋住某路段 ; 步道植物是枯萎狀態" onChange={this.updateContentValue} ></textarea>
                        </div>
                        <Button
                            text={'確認送出'}
                            id={'send-report-btn'}
                            onClick={this.setReportData}
                        />
                        <div className="close-btn" onClick={this.toggleReportInputBox}></div>
                    </div>
                </div>

                <LoginBox
                    isShowLoginBox={isShowLoginBox}
                    closeLoginBox={this.closeLoginBox}
                />
            </Fragment >
        )
    }
}

Report.contextType = AuthUserContext;
export default Report