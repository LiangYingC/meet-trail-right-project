import React, { Component, Fragment } from 'react';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Button from '../../shared/Button';
import QuestionButton from '../../shared/QuestionButton';

class TestCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
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
                            <label>上傳封面圖片<span className="mark">*</span></label>
                            <label htmlFor="form-item-img">
                                <img src="" alt="" />
                            </label>
                            <div className="flex upload-img-wrap">
                                <div className="upload-img">
                                    <input type="file" id="form-item-img" />
                                </div>
                                <div className="flex reminder">
                                    <div className="reminder-icon">
                                        <i class="fas fa-exclamation"></i>
                                    </div>
                                    <div className="reminder-content">
                                        <p>1. 此<span>封面圖</span>會呈現在步道頁面最上方</p>
                                        <p>2. 建議圖片尺寸比例為<span> 6 : 9 </span></p>
                                        <p>3. 建議圖片寬度至少大於<span> 800 像素 </span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="trail-name">步道名稱<span className="mark">*</span></label>
                            <input type="text" id="trail-name" placeholder="輸入步道全名" />
                        </div>

                        <div className="form-item">
                            <label htmlFor="trail-description">步道簡介<span className="mark">*</span></label>
                            <textarea id="trail-description" placeholder="簡要介紹步道的特色"></textarea>
                            <p>30 - 150 字</p>
                        </div>

                        <div className="form-item">
                            <label htmlFor="form-item-area">步道位置<span className="mark">*</span></label>
                            <div className="flex">
                                <select name="form-item-area" id="form-item-area" value="北部" >
                                    <option value="北部">北部</option>
                                    <option value="中部">中部</option>
                                    <option value="南部">南部</option>
                                    <option value="東部">東部</option>
                                    <option value="外島">外島</option>
                                </select>
                                <select name="form-item-city" id="form-item-city">
                                    <option value="">選擇縣市</option>
                                </select>
                                <select name="form-item-dist" id="form-item-dist">
                                    <option value="">選擇鄉鎮區</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-item">
                            <label>步道難度<span className="mark">*</span></label>
                            <select name="form-item-difficulty" id="form-item-difficulty">
                                <option value="">輕鬆</option>
                                <option value="">普通</option>
                                <option value="">有點挑戰</option>
                                <option value="">很有挑戰</option>
                            </select>
                        </div>

                        <div className="form-item">
                            <label>登頂風景<span className="mark">*</span></label>
                            <div className="flex">
                                <div className="flex form-item-scenery-list">
                                    <label className="form-item-scenery">
                                        <input type="checkbox" name="scenery_1" />
                                        城市
                                    </label>
                                    <label className="form-item-scenery">
                                        <input type="checkbox" name="scenery_2" />
                                        山景
                                    </label>
                                    <label className="form-item-scenery">
                                        <input type="checkbox" name="scenery_3" />
                                        海景
                                    </label>
                                    <label className="form-item-scenery">
                                        <input type="checkbox" name="scenery_1" />
                                        星空
                                    </label>
                                    <label className="form-item-scenery">
                                        <input type="checkbox" name="scenery_1" />
                                        日落
                                    </label>
                                    <label className="form-item-scenery">
                                        <input type="checkbox" name="scenery_1" />
                                        日出
                                </label>
                                </div>
                                <div className="flex reminder">
                                    <div className="reminder-icon">
                                        <i class="fas fa-exclamation"></i>
                                    </div>
                                    <div className="reminder-content">
                                        <p>1. 選擇<span>登頂</span>時所見之風景</p>
                                        <p>2. 至少選則一項，<span>可複選</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="form-item-height">海拔高度<span className="mark">*</span></label>
                            <div className="flex">
                                <input type="text" value="" id="form-item-height" placeholder="最高海拔公尺" />
                                <p>公尺</p>
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="form-item-length">全程里程數<span className="mark">*</span></label>
                            <div className="flex">
                                <input type="text" value="" id="form-item-length" placeholder="全程約幾公里" />
                                <p>公里</p>
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="form-item-hour">整趟所需時間<span className="mark">*</span></label>
                            <div className="flex form-item-time">
                                <div className="flex">
                                    <input type="text" value="0" id="form-item-hour" />
                                    <p>小時</p>
                                </div>
                                <div className="flex">
                                    <input type="text" value="0" id="form-item-minute" />
                                    <p>分鐘</p>
                                </div>
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="form-item-report">最新步道狀況</label>
                            <textarea id="form-item-report" value="" placeholder="簡要分享步道近況，例如：目前步道附近植物新生，綠意盎然。"></textarea>
                        </div>

                        <div className="form-item">
                            <label>上傳步道路線圖</label>
                            <label htmlFor="form-item-img">
                                <img src="" alt="" />
                            </label>
                            <div className="flex upload-img-wrap">
                                <div className="upload-img">
                                    <input type="file" id="form-item-img" />
                                </div>
                                <div className="flex reminder">
                                    <div className="reminder-icon">
                                        <i class="fas fa-exclamation"></i>
                                    </div>
                                    <div className="reminder-content">
                                        <p>1. 此為<span>步道路線圖</span>會呈現在步道頁面路線資訊處</p>
                                        <p>2. 建議圖片尺寸比例為<span> 6 : 9 </span></p>
                                        <p>3. 建議圖片寬度至少大於<span> 800 像素 </span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="confirm-btns">
                            <Button text={'確認送出'} name={'confirm-create-btn'} />
                            <Button text={'清空全部'} name={'clear-all-btn'} />
                        </div>
                    </div>
                </section>
                <Footer />
            </Fragment>

        )
    }
}

export default TestCreate;