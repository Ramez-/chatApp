import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as firebase from 'firebase';




  var config = {
    apiKey: "AIzaSyCs9Mn1EV06ieEQbzkNKYc4d_UQKZXMFjM",
    authDomain: "webquick-555e0.firebaseapp.com",
    databaseURL: "https://webquick-555e0.firebaseio.com",
    projectId: "webquick-555e0",
    storageBucket: "webquick-555e0.appspot.com",
    messagingSenderId: "38894320253"
  };

firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
