// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBq0wp5dHGR_DAAP3Mhsap7Y0u5VvOuPp4",
    authDomain: "meet-trail-right.firebaseapp.com",
    databaseURL: "https://meet-trail-right.firebaseio.com",
    projectId: "meet-trail-right",
    storageBucket: "meet-trail-right.appspot.com",
    messagingSenderId: "913753126186",
    appId: "1:913753126186:web:7f19e19456e4b3c7095a53",
    measurementId: "G-QV2C25SEQY"
}
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore();
export default firebase;


// Weather
export const weatherConfig = {
    apiKey: 'CWB-8C6758C8-C956-44EB-B0AD-7228A59F92C0',
    baseUrl: 'https://opendata.cwb.gov.tw/api/v1/rest/datastore'
}

// Youtube
export const youtubeConfig = {
    apiKey: 'AIzaSyAdjEsVveMWoqUjvz59GS3KMAwfsBVvKjQ',
    baseUrl: 'https://www.googleapis.com/youtube/v3',
    order: 'relevance',
    maxResults: 5
}




