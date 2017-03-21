import firebase from 'firebase';
import config from 'config';
const Firebase = firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL:  config.dbURL,
    storageBucket: config.bucket,
    messagingSenderId: config.msID
});

export default Firebase;
