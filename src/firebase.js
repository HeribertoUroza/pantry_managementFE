import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

import {firebaseAPI} from './services/apiKey'

const firebaseConfig = firebaseAPI


  // Initialize Firebase
  app.initializeApp(firebaseConfig);

  export default app;