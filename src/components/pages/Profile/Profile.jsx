import React, { Component } from 'react';
import {
    Route,
    Link,
    Switch
} from "react-router-dom";
import { DB } from '../../../lib';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import { profileRoutes } from '../../../routes/profileRoutes'
import AuthUserContext from '../../../contexts/AuthUserContext';

class Profile extends Component {
    constructor(props) {
        super(props)
    }

    signOut = () => {
        const history = this.props.history
        DB.signOut(history)
    }

    uploadUserImg = (e) => {
        const { userData, handleUserData } = this.context
        const file = e.target.files[0]

        if (file.size > 1000000) {

        } else {
            const uploadTask = DB.storageRef(`/users/${userData.id}/${userData.name}的照片`).put(file)
            uploadTask.on('state_changed', snapshot => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, error => {
                console.log(error)
            }, () => {
                // Handle successful uploads on complete
                uploadTask.snapshot.ref.getDownloadURL()
                    .then(downloadURL => {
                        const newUserData = {
                            ...userData,
                            picture: downloadURL
                        }
                        DB.ref('users').doc(userData.id)
                            .update({
                                picture: downloadURL
                            })
                        handleUserData(newUserData)
                    })
            })
        }

    }

    render() {
        const pathName = this.props.location.pathname
        const { userData } = this.context
        const { history } = this.props
        return (
            <>
                <Header history={history} />
                <section id="profile">
                    <div className="flex wrap">
                        <div className="profile-aside">
                            <div className="profile-panel">
                                <div className="profile-aside-user">
                                    <div className="user-img-wrap">
                                        <div className="user-img">
                                            <label htmlFor="upload-img" className="upload-img">上傳圖片</label>
                                            <img src={userData.picture} alt={`${userData.name}的照片`} />
                                            <input
                                                type="file"
                                                id="upload-img"
                                                onChange={this.uploadUserImg}
                                            />
                                        </div>
                                    </div>

                                    <div className="user-name-wrap">
                                        <div className="user-name">
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>
                                    <div className="user-status-wrap">
                                        <div className="user-status">
                                            <p>{userData.status}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-aside-menu">
                                    <ul>
                                        <Link to="/profile">
                                            <li className={`${pathName === '/profile' ? 'active' : ''}`}>
                                                <i className="fas fa-heart"></i>
                                                <p>我的收藏</p>
                                            </li>
                                        </Link>
                                        <Link to="/profile/report">
                                            <li className={`${pathName === '/profile/report' ? 'active' : ''}`}>
                                                <i className="fas fa-bullhorn"></i>
                                                <p>步道近況回報</p>
                                            </li>
                                        </Link>
                                        <Link to="/profile/trail">
                                            <li className={`${pathName === '/profile/trail' ? 'active' : ''}`}>
                                                <i className="fas fa-mountain"></i>
                                                <p>我提供的步道</p>
                                            </li>
                                        </Link>
                                    </ul>
                                    <button
                                        id="sign-out-btn"
                                        className="flex"
                                        onClick={this.signOut}
                                    >
                                        <p>登出</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="profile-main">
                            <Switch>
                                {profileRoutes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        children={<route.main />}
                                    />
                                ))}
                            </Switch>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        )
    }
}


Profile.contextType = AuthUserContext
export default Profile;