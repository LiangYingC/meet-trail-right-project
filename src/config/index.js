import { apiKeys } from './ignore';

// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: apiKeys.firebaseKey,
  authDomain: 'meet-trail-right.firebaseapp.com',
  databaseURL: 'https://meet-trail-right.firebaseio.com',
  projectId: 'meet-trail-right',
  storageBucket: 'meet-trail-right.appspot.com',
  messagingSenderId: '913753126186',
  appId: '1:913753126186:web:7f19e19456e4b3c7095a53',
  measurementId: 'G-QV2C25SEQY',
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;

// Weather
export const weatherConfig = {
  apiKey: apiKeys.weatherKey,
  baseUrl: 'https://opendata.cwb.gov.tw/api/v1/rest/datastore',
};

// Youtube
export const youtubeConfig = {
  apiKey: apiKeys.youtubeKey,
  baseUrl: 'https://www.googleapis.com/youtube/v3',
  order: 'relevance',
  maxResults: 5,
};
