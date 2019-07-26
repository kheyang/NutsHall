import Firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAClsc5ifgfAvXD6BJk7qh4CuRfIcF8QoE',
  authDomain: 'nutshall-7f904.firebaseapp.com',
  databaseURL: 'https://nutshall-7f904.firebaseio.com',
  projectId: 'nutshall-7f904',
  storageBucket: 'nutshall-7f904.appspot.com',
  messagingSenderId: '151523357724',
  appId: "1:151523357724:web:fd29af295a00c905"
};

let app = Firebase.initializeApp(config);

export const db = app.database();