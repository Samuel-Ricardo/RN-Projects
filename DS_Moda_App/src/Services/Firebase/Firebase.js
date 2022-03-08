import Firebase from 'firebase';

import FirebaseConfig from './firebase_config';

const firebase_app = Firebase.initializeApp(FirebaseConfig);
const database = firebase.firestore()

export default {

  facebookLoginPopup: async () => {

    const provider = new Firebase.auth.FacebookAuthProvider();
    let result = await Firebase.auth().signInWithPopup(provider);

    return result;
  }
}
