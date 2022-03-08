import Firebase from 'firebase';

import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';   // for cloud functions

import FirebaseConfig from '../config/FirebaseConfig';

const firebase_app = Firebase.initializeApp(FirebaseConfig);
const database = firebase.firestore()

export default {

  facebookLoginPopup: async () => {

    const provider = new Firebase.auth.FacebookAuthProvider();
    let result = await Firebase.auth().signInWithPopup(provider);

    return result;
  }

}
