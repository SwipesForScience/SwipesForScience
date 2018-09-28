import firebase from 'firebase';
import config from './config';

firebase.initializeApp(config.firebaseKeys);

/* eslint-disable */
export const db = firebase.database();
/* eslint-enable */
