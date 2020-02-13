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

    signUp: (email, pwd, name, history, callback) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, pwd)
            .then(data => {
                console.log(data)
                const user = data.user
                DB.ref('users').doc(user.uid)
                    .set({
                        id: user.uid,
                        name: name,
                        email: user.email,
                        picture: 'https://firebasestorage.googleapis.com/v0/b/meet-trail-right.appspot.com/o/projectPictures%2FlogoIcon%2Flogo300x300.png?alt=media&token=6df50e02-8911-4a1d-9583-9197d8859acf',
                        timestamp: DB.time
                    })
                console.log('history')
                history.push('/trails')
            })
            .catch(error => {
                callback(error)
            })
    },

    signIn: (email, pwd, history, callback) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, pwd)
            .then(data => {
                console.log(data)
                const user = data.user
                DB.ref('users').doc(user.uid)
                    .set({
                        id: user.uid,
                        name: user.name,
                        email: user.email,
                        picture: user.picture
                    }, { merge: true })
                console.log('history')
                history.push('/trails')
            })
            .catch(error => {
                callback(error)
            })
    },

    signOut: () => {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        })
    }


}