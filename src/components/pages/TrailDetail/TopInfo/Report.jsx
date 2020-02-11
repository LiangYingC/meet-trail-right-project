import React, { Component, Fragment } from 'react';
import Button from '../../../shared/Button';
import userImg from '../../../../assets/img/user.png';

const today = new Date()
const todayDate = `${today.getFullYear()}-${('0' + today.getMonth()).slice(-2)}-${today.getDate()}`

class Report extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reportList: null,
            dateValue: todayDate,
            contentValue: '',
            isShowReportInputBox: false
        }
    }

    componentDidMount() {
        const { id } = this.props
        const db = firebase.firestore()
        const trailsRef = db.collection('trails').doc(id)
        trailsRef.collection('report_list')
            .orderBy('report_time', 'desc')
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
        this.setState(preState => ({
            isShowReportInputBox: !preState.isShowReportInputBox
        }))
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
        const today = new Date()
        const todayTime = `${today.getHours()}:${('0' + today.getMinutes()).slice(-2)}:${today.getSeconds()}`
        this.setState(preState => {
            const db = firebase.firestore()
            const trailsRef = db.collection('trails').doc(id)
            trailsRef.collection('report_list').doc()
                .set({
                    report_time: preState.dateValue + " " + todayTime,
                    report_content: preState.contentValue,
                    create_user: {
                        id: 'Test123',
                        name: 'TestUser',
                        picture: 'https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FlogoIcon%2Flogo300x300.png?alt=media&token=6df50e02-8911-4a1d-9583-9197d8859acf'
                    }
                })

            return (
                {
                    reportList: preState.reportList,
                    dateValue: todayDate,
                    contentValue: null,
                    isShowReportInputBox: false
                }
            )
        })
    }

    render() {
        const { dateValue, isShowReportInputBox, reportList } = this.state

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
                    <Button text={'我要回報步道近況'} name={'report-btn'} onClick={this.toggleReportInputBox} />
                </div>
            )
        }

        return (
            <Fragment>
                <div className="top-info__report">
                    <div className="flex report-title">
                        <h4>
                            <i className="fas fa-bullhorn"></i>
                            最新步道狀況回報
                                </h4>
                        <p>{reportList.length} 則</p>
                    </div>
                    <div className="report-list">
                        {
                            reportList.map(reportItem => {
                                return (
                                    <div className="report-item">
                                        <div className="flex report-info">
                                            <div className="report-user-img"><img src={reportItem.create_user.picture} alt={`${reportItem.create_user.name}的照片`} /></div>
                                            <div className="report-user-name">{reportItem.create_user.name}</div>
                                            <div className="report-time">{reportItem.report_time}</div>
                                        </div>
                                        <div className="report-content">{reportItem.report_content}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Button text={'我要回報步道近況'} name={'report-btn'} onClick={this.toggleReportInputBox} />
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
                        <Button text={'確認送出'} name={'send-report-btn'} onClick={this.setReportData} />
                        <div className="close-btn" onClick={this.toggleReportInputBox}></div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Report