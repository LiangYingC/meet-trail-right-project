import React, { Component, Fragment } from 'react';
import {
    HashRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import ProfileLike from './ProfileLike.jsx';
import ProfileRecord from './ProfileRecord.jsx';
import ProfileReport from './ProfileReport.jsx';
import ProfileComment from './ProfileComment.jsx';
import ProfileTrail from './ProfileTrail.jsx';


const profileRoutes = [
    {
        path: "/profile",
        exact: true,
        main: () => <ProfileLike />
    },
    {
        path: "/profile/record",
        exact: true,
        main: () => <ProfileRecord />
    },
    {
        path: "/profile/comment",
        exact: true,
        main: () => <ProfileComment />
    },
    {
        path: "/profile/report",
        exact: true,
        main: () => <ProfileReport />
    },
    {
        path: "/profile/trail",
        exact: true,
        main: () => <ProfileTrail />
    }
]

class Profile extends Component {

    signOut() {

    }

    render() {
        const pathName = this.props.location.pathname

        return (
            <Fragment>
                <Header />
                <section id="profile">
                    <div className="flex wrap">
                        <div className="profile-aside">
                            <div className="profile-aside-user">
                                <div className="user-img-wrap">
                                    <div className="user-img">
                                        <label htmlFor="upload-img" className="upload-img"></label>
                                        <img src="https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FlogoIcon%2Flogo300x300.png?alt=media&token=6df50e02-8911-4a1d-9583-9197d8859acf" alt="" />
                                        <input
                                            type="file"
                                            id="upload-img"
                                        />
                                    </div>
                                </div>

                                <div className="user-name-wrap">
                                    <div className="user-name">
                                        <p>Chen Liang</p>
                                    </div>
                                </div>
                                <div className="user-status-wrap">
                                    <div className="user-status">
                                        <p>希望能養成健行的習慣</p>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-aside-menu">
                                <Router>
                                    <ul>
                                        <Link to="/profile">
                                            <li className={`${pathName === '/profile' ? 'active' : ''}`}>
                                                <i className="fas fa-heart"></i>
                                                <p>我的收藏</p>
                                            </li>
                                        </Link>
                                        <Link to="/profile/record">
                                            <li className={`${pathName === '/profile/record' ? 'active' : ''}`}>
                                                <i className="fas fa-map-signs"></i>
                                                <p>步道紀錄</p>
                                            </li>
                                        </Link>
                                        <Link to="/profile/comment">
                                            <li className={`${pathName === '/profile/comment' ? 'active' : ''}`}>
                                                <i className="fas fa-comment"></i>
                                                <p>步道評論</p>
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
                                </Router>
                                <button
                                    id="sign-out-btn"
                                    className="flex"
                                    onClick={this.signOut}
                                >
                                    <p>登出</p>
                                </button>
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
            </Fragment >
        )
    }
}

export default Profile;