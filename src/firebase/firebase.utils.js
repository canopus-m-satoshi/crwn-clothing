import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCNd9huji3ptvchFUcD2tmiQb0qtoDU0oE',
  authDomain: 'crwn-db-615f8.firebaseapp.com',
  projectId: 'crwn-db-615f8',
  storageBucket: 'crwn-db-615f8.appspot.com',
  messagingSenderId: '183289044061',
  appId: '1:183289044061:web:dea693ceb7f495900741b4',
  measurementId: 'G-08N34TS7GW',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

// Whenever we use GoogleProvider, Google pop up to sign in
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
