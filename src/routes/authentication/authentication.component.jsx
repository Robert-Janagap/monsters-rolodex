import { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'

import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  auth
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'

const Authentication = () => {
  useEffect(() => {
    const getResponse = async () => {
      const response = await getRedirectResult(auth)
      if (response) {
        const userDockRef = await createUserDocumentFromAuth(response.user)
      }
    }
    getResponse()
  }, [])

  return (
    <div>
      <h1>Sign in Page</h1>
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default Authentication
