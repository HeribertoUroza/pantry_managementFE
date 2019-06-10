import { firebase } from '@firebase/app';
import 'firebase/auth';
import 'firebase/storage';

import {firebaseAPI} from './services/apiKey'

const firebaseConfig = firebaseAPI


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;