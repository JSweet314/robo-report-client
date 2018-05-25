import firebase from 'firebase';

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "robo-report-client.firebaseapp.com",
  databaseURL: "https://robo-report-client.firebaseio.com",
  projectId: "robo-report-client",
  storageBucket: "robo-report-client.appspot.com",
  messagingSenderId: "303786486044"
};
firebase.initializeApp(config);

export const auth = firebase.auth();

export default firebase;