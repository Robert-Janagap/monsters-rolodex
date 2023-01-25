import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAAW4mvDL9UG3YcvFkjpQRGPJy1bjPYNxg',
  authDomain: 'crwn-clothing-db-6fb5d.firebaseapp.com',
  projectId: 'crwn-clothing-db-6fb5d',
  storageBucket: 'crwn-clothing-db-6fb5d.appspot.com',
  messagingSenderId: '369295982898',
  appId: '1:369295982898:web:3ec012bf542c67facb972b'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
// google pop up sign in
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
// google redirect sign in
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

// create user
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
  return userDocRef
}
