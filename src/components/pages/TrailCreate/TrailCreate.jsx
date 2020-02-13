import React, { Component, Fragment } from 'react';
import { DB } from '../../../lib'
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Button from '../../shared/Button';
import Alter from '../../shared/Alert';


const sceneryList = [
    {
        value: 'town',
        name: '城鎮'
    },
    {
        value: 'mountain',
        name: '山景'
    },
    {
        value: 'ocean',
        name: '海景'
    },
    {
        value: 'stars',
        name: '星空'
    },
    {
        value: 'sunrise',
        name: '日出'
    },
    {
        value: 'sunset',
        name: '日落'
    },
]

class TestCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: {
                coverImg: null,
                routeImg: null,
                title: '',
                description: '',
                area: '',
                city: '',
                dist: '',
                difficulty: '',
                scenery: {
                    town: false,
                    mountain: false,
                    ocean: false,
                    stars: false,
                    sunset: false,
                    sunrise: false
                },
                height: '',
                length: '',
                hour: '',
                minute: '',
                report: ''
            },
            alterBox: {
                isShow: false,
                wordHead: '',
                wordTail: '',
                hightlight: ''
            }
        }
    }

    changeValue = (e) => {
        e.persist()
        const id = e.target.id
        const type = e.target.type
        const value = e.target.value

        if (type === 'checkbox') {
            this.setState(preState => ({
                inputValue: {
                    ...preState.inputValue,
                    scenery: {
                        ...preState.inputValue.scenery,
                        [value]: !preState.inputValue.scenery[value]
                    }
                }
            }))
        } else if (type === 'file') {
            const file = e.target.files[0]
            const fileTitle = this.state.inputValue.title
            let nameTage
            (id === 'cover-img') ? nameTage = '封面圖' : nameTage = '路線圖'
            console.log(e.target.files)

            // if user not filled title
            if (fileTitle.length < 1) {
                this.setState(preState => ({
                    alterBox: {
                        ...preState.alertBox,
                        isShow: true,
                        wordHead: '請先輸入',
                        wordTail: '喔',
                        hightlight: '步道名稱'
                    }
                }))
            } else if (file.size > 8000000) {
                this.setState(preState => ({
                    alterBox: {
                        ...preState.alertBox,
                        isShow: true,
                        wordHead: '檔案不可超過',
                        wordTail: '喔',
                        hightlight: '8 MB'
                    }
                }))
            } else {
                const uploadTask = DB.storageRef(`/trails/${fileTitle}/${fileTitle}${nameTage}`).put(file)
                uploadTask.on('state_changed', snapshot => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, error => {
                    console.log(error)
                }, () => {
                    // Handle successful uploads on complete
                    uploadTask.snapshot.ref.getDownloadURL()
                        .then(downloadURL => {
                            this.setState({
                            })
                            console.log('File available at', downloadURL)
                        })
                })
            }

        } else {
            this.setState(preState => ({
                inputValue: {
                    ...preState.inputValue,
                    [id]: value
                }
            }))
        }
    }

    closeAlert = () => {
        this.setState(preState => ({
            alterBox: {
                ...preState.alertBox,
                isShow: false,
                wordHead: '',
                wordTail: '',
                hightlight: ''
            }
        }))
    }

    render() {
        const {
            inputValue,
            alterBox
        } = this.state
        console.log(this.state.inputValue)

        return (
            <Fragment>
                <Header />
                <section id="trail-create">
                    <h2>步道資料分享</h2>
                    <div className="wrap">
                        <div>
                            <p className="mark-word"><span className="mark">*</span>為必填</p>
                        </div>

                        <div className="form-item">
                            <label htmlFor="title">步道名稱<span className="mark">*</span></label>
                            <input
                                type="text"
                                id="title"
                                placeholder="請先輸入步道全名"
                                value={inputValue.title}
                                onChange={this.changeValue}
                            />
                        </div>

                        <div className="form-item">
                            <label>上傳封面圖片<span className="mark">*</span></label>
                            <div className="flex upload-img-wrap">
                                <label htmlFor="cover-img" className="upload-area cover-img">
                                    <i className="far fa-image">
                                        <p><i className="fas fa-plus-circle"></i>點擊上傳</p>
                                    </i>
                                    <img src={inputValue.coverImg} />
                                </label>
                                <div className="upload-img">
                                    <input type="file"
                                        id="cover-img"
                                        onChange={this.changeValue}
                                        accept="image/png,image/jpeg,image/jpg"
                                    />
                                </div>
                                <div className="flex reminder">
                                    <div className="reminder-icon">
                                        <i className="fas fa-exclamation"></i>
                                    </div>
                                    <div className="reminder-content">
                                        <p>1. 此<span>封面圖</span>會呈現在步道頁面最上方</p>
                                        <p>2. 建議圖片尺寸比例為<span> 6 : 9 </span></p>
                                        <p>3. 建議圖片寬度至少大於<span> 800 像素 </span></p>
                                        <p>4. 檔案大小須小於<span> 8 MB</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="description">步道簡介<span className="mark">*</span></label>
                            <textarea
                                id="description"
                                placeholder="簡要介紹步道的特色"
                                value={inputValue.description}
                                onChange={this.changeValue}>
                            </textarea>
                            <p>30/150 字</p>
                        </div>

                        <div className="form-item">
                            <label htmlFor="area">步道位置<span className="mark">*</span></label>
                            <div className="flex">
                                <select
                                    name="area"
                                    id="area"
                                    value={inputValue.area}
                                    onChange={this.changeValue}
                                >
                                    <option value="北部">北部</option>
                                    <option value="中部">中部</option>
                                    <option value="南部">南部</option>
                                    <option value="東部">東部</option>
                                    <option value="外島">外島</option>
                                </select>
                                <select
                                    name="city"
                                    id="city"
                                    value={inputValue.city}
                                    onChange={this.changeValue}
                                >
                                    <option value="">選擇縣市</option>
                                </select>
                                <select
                                    name="dist"
                                    id="dist"
                                    value={inputValue.dist}
                                    onChange={this.changeValue}
                                >
                                    <option value="">選擇鄉鎮區</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-item">
                            <label>步道難度<span className="mark">*</span></label>
                            <select
                                name="difficulty"
                                id="difficulty"
                                value={inputValue.difficulty}
                                onChange={this.changeValue}
                            >
                                <option value="輕鬆">輕鬆</option>
                                <option value="普通">普通</option>
                                <option value="有點挑戰">有點挑戰</option>
                                <option value="很有挑戰">很有挑戰</option>
                            </select>
                        </div>

                        <div className="form-item">
                            <label>登頂風景<span className="mark">*</span></label>
                            <div className="flex">
                                <div className="flex scenery-list">
                                    {
                                        sceneryList.map(sceneryItem => {
                                            return (
                                                <label className={`scenery ${inputValue.scenery[sceneryItem.value] ? 'active' : ''}`}>
                                                    <input
                                                        id={sceneryItem.value}
                                                        type="checkbox"
                                                        value={sceneryItem.value}
                                                        onChange={this.changeValue}
                                                        checked={inputValue.scenery[sceneryItem.value]}
                                                    />
                                                    {sceneryItem.name}
                                                </label>
                                            )
                                        })
                                    }
                                </div>
                                <div className="flex reminder">
                                    <div className="reminder-icon">
                                        <i className="fas fa-exclamation"></i>
                                    </div>
                                    <div className="reminder-content">
                                        <p>1. 選擇<span>登頂</span>時所見之風景</p>
                                        <p>2. 至少選則一項，<span>可複選</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="height">海拔高度<span className="mark">*</span></label>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={inputValue.height}
                                    id="height"
                                    placeholder="最高海拔公尺"
                                    onChange={this.changeValue}
                                />
                                <p>公尺</p>
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="length">全程里程數<span className="mark">*</span></label>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={inputValue.length}
                                    id="length"
                                    placeholder="全程約幾公里"
                                    onChange={this.changeValue}
                                />
                                <p>公里</p>
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="hour">整趟所需時間<span className="mark">*</span></label>
                            <div className="flex time">
                                <div className="flex">
                                    <input
                                        type="text"
                                        id="hour"
                                        placeholder="0"
                                        value={inputValue.hour}
                                        onChange={this.changeValue}
                                    />
                                    <p>小時</p>
                                </div>
                                <div className="flex">
                                    <input
                                        type="text"
                                        id="minute"
                                        placeholder="0"
                                        value={inputValue.minute}
                                        onChange={this.changeValue}
                                    />
                                    <p>分鐘</p>
                                </div>
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="report">最新步道狀況</label>
                            <textarea
                                id="report"
                                placeholder="簡要分享步道近況，例如：步道附近植物新生，綠意盎然 ; 0.5 k 處有大樹倒塌。"
                                value={inputValue.report}
                                onChange={this.changeValue}>
                            </textarea>
                        </div>

                        <div className="form-item">
                            <label>上傳步道路線圖</label>
                            <div className="flex upload-img-wrap">
                                <label htmlFor="route-img" className="upload-area route-img">
                                    <i className="far fa-image">
                                        <p><i className="fas fa-plus-circle"></i>點擊上傳</p>
                                    </i>
                                    <img src="" alt="" />
                                </label>
                                <div className="upload-img">
                                    <input
                                        type="file"
                                        id="route-img"
                                        onChange={this.changeValue}
                                    />
                                </div>
                                <div className="flex reminder">
                                    <div className="reminder-icon">
                                        <i className="fas fa-exclamation"></i>
                                    </div>
                                    <div className="reminder-content">
                                        <p>1. 此為<span>步道路線圖</span>會呈現在步道頁面路線資訊處</p>
                                        <p>2. 建議圖片尺寸比例為<span> 6 : 9 </span></p>
                                        <p>3. 建議圖片寬度至少大於<span> 800 像素 </span></p>
                                        <p>4. 檔案大小須小於<span> 8 MB</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="confirm-btns">
                            <Button text={'確認送出'} id={'confirm-create-btn'} />
                            <Button text={'清空全部'} id={'clear-all-btn'} />
                        </div>
                    </div>
                </section>
                <Alter
                    isShow={alterBox.isShow}
                    wordHead={alterBox.wordHead}
                    wordTail={alterBox.wordTail}
                    hightlight={alterBox.hightlight}
                    onClick={this.closeAlert}
                />
                <Footer />
            </Fragment>

        )
    }
}

export default TestCreate;