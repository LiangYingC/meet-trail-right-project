
// Firebase
export const DB = {
    time: firebase.firestore.FieldValue.serverTimestamp(),

    ref: firstCollection => {
        const db = firebase.firestore()
        const ref = db.collection(`${firstCollection}`)
        return ref
    },

    signUp: (email, pwd, name, callback) => {
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
                        picture: user.photoURL,
                        timestamp: DB.time
                    })
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
                const user = data.user
                DB.ref('users').doc(user.uid)
                    .set({
                        id: user.uid,
                        name: name,
                        email: user.email,
                        picture: user.photoURL,
                        timestamp: DB.time
                    }, { merge: true })
                history.push('/trails')
            })
            .catch(error => {
                callback(error)
            })
    },

    signOut: firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    })
}