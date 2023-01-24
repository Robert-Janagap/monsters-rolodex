import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'

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

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
