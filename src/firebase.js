import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB5PTbaFlit546WWqTO5T1kBbdEZJ6pzrs",
    authDomain: "possible-pantry.firebaseapp.com",
    databaseURL: "https://possible-pantry.firebaseio.com",
    projectId: "possible-pantry",
    storageBucket: "possible-pantry.appspot.com",
    messagingSenderId: "281882477042",
    appId: "1:281882477042:web:86754d07d24d8189"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default app;