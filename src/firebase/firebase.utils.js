import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCVbrxBe6whPGLoCGxyCRo7w4hHXxfs2t8",
  authDomain: "crown-store-c5f60.firebaseapp.com",
  databaseURL: "https://crown-store-c5f60.firebaseio.com",
  projectId: "crown-store-c5f60",
  storageBucket: "crown-store-c5f60.appspot.com",
  messagingSenderId: "725473121420",
  appId: "1:725473121420:web:e7a5b8f425172751ee97a9"
};

firebase.initializeApp(config);

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
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
