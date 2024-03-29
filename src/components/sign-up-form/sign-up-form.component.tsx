import { ChangeEvent, FormEvent, useState } from 'react'
import FormInput from '../form-input/form-input.component'
import {SignUpContainer} from './sign-up-form.styles'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { useDispatch } from 'react-redux'
import { signUpStart } from '../../store/user/user.action'
import { AuthError, AuthErrorCodes } from 'firebase/auth'
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields
  const dispatch = useDispatch()

  const resetFormField = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords does not match')
      return
    }
    try {
      dispatch(signUpStart(email, password, displayName))
      resetFormField()
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Cannot create user, email already use')
      }
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    console.log(name);
    setFormFields({ ...formFields, [name]: value })
  }
  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
            type= 'text'
            required
            onChange= {handleChange}
            name= 'displayName'
            value= {displayName}
            label=  'Display Name'
        />
        <FormInput
            type= 'email'
            required
            onChange= {handleChange}
            name= 'email'
            value= {email}
            label='Email'
        />
        <FormInput
            type= 'password'
            required
            onChange= {handleChange}
            name= 'password'
            value= {password}
            label='Password'
        />
        <FormInput
          label='Confirm Password'
            type= 'password'
            required
            onChange= {handleChange}
            name= 'confirmPassword'
            value= {confirmPassword}
        />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type='submit'>
          Sign Up
        </Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm
