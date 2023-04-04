import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAAW4mvDL9UG3YcvFkjpQRGPJy1bjPYNxg',
  authDomain: 'crwn-clothing-db-6fb5d.firebaseapp.com',
  projectId: 'crwn-clothing-db-6fb5d',
  storageBucket: 'crwn-clothing-db-6fb5d.appspot.com',
  messagingSenderId: '369295982898',
  appId: '1:369295982898:web:3ec012bf542c67facb972b',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// adding collection
export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done')
}

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
// google pop up sign in
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
// google redirect sign in
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

// create user
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
  return userDocRef
}

// create user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}

// sign in with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}

// sign out user
export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangeListener = (callback) =>
  onAuthStateChanged(auth, callback)

// get docs categories
export const getCategoriesAndDocuments = async (name) => {
  const collectionRef = collection(db, name)
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return categoryMap
}
