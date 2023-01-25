import { initializeApp } from 'firebase/app'
import API_KEY from './keys'

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "expressaccc.firebaseapp.com",
    databaseURL: "https://expressaccc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "expressaccc",
    storageBucket: "expressaccc.appspot.com",
    messagingSenderId: "855810890307",
    appId: "1:855810890307:web:53f6d671fe159a424f12f6",
    measurementId: "G-C04LW75VQF"
  };

var fire = initializeApp(firebaseConfig);



export default fire;