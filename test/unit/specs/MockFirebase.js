import firebase from 'firebase';

const config = {
  databaseURL: 'ws://localhost:5000',
};
const app = firebase.initializeApp(config);
const db = app.database();

export default db;
