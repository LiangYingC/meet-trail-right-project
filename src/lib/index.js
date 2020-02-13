

// Firebase
export const DB = {
    time: () => firebase.firestore.FieldValue.serverTimestamp(),

    ref: firstCollection => {
        const db = firebase.firestore()
        const ref = db.collection(`${firstCollection}`)
        return ref
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