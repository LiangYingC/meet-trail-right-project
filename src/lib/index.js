// APP (Meet Trail Right app)
export const APP = {
    getDay: () => {
        const today = new Date()
        const todayDate = `${today.getFullYear()}-${('0' + today.getMonth()).slice(-2)}-${today.getDate()}`
        return todayDate
    },

    getTime: () => {
        const today = new Date()
        const todayTime = `${('0' + today.getHours()).slice(-2)}:${('0' + today.getMinutes()).slice(-2)}`
        return todayTime
    }
}

// Firebase Database
export const DB = {
    time: () => firebase.firestore.FieldValue.serverTimestamp(),

    ref: firstCollection => {
        const db = firebase.firestore()
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
                        picture: 'https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FlogoIcon%2Flogo300x300.png?alt=media&token=6df50e02-8911-4a1d-9583-9197d8859acf',
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
            }).catch(error => {
                console.log(error)
            })
    }
}