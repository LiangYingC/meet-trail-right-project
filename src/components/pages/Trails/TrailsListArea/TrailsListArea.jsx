import React, { Component } from 'react';
import LoginBox from '../../../shared/LoginBox';
import TrailsList from '../../../shared/TrailsList';
import TrailsListSkeleton from '../../../shared/TrailsList/TrialsListSkeleton.jsx';

class TrailsListArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowLoginBox: false,
      isShowTopBtn: false,
      positionY: window.pageYOffset,
      movedY: 0,
      positionYCount: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const lastPositionY = this.state.positionY;
    this.setState(
      {
        positionY: window.pageYOffset,
      },
      () => this.calculateScrollHeight(lastPositionY)
    );
  };

  calculateScrollHeight = lastPositonY => {
    const scrollHeight = window.pageYOffset - lastPositonY;
    const { movedY } = this.state;
    this.setState(
      {
        movedY: movedY + scrollHeight,
      },
      this.handleScrollToTopBtnShow
    );
  };

  handleScrollToTopBtnShow = () => {
    const { positionY } = this.state;
    if (positionY >= 150) {
      this.setState({
        isShowTopBtn: true,
      });
    } else if (positionY < 150) {
      this.setState({
        isShowTopBtn: false,
      });
    }
  };

  scrollToTop = () => {
    let moveHeight = this.state.movedY;
    const intervalId = setInterval(() => {
      moveHeight = moveHeight - 50;
      window.scrollTo(0, moveHeight);
      if (moveHeight <= 0) {
        clearInterval(intervalId);
        this.setState(preState => ({
          ...preState,
          positionY: window.pageYOffset,
          movedY: 0,
        }));
      }
    }, 0);
  };

  toggleLoginBox = () => {
    this.setState(preState => ({
      ...preState,
      isShowLoginBox: !preState.isShowLoginBox,
    }));
  };

  render() {
    const { isShowLoginBox, isShowTopBtn } = this.state;
    const { trailsVisible } = this.props;
    return (
      <>
        <section id="trails-list-area">
          <div className="wrap">
            <div className="flex">
              <div className="trails-qty">
                {trailsVisible ? `篩選結果有 ${trailsVisible.length} 條步道` : ''}
              </div>
            </div>
            {trailsVisible ? (
              trailsVisible.length <= 0 ? (
                <div className="no-trails-list">
                  <div className="empty-img">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FlogoIcon%2Flogo-empty.png?alt=media&token=111f02e5-c068-4bb0-8b81-e878297b7dfe"
                      alt="沒有相關步道"
                    />
                  </div>
                  <h2>目前尚無相關步道哦</h2>
                </div>
              ) : (
                <TrailsList trailsList={trailsVisible} toggleLoginBox={this.toggleLoginBox} />
              )
            ) : (
              <TrailsListSkeleton
                skeletonNum={8}
                isSkeletonContainerRow={true}
                isSkeletonItemRow={false}
              />
            )}
          </div>
          <div className={`top-btn ${isShowTopBtn ? 'active' : ''}`} onClick={this.scrollToTop}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FlogoIcon%2FTopBtn.png?alt=media&token=112dbc3e-01f4-4f31-9004-a436806b82cb"
              alt="Top Button"
            />
          </div>
        </section>
        <LoginBox isShowLoginBox={isShowLoginBox} closeLoginBox={this.toggleLoginBox} />
      </>
    );
  }
}

export default TrailsListArea;
