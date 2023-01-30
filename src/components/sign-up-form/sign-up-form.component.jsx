import { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFormField = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords does not match')
      return
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, { displayName })
      resetFormField()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already use')
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }
  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          inputOptions={{
            type: 'text',
            required: true,
            onChange: handleChange,
            name: 'displayName',
            value: displayName
          }}
          label='Display Name'
        />
        <FormInput
          inputOptions={{
            type: 'email',
            required: true,
            onChange: handleChange,
            name: 'email',
            value: email
          }}
          label='Email'
        />
        <FormInput
          inputOptions={{
            type: 'password',
            required: true,
            onChange: handleChange,
            name: 'password',
            value: password
          }}
          label='Password'
        />
        <FormInput
          label='Confirm Password'
          inputOptions={{
            type: 'password',
            required: true,
            onChange: handleChange,
            name: 'confirmPassword',
            value: confirmPassword
          }}
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
