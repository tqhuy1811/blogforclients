import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const config = {
  apiKey: "AIzaSyCvnsJX4ii8vUjg8CbuGtwyugTj4YOgtg0",
  authDomain: "quan-sblog.firebaseapp.com",
  databaseURL: "https://quan-sblog.firebaseio.com",
  projectId: "quan-sblog",
  storageBucket: "quan-sblog.appspot.com",
  messagingSenderId: "1061580070275"
};
firebase.initializeApp(config);
ReactDOM.render(
  <App />
, document.getElementById('root'));
registerServiceWorker();
