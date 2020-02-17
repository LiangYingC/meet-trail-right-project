import React, { Component, Fragment } from 'react';
import { DB, APP } from '../../../../lib';
import Button from '../../../shared/Button';
import LoginBox from '../../../shared/LoginBox';
import AuthUserContext from '../../../../contexts/AuthUserContext';


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
                let reportList = []
                querySnapshot.forEach(doc => {
                    reportList.push(doc.data())
                })
                this.setState({
                    reportList: reportList
                })
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
        const { id, title, picture } = this.props
        const { userData, handleUserData } = this.context
        this.setState(preState => {

            const reportItem = {
                report_time: preState.dateValue + " , " + APP.getTime(),
                report_content: preState.contentValue,
                timestamp: DB.time()
            }

            DB.ref('trails').doc(id).collection('report_list')
                .add({
                    ...reportItem,
                    create_user: {
                        id: userData.id,
                        name: userData.name,
                        picture: userData.picture
                    }
                }).then(newReport => {
                    console.log(newReport)
                    DB.ref('users').doc(userData.id).collection('report_list').doc(newReport.id)
                        .set({
                            ...reportItem,
                            report_trail: {
                                id: id,
                                title: title,
                                picture: picture
                            }
                        })
                })



            console.log(this.context)

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
                <div className="flex top-info__report">
                    <div className="flex report-title">
                        <h4>
                            <i className="fas fa-bullhorn"></i>
                            最新步道狀況回報
                     </h4>
                    </div>
                    <div className="report-list"></div>
                    <Button
                        text={'我要回報步道近況'}
                        id={'report-btn'}
                        onClick={this.toggleReportInputBox}
                    />
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
                                                        <img src={reportItem.create_user.picture} alt={`${reportItem.create_user.name}的照片`} />
                                                    </div>
                                                    <div className="report-user-name">{reportItem.create_user.name}</div>
                                                    <div className="report-time">{reportItem.report_time}</div>
                                                </div>
                                                <div className="report-content">{reportItem.report_content}</div>
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