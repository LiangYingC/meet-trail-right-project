// APP (Meet Trail Right app) library
export const APP = {
    getDay: () => {
        const today = new Date()
        const todayDate = `${today.getFullYear()}-${(`0${(today.getMonth() + 1)}`).slice(-2)}-${('0' + today.getDate()).slice(-2)}`
        return todayDate
    },

    getTime: () => {
        const today = new Date()
        const todayTime = `${('0' + today.getHours()).slice(-2)}:${('0' + today.getMinutes()).slice(-2)}`
        return todayTime
    },

    tansformTrialDataFromStateToDB: (inputValue, userData, sceneryData, difficultyData) => {
        return {
            id: null,
            title: inputValue.title,
            description: inputValue.description,
            location: {
                area: inputValue.area,
                city: inputValue.city,
                dist: inputValue.dist
            },
            images: {
                main_image: inputValue.coverImg,
                route_image: inputValue.routeImg
            },
            routes: {
                start: inputValue.start,
                end: inputValue.end,
                type: inputValue.type
            },
            create_user_id: userData.id,
            create_time: APP.getDay(),
            height: {
                max: Number(inputValue.maxHeight),
                min: Number(inputValue.minHeight)
            },
            length: Number(inputValue.length),
            time: (Number(inputValue.hour) * 60) + Number(inputValue.minute),
            scenery: sceneryData,
            difficulty: difficultyData,
            timestamp: DB.time(),
            youtube_list: null,
            like_data: {
                users: [],
                count: 0
            },
            view_count: 0
        }
    }
}

// Firebase Database library
import { db } from '../config';
import firebase from '../config';

export const DB = {
    time: () => firebase.firestore.FieldValue.serverTimestamp(),

    ref: firstCollection => {
        const ref = db.collection(`${firstCollection}`)
        return ref
    },

    storageRef: filePath => {
        const storageRef = firebase.storage().ref()
        return storageRef.child(filePath)
    },

    signUp: (email, pwd, name, history, callback, callbackSed) => {
        firebase.auth()
            .createUserWithEmailAndPassword(email, pwd)
            .then(data => {
                const user = data.user
                DB.ref('users').doc(user.uid)
                    .set({
                        id: user.uid,
                        name: name,
                        email: user.email,
                        picture: 'https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FlogoIcon%2FUserlogo.png?alt=media&token=38796a9b-348b-4995-82ee-6b6c88f70eb8',
                        timestamp: DB.time(),
                        status: '享受悠遊山林步道的時光',
                        like_list: [],
                        create_list: []
                    })
                DB.ref('users').doc(user.uid).collection('report_list')
                if (history) {
                    history.push('/profile')
                } else {
                    callbackSed()
                }
            })
            .catch(error => {
                callback(error)
            })
    },

    signIn: (email, pwd, history, callback, callbackSed) => {
        firebase.auth()
            .signInWithEmailAndPassword(email, pwd)
            .then(data => {
                if (history) {
                    history.push('/profile')
                } else {
                    callbackSed()
                }
            })
            .catch(error => {
                callback(error)
            })
    },

    signOut: (history) => {
        firebase.auth()
            .signOut()
            .then(() => {
                if (history) {
                    history.push('/trails')
                } else {
                    callbackSed()
                }
            })
    },

    signWithGoogle: (closeLoginBox) => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const user = result.user
                if (user.metadata.lastSignInTime === user.metadata.creationTime) { // first sign up set user data
                    DB.ref('users').doc(user.uid)
                        .set({
                            id: user.uid,
                            name: user.displayName,
                            email: user.email,
                            picture: user.photoURL,
                            timestamp: DB.time(),
                            status: '享受悠遊山林步道的時光',
                            like_list: [],
                            create_list: []
                        })
                    DB.ref('users').doc(user.uid).collection('report_list')
                }
                if (closeLoginBox) {
                    closeLoginBox()
                }
            })
    }
}