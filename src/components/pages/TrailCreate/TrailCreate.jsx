import React, { Component } from 'react';
import { DB, APP } from '../../../lib';
import { TrailCreateConst } from '../../../constants';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Button from '../../shared/Button';
import Alter from '../../shared/Alert';
import LoadingPage from '../../shared/LoadingPage';
import SingleTextInput from './Inputs/SingleTextInput.jsx';
import DoubleTextInput from './Inputs/DoubleTextInput.jsx';
import UploadImgInput from './Inputs/UploadImgInput.jsx';
import RadioCheckboxInput from './Inputs/RadioCheckboxInput.jsx';
import TrailLocationInput from './Inputs/TrailLocationInput.jsx';
import TrailRouteInput from './Inputs/TrailRouteInput.jsx';
import AuthUserContext from '../../../contexts/AuthUserContext';

class TrailCreate extends Component {
    constructor(props) {
        super(props)
        this.state = TrailCreateConst.initialState
    }

    componentDidMount() {
        const oldInputValue = JSON.parse(localStorage.getItem('MTR_Trail_Create'))
        if (oldInputValue) {
            this.setState({
                inputValue: oldInputValue
            })
        }
    }

    changeValue = (e) => {
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
                        const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        this.setState({
                            isShowImgLoading: {
                                id: id,
                                progress: progress
                            }
                        })
                    }, error => {
                        if (error) {
                            this.toggleAlertBox(true, '有錯誤發生，請重新上傳', '', '')
                        }
                    }, () => {
                        this.setState({
                            isShowImgLoading: {
                                id: '',
                                progress: ''
                            }
                        })
                        // Handle successful uploads on complete
                        uploadTask.snapshot.ref.getDownloadURL()
                            .then(downloadURL => {
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

        this.setState({
            isShowCreateLoading: true
        })

        DB.ref('trails')
            .add(
                APP.tansformTrialDataFromStateToDB(inputValue, sceneryData, difficultyData, userData)
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
                    }).then(() => {
                        history.push(`/trails/detail/${newTrail.id}`)
                        localStorage.setItem('MTR_Trail_Create', JSON.stringify(null))
                    })
            })
    }

    checkValueType = (inputId, value, TurnInputsCheckedFalse) => {
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
        this.setState({
            alterWord: {
                word: word,
                inputId: inputId
            }
        })
    }

    toggleAlertBox = (isShow, wordHead, hightlight, wordTail) => {
        this.setState({
            alterBox: {
                isShow: isShow,
                wordHead: wordHead,
                hightlight: hightlight,
                wordTail: wordTail
            }
        })
    }

    clearAllInputs = () => {
        this.setState(TrailCreateConst.initialState)
    }

    render() {
        const {
            inputValue,
            alterBox,
            alterWord,
            isShowImgLoading,
            isShowCreateLoading
        } = this.state

        const { history } = this.props

        const {
            locationObj,
            difficultyList,
            sceneryList
        } = TrailCreateConst

        return (
            <>
                <Header history={history} />
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
                                <>
                                    <p>1. 此<span>封面圖</span>會呈現在步道頁面最上方</p>
                                    <p>2. 建議圖片尺寸比例為<span> 3 : 2 </span></p>
                                    <p>3. 建議圖片寬度至少大於<span> 800 像素 </span></p>
                                    <p>4. 檔案須小於<span> 5 MB</span></p>
                                </>
                            }
                        />

                        <TrailLocationInput
                            inputValue={inputValue}
                            changeValue={this.changeValue}
                            locationObj={locationObj}
                        />

                        <TrailRouteInput
                            inputValue={inputValue}
                            changeValue={this.changeValue}
                            alterWord={alterWord}
                        />

                        <RadioCheckboxInput
                            title={'步道難度'}
                            type={'radio'}
                            name={'difficulty'}
                            listName={'difficulty-list'}
                            listConst={difficultyList}
                            checkedList={inputValue.difficulty}
                            changeValue={this.changeValue}
                        />

                        <RadioCheckboxInput
                            title={'登頂風景'}
                            type={'checkbox'}
                            name={'scenery'}
                            listName={'scenery-list'}
                            listConst={sceneryList}
                            checkedList={inputValue.scenery}
                            changeValue={this.changeValue}
                        />

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

                        <DoubleTextInput
                            title={'整趟所需時間'}
                            type={'text'}
                            changeValue={this.changeValue}
                            alterWord={alterWord}
                            idAll={'time'}
                            idOne={'hour'}
                            idTwo={'minute'}
                            placeholderOne={'0'}
                            placeholderTwo={'0'}
                            valueOne={inputValue.hour}
                            valueTwo={inputValue.minute}
                            inputUnitOne={
                                <p>小時</p>
                            }
                            inputUnitTwo={
                                <p>分鐘</p>
                            }
                        />

                        <DoubleTextInput
                            title={'海拔高度'}
                            type={'text'}
                            changeValue={this.changeValue}
                            alterWord={alterWord}
                            idAll={'height'}
                            idOne={'minHeight'}
                            idTwo={'maxHeight'}
                            placeholderOne={'最低海拔'}
                            placeholderTwo={'最高海拔'}
                            valueOne={inputValue.minHeight}
                            valueTwo={inputValue.maxHeight}
                            inputUnitOne={
                                <p>公尺</p>
                            }
                            inputUnitTwo={
                                <p>公尺</p>
                            }
                        />

                        <UploadImgInput
                            title={'上傳步道路線圖'}
                            id={'route-img'}
                            imgValue={inputValue.routeImg}
                            changeValue={this.changeValue}
                            isShowImgLoading={isShowImgLoading}
                            reminderContent={
                                <>
                                    <p>1. 此<span>路線圖</span>，呈現在步道頁面<span>路線資訊</span>處</p>
                                    <p>2. 建議圖片尺寸比例為<span> 3 : 2 </span></p>
                                    <p>3. 建議圖片寬度至少大於<span> 800 像素 </span></p>
                                    <p>4. 檔案須小於<span> 5 MB</span></p>
                                </>
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
            </>
        )
    }
}

TrailCreate.contextType = AuthUserContext;
export default TrailCreate;