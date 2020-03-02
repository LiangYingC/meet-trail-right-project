// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyBq0wp5dHGR_DAAP3Mhsap7Y0u5VvOuPp4",
    authDomain: "meet-trail-right.firebaseapp.com",
    databaseURL: "https://meet-trail-right.firebaseio.com",
    projectId: "meet-trail-right",
    storageBucket: "meet-trail-right.appspot.com",
    messagingSenderId: "913753126186",
    appId: "1:913753126186:web:7f19e19456e4b3c7095a53",
    measurementId: "G-QV2C25SEQY"
}







// // Create a reference to the file whose metadata we want to retrieve
// var forestRef = storageRef.child('trails/知高圳步道.jpg');
// // Get metadata properties
// forestRef.getMetadata().then(function (metadata) {
//     console.log("取得照片資料", metadata);
// }).catch(function (error) {
//     // Uh-oh, an error occurred!
// })

// const storage = firebase.storage()
// const storageRef = storage.ref()
// storageRef.child('trails/知高圳步道.jpg').getDownloadURL().
//     then(function (url) { console.log(url) })


// const storageRef = firebase.storage().ref();
// storageRef.child('trails/知高圳步道.jpg').getMetadata().then(function (metadata) {
//     console.log("取得照片資料", metadata);
// }).catch(function (error) {
//     // Uh-oh, an error occurred!
// })

//test
// const db = firebase.firestore()
// const trailsRef = db.collection('trails').doc()
// trailsRef.set({
//     id: '',
//     main_image: '',
//     title: '知高圳步道',
//     scenery: '眺望城市',
//     main_image: '',
//     create_ueser: {
//         id: '',
//         name: 'Test 1',
//         picture: ''
//     },
//     create_time: '2020-02-01',
//     height: '139',
//     length: '2',
//     time: '2小時',
//     difficulty: '輕鬆',
//     location: {
//         city: '台中市',
//         dist: '烏日區'
//     },
//     description: '知高圳步道位於烏日的知高圳，圳水引入筏子溪溪水，是南屯、烏日、大肚三地農田的重要灌溉水源。 沿著水圳以枕木鋪設修建的步道，從烏日善光寺可通至大肚，步道平緩好走，只有好漢坡稍有坡度，但也僅 80 公尺的落差，S 型的水圳步道古樸優美，欣賞架高渡槽的引水道，聽著潺潺的流水聲，沒有太多曝曬的路段，即使在炎炎夏日裡， 都能感到沁涼，適合闔家休閒健行。行經好漢坡、雪蓮步道至學田山頂，有一座落日平台，180 度的展望令人身心舒暢，綠色的草坡十分迷人，是欣賞夕陽的秘境。結束登高望遠的步道之旅，還可順道參觀鄰近的善光寺、聚奎居、成功火車站、烏日啤酒廠等景點參觀。',
//     tr_start: '善光寺',
//     tr_end: '學田山'
// }).
//     then(
//         () => { console.log('set ok') }
//     )


