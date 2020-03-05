import React, { Component, Fragment } from 'react';
import { DB, APP } from '../../../lib';
import { TrailCreateConst } from '../../../constants';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Button from '../../shared/Button';
import Alter from '../../shared/Alert';
import LoadingPage from '../../shared/LoadingPage';
import SingleTextInput from './SingleTextInput.jsx';
import UploadImgInput from './UploadImgInput.jsx';
import AuthUserContext from '../../../contexts/AuthUserContext';

class TrailCreate extends Component {
    constructor(props) {
        super(props)
        this.state = TrailCreateConst.initialState
    }

    componentDidMount() {
        const oldInputValue = JSON.parse(localStorage.getItem('MTR_Trail_Create'))
        if (oldInputValue) {
            this.setState(preState => ({
                ...preState,
                inputValue: oldInputValue
            }))
        }
    }

    changeValue = (e) => {
        console.log('changeValue')
        e.persist()
        const id = e.target.id
        const name = e.target.name
        const value = e.target.value

        this.checkValueType(id, value)

        switch (name) {
            case 'upload-img':
                const file = e.target.files[0]
                const fileTitle = this.state.inputValue.title
                let nameTage
                id === 'cover-img' ? nameTage = '封面圖' : nameTage = '路線圖'

                if (fileTitle.length < 1) {
                    this.toggleAlertBox(true, '請先輸入', '步道名稱', '喔')
                } else if (file.size > 5000000) {
                    this.toggleAlertBox(true, '檔案不可超過', '5 MB', '喔')
                } else {
                    const uploadTask = DB.storageRef(`/trails/${fileTitle}/${fileTitle}${nameTage}`).put(file)
                    uploadTask.on('state_changed', snapshot => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        this.setState(preState => ({
                            ...preState,
                            isShowImgLoading: {
                                id: id,
                                progress: progress
                            }
                        }))
                    }, error => {
                        if (error) {
                            this.toggleAlertBox(true, '有錯誤發生，請重新上傳', '', '')
                        }
                    }, () => {
                        this.setState(preState => ({
                            ...preState,
                            isShowImgLoading: {
                                id: '',
                                progress: ''
                            }
                        }))
                        // Handle successful uploads on complete
                        uploadTask.snapshot.ref.getDownloadURL()
                            .then(downloadURL => {
                                console.log(downloadURL)
                                this.setState(preState => ({
                                    inputValue: {
                                        ...preState.inputValue,
                                        [(nameTage === '封面圖' ? 'coverImg' : 'routeImg')]: downloadURL
                                    }
                                }))
                            })
                    })
                }
                break;

            case 'scenery':
                this.setState(preState => ({
                    inputValue: {
                        ...preState.inputValue,
                        [name]: {
                            ...preState.inputValue.scenery,
                            [value]: !preState.inputValue.scenery[value]
                        }
                    }
                }))
                break;

            case 'difficulty':
                this.setState(preState => ({
                    inputValue: {
                        ...preState.inputValue,
                        [name]: {
                            ...preState.inputValue.difficulty,
                            easy: false,
                            general: false,
                            challenge: false,
                            hard: false,
                            [value]: !preState.inputValue.difficulty[value]
                        }
                    }
                }))
                break;

            case 'location':
                switch (id) {
                    case 'area':
                        this.setState(preState => ({
                            inputValue: {
                                ...preState.inputValue,
                                area: value,
                                city: '',
                                dist: ''
                            }
                        }))
                        break;
                    case 'city':
                        this.setState(preState => ({
                            inputValue: {
                                ...preState.inputValue,
                                city: value,
                                dist: ''
                            }
                        }))
                    case 'dist':
                        this.setState(preState => ({
                            inputValue: {
                                ...preState.inputValue,
                                dist: value
                            }
                        }))
                    default:
                        break;
                }
                break;

            default:
                this.setState(preState => ({
                    inputValue: {
                        ...preState.inputValue,
                        [id]: value
                    }
                }))
                break;
        }
        localStorage.setItem('MTR_Trail_Create', JSON.stringify(this.state.inputValue))
    }

    checkInputsIsOkOrNot = () => {
        const { inputValue } = this.state
        const { difficultyList, sceneryList } = TrailCreateConst
        const processRadioOrCheckbox = (keyList, dataList) => {
            const trueKeyList = Object.keys(keyList)
                .filter(key => keyList[key])
            const trueNameList = trueKeyList.map(trueKey => {
                for (let i = 0; i < dataList.length; i++) {
                    if (dataList[i].value === trueKey) {
                        return dataList[i].name
                    }
                }
            })
            return trueNameList
        }
        const sceneryData = processRadioOrCheckbox(inputValue.scenery, sceneryList)
        const difficultyData = processRadioOrCheckbox(inputValue.difficulty, difficultyList)

        let isInputsChecked = true
        const TurnInputsCheckedFalse = () => {
            isInputsChecked = false
        }
        const inputKeyList = Object.keys(inputValue)
        inputKeyList.forEach(key => {
            if (key !== 'routeImg') { // routeImg is not required to fill
                !inputValue[key] ?
                    TurnInputsCheckedFalse() : this.checkValueType(key, inputValue[key], TurnInputsCheckedFalse)
            }
        })
        if (sceneryData.length === 0 || difficultyData.length === 0) {
            TurnInputsCheckedFalse()
        }

        isInputsChecked ?
            this.createTrail(inputValue, sceneryData, difficultyData) :
            this.toggleAlertBox(true, '有資料', '尚未填寫或格式錯誤', '，請再次檢查')
    }

    createTrail = (inputValue, sceneryData, difficultyData) => {
        const { userData } = this.context
        const { history } = this.props

        this.setState(preState => ({
            ...preState,
            isShowCreateLoading: true
        }))

        DB.ref('trails')
            .add(
                APP.tansformTrialDataFromStateToDB(inputValue, userData, sceneryData, difficultyData)
            ).then(newTrail => {
                const newCreateList = userData.createList
                newCreateList.push(newTrail.id)

                DB.ref('users').doc(userData.id)
                    .update({
                        create_list: newCreateList
                    })

                DB.ref('trails').doc(newTrail.id)
                    .update({
                        id: newTrail.id
                    })

                history.push(`/trails/detail/${newTrail.id}`)
                localStorage.setItem('MTR_Trail_Create', JSON.stringify(null))
            })
    }

    checkValueType = (inputId, value, TurnInputsCheckedFalse) => {
        console.log('checkValueType')
        console.log(inputId)
        console.log(value)
        this.toggleAlterWord('', '')
        if (inputId === 'title' ||
            inputId === 'description' ||
            inputId === 'start' ||
            inputId === 'end') {
            if (Number(value)) {
                this.toggleAlterWord('格式有誤，不能僅有數字', `${inputId}`)
                if (TurnInputsCheckedFalse) {
                    TurnInputsCheckedFalse()
                }
            }
        } else if (
            inputId === 'minHeight' ||
            inputId === 'maxHeight' ||
            inputId === 'length' ||
            inputId === 'hour' ||
            inputId === 'minute') {
            if (!Number(value) && value !== '0' && value.length > 0) {
                this.toggleAlterWord('僅能輸入數字', `${inputId}`)
                if (TurnInputsCheckedFalse) {
                    TurnInputsCheckedFalse()
                }
            }
        }
    }

    toggleAlterWord = (word, inputId) => {
        console.log('toggleAlterWord')
        this.setState(preState => ({
            ...preState,
            alterWord: {
                word: word,
                inputId: inputId
            }
        }), () => { console.log(this.state.alterWord) })
    }

    toggleAlertBox = (isShow, wordHead, hightlight, wordTail) => {
        this.setState(preState => ({
            alterBox: {
                ...preState.alertBox,
                isShow: isShow,
                wordHead: wordHead,
                hightlight: hightlight,
                wordTail: wordTail
            }
        }))
    }

    clearAllInputs = () => {
        this.setState(preState => ({
            ...preState,
            inputValue: TrailCreateConst.initialState.inputValue,
            alertBox: TrailCreateConst.initialState.alterBox
        }))
    }

    render() {
        const {
            inputValue,
            alterBox,
            alterWord,
            isShowImgLoading,
            isShowCreateLoading
        } = this.state

        const {
            locationObj,
            difficultyList,
            sceneryList
        } = TrailCreateConst

        return (
            <Fragment>
                <Header />
                <div id="trail-create">
                    <h2>新增步道</h2>
                    <div className="wrap">
                        <div>
                            <p className="mark-word"><span className="mark">*</span>為必填</p>
                        </div>

                        <SingleTextInput
                            title={'步道名稱'}
                            type={'text'}
                            id={'title'}
                            placeholder={'請先輸入步道全名'}
                            value={inputValue.title}
                            changeValue={this.changeValue}
                            alterWord={alterWord}
                        />

                        <SingleTextInput
                            title={'步道簡介'}
                            type={'textarea'}
                            id={'description'}
                            placeholder={'以你的觀點，簡要介紹步道的特色'}
                            value={inputValue.description}
                            changeValue={this.changeValue}
                            alterWord={alterWord}
                        />

                        <UploadImgInput
                            title={'上傳封面圖片'}
                            id={'cover-img'}
                            imgValue={inputValue.coverImg}
                            changeValue={this.changeValue}
                            isShowImgLoading={isShowImgLoading}
                            reminderContent={
                                <Fragment>
                                    <p>1. 此<span>封面圖</span>會呈現在步道頁面最上方</p>
                                    <p>2. 建議圖片尺寸比例為<span> 3 : 2 </span></p>
                                    <p>3. 建議圖片寬度至少大於<span> 800 像素 </span></p>
                                    <p>4. 檔案須小於<span> 5 MB</span></p>
                                </Fragment>
                            }
                        />

                        <div className="form-item">
                            <label htmlFor="area">
                                步道位置<span className="mark">*</span></label>
                            <div className="flex area">
                                <select
                                    name="location"
                                    id="area"
                                    value={inputValue.area}
                                    onChange={this.changeValue}
                                >
                                    <option
                                        value='選擇區域'
                                        className={`${inputValue.area.length > 0 ? 'inactive' : ''}`}>
                                        選擇區域
                                    </option>
                                    {
                                        Object.keys(locationObj).map(area => {
                                            return <option value={`${area}`}>{area}</option>
                                        })
                                    }
                                </select>
                                <select
                                    name="location"
                                    id="city"
                                    value={inputValue.city}
                                    onChange={this.changeValue}
                                >
                                    <option value='選擇縣市'>選擇縣市</option>
                                    {
                                        inputValue.area.length > 0 ?
                                            Object.keys(locationObj[inputValue.area]).map(city => {
                                                return <option value={`${city}`}>{city}</option>
                                            }) : ''
                                    }
                                </select>
                                <select
                                    name="location"
                                    id="dist"
                                    value={inputValue.dist}
                                    onChange={this.changeValue}
                                >
                                    <option value='選擇鄉鎮'>選擇鄉鎮</option>
                                    {
                                        inputValue.city.length > 0 ?
                                            locationObj[inputValue.area][inputValue.city].map(dist => {
                                                return <option value={`${dist}`}>{dist}</option>
                                            }) : ''
                                    }
                                </select>
                            </div>
                        </div>

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
                                        onChange={this.changeValue}
                                    />
                                </div>
                                <i className="fas fa-long-arrow-alt-right"></i>
                                <div className="flex">
                                    <input
                                        type="text"
                                        id="end"
                                        placeholder="終點處"
                                        value={inputValue.end}
                                        onChange={this.changeValue}
                                    />
                                </div>
                                <i className="fas fa-mountain"></i>
                                <div className="flex">
                                    <select
                                        name="route"
                                        id="type"
                                        value={inputValue.type}
                                        onChange={this.changeValue}
                                    >
                                        <option value="單向折返">單向折返</option>
                                        <option value="雙向進出">雙向進出</option>
                                        <option value="環狀步道">環狀步道</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-item">
                            <label>步道難度<span className="mark">*</span></label>
                            <div className="flex difficulty-list">
                                {
                                    difficultyList.map(difficultyItem => {
                                        return (
                                            <label className={`flex difficulty ${inputValue.difficulty[difficultyItem.value] ? 'active' : ''}`}>
                                                <input
                                                    id={difficultyItem.value}
                                                    name="difficulty"
                                                    type="radio"
                                                    value={difficultyItem.value}
                                                    onChange={this.changeValue}
                                                    checked={inputValue.difficulty[difficultyItem.value]}
                                                />
                                                <span className="radio-mark"></span>
                                                {difficultyItem.name}
                                            </label>
                                        )
                                    })
                                }
                            </div>
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
                                                        name="scenery"
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
                            </div>
                        </div>

                        <SingleTextInput
                            title={'全程里程數'}
                            type={'text'}
                            id={'length'}
                            placeholder={'全程多少'}
                            value={inputValue.length}
                            changeValue={this.changeValue}
                            alterWord={alterWord}
                            inputUnit={
                                <p>公里</p>
                            }
                        />

                        <div className="form-item">
                            <label htmlFor="hour">
                                整趟所需時間
                                <span className="mark">*</span>
                                <span className="alert-word">
                                    {alterWord.inputId === 'hour' || alterWord.inputId === 'minute' ? alterWord.word : ''}
                                </span>
                            </label>
                            <div className="time">
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
                            <label htmlFor="height">
                                海拔高度
                            <span className="mark">*</span>
                                <span className="alert-word">
                                    {alterWord.inputId === 'maxHeight' || alterWord.inputId === 'minHeight' ? alterWord.word : ''}
                                </span>
                            </label>
                            <div className="height">
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={inputValue.minHeight}
                                        id="minHeight"
                                        placeholder="最低海拔"
                                        onChange={this.changeValue}
                                    />
                                    <p>公尺</p>
                                </div>
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={inputValue.maxHeight}
                                        id="maxHeight"
                                        placeholder="最高海拔"
                                        onChange={this.changeValue}
                                    />
                                    <p>公尺</p>
                                </div>
                            </div>
                        </div>

                        <UploadImgInput
                            title={'上傳步道路線圖'}
                            id={'route-img'}
                            imgValue={inputValue.routeImg}
                            changeValue={this.changeValue}
                            isShowImgLoading={isShowImgLoading}
                            reminderContent={
                                <Fragment>
                                    <p>1. 此<span>路線圖</span>，呈現在步道頁面<span>路線資訊</span>處</p>
                                    <p>2. 建議圖片尺寸比例為<span> 3 : 2 </span></p>
                                    <p>3. 建議圖片寬度至少大於<span> 800 像素 </span></p>
                                    <p>4. 檔案須小於<span> 5 MB</span></p>
                                </Fragment>
                            }
                        />

                        <div className="confirm-btns">
                            <Button
                                text={'確認送出'}
                                id={'confirm-create-btn'}
                                onClick={this.checkInputsIsOkOrNot}
                            />
                            <Button
                                text={'清空全部'}
                                id={'clear-all-btn'}
                                onClick={this.clearAllInputs}
                            />
                        </div>
                    </div>
                </div>
                <Alter
                    isShow={alterBox.isShow}
                    wordHead={alterBox.wordHead}
                    wordTail={alterBox.wordTail}
                    hightlight={alterBox.hightlight}
                    onClick={() => this.toggleAlertBox(false, '', '', '')}
                />
                <Footer />
                <LoadingPage isShow={isShowCreateLoading} />
            </Fragment>
        )
    }
}

TrailCreate.contextType = AuthUserContext;
export default TrailCreate;