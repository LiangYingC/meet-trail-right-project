import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DB, APP } from '../../../lib';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import TrailsList from '../../shared/TrailsList';
import SearchBar from '../../shared/SearchBar';
import Button from '../../shared/Button';
import LoginBox from '../../shared/LoginBox';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLoginBox: false,
      editorChooseList: null,
      likeList: null,
      popularList: null,
    };
  }

  componentDidMount() {
    this.getEditorChooseTrailsList();
    this.getRankTrailsList('like_data.count', 'desc', 4, 'likeList');
    this.getRankTrailsList('view_count', 'desc', 4, 'popularList');
  }

  componentWillUnmount() {
    this.unsubscribeGetRankTrails();
  }

  getEditorChooseTrailsList = () => {
    DB.ref('trails')
      .orderBy('view_count', 'desc')
      .get()
      .then(querySnapshot => {
        let trailsList = [];
        querySnapshot.forEach(doc => {
          const trailData = doc.data();
          if (trailData.title.indexOf(`合歡`) >= 0 && trailsList.length < 5) {
            trailsList.push(doc.data());
          }
          this.setState({
            editorChooseList: trailsList,
          });
        });
      });
  };

  getRankTrailsList = (orderkey, orderRankType, limitNum, listName) => {
    this.unsubscribeGetRankTrails = DB.ref('trails')
      .orderBy(orderkey, orderRankType)
      .limit(limitNum)
      .onSnapshot(querySnapshot => {
        let trailsList = [];
        querySnapshot.forEach(doc => {
          trailsList.push(doc.data());
          this.setState({
            [listName]: trailsList,
          });
        });
      });
  };

  toggleLoginBox = () => {
    this.setState(preState => ({
      isShowLoginBox: !preState.isShowLoginBox,
    }));
  };

  render() {
    const { editorChooseList, likeList, popularList, isShowLoginBox } = this.state;
    const { history } = this.props;

    return (
      <>
        <Header history={history} />
        <div id="home">
          <section className="home-banner">
            <div className="layer"></div>
            <div className="home-content">
              <div className="home-title">
                <h2>遇見最嚮往的山林步道</h2>
                <p>透過資訊整合與山友分享，尋找最適合前往的步道</p>
              </div>
              <SearchBar history={history} />
              <div className="home-btn-container">
                <Link to="/trails">
                  <Button text={'前往全部步道'} id={'home-btn'} />
                </Link>
                <p></p>
              </div>
            </div>
          </section>
          <section className="home-web-intro">
            <div className="flex wrap">
              <div className="intro-item">
                <div className="icon">
                  <i className="fas fa-mountain"></i>
                </div>
                <div className="description web">觀看步道週天氣、基本資訊以及社群近況</div>
                <div className="description mobile">
                  步道資訊
                  <br />
                  社群近況
                </div>
              </div>
              <div className="intro-item">
                <div className="icon">
                  <i className="fas fa-info-circle"></i>
                </div>
                <div className="description web">獲得山友回報的步道最新近況與步道評論</div>
                <div className="description mobile">
                  山友回報
                  <br />
                  即時資訊
                </div>
              </div>
              <div className="intro-item">
                <div className="icon">
                  <i className="fas fa-edit"></i>
                </div>
                <div className="description web">分享喜愛的步道資訊，讓山友有更佳資訊</div>
                <div className="description mobile">
                  分享步道
                  <br />
                  資訊互惠
                </div>
              </div>
            </div>
          </section>
          <section className="home-editor-choose">
            <div className="wrap">
              <div className="home-editor-choose-title">
                <i className="fas fa-hiking"></i> 精選步道輯：合歡山
              </div>
              <div className="flex home-editor-choose-list">
                {editorChooseList === null
                  ? ''
                  : editorChooseList.map(trail => {
                      return (
                        <div
                          className="home-editor-choose-item"
                          style={{
                            backgroundImage: `url(${trail.images.main_image})`,
                          }}
                          key={trail.id}
                        >
                          <Link to={`/trails/detail/${trail.id}`}>
                            <div className="layer"></div>
                            <div className="content">
                              <h3>{trail.title}</h3>
                            </div>
                            <div className="flex tag">
                              <div className="time">
                                {APP.transfromTimefromMinToHourMin(trail.time)}
                              </div>
                              <div className="diffuculty">{trail.difficulty}</div>
                              <div className="city">{trail.location.city}</div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
              </div>
            </div>
          </section>
          <section className="home-trail-list">
            <div className="wrap">
              {likeList === null ? (
                ''
              ) : (
                <div className="like-rank">
                  <div className="title">
                    <i className="fas fa-heart"></i> 最多人喜愛
                  </div>
                  <TrailsList trailsList={likeList} toggleLoginBox={this.toggleLoginBox} />
                </div>
              )}
              {popularList === null ? (
                ''
              ) : (
                <div className="popular-rank">
                  <div className="title">
                    {' '}
                    <i className="fas fa-fire"></i> 最熱門觀看
                  </div>
                  <TrailsList trailsList={popularList} toggleLoginBox={this.toggleLoginBox} />
                </div>
              )}
            </div>
          </section>
        </div>
        <LoginBox isShowLoginBox={isShowLoginBox} closeLoginBox={this.toggleLoginBox} />
        <Footer />
      </>
    );
  }
}

export default Home;
