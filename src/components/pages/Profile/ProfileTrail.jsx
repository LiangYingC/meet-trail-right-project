import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { DB } from '../../../lib';
import ProfileNoList from './ProfileNoList.jsx';
import AuthUserContext from '../../../contexts/AuthUserContext';
import LoadingWave from '../../shared/LoadingWave';

class ProfileLike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createList: null,
    };
  }

  componentDidMount() {
    const { userData } = this.context;
    if (userData.createList.length > 0) {
      DB.ref('trails')
        .get()
        .then(querySnapshot => {
          let createList = [];
          querySnapshot.forEach(doc => {
            if (userData.createList.indexOf(doc.id) > -1) {
              let item = {
                id: doc.data().id,
                title: doc.data().title,
                mainImage: doc.data().images.main_image,
                createTime: doc.data().create_time,
              };
              createList.push(item);
            }
            this.setState({
              createList: createList,
            });
          });
        });
    } else {
      this.setState({
        createList: [],
      });
    }
  }

  render() {
    const { createList } = this.state;
    if (createList === null) {
      return (
        <>
          <div className="title">
            <h2>我提供的步道</h2>
          </div>
          <LoadingWave />
        </>
      );
    }
    return (
      <>
        <div className="title">
          <h2>我提供的步道</h2>
        </div>
        <div className="num-list">
          <p>
            已分享 <span>{createList.length}</span> 個步道囉
          </p>
        </div>
        {createList.length === 0 ? (
          <ProfileNoList text={'目前尚無收藏的步道喔'} />
        ) : (
          <div className="create-list">
            <div className="flex wrap">
              {createList.map(item => {
                return (
                  <div className={`create-item key=${item.id}`} key={item.id}>
                    <div className="img">
                      <div className="layer"></div>
                      <img src={item.mainImage} alt={`${item.title}的圖片`} />
                      <div className="title">{item.title}</div>
                    </div>
                    <div className="btn-container">
                      <Link to={`/trails/detail/${item.id}`}>
                        <button id="go-to-trail">前往步道</button>
                      </Link>
                      <button id="go-to-edited-trail">編輯步道</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }
}

ProfileLike.contextType = AuthUserContext;
export default ProfileLike;
