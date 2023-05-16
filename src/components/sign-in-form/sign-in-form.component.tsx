import { ChangeEvent, FormEvent, useState } from 'react'
import FormInput from '../form-input/form-input.component'
import {SignUpContainer, ButtonContainer} from './sign-in-form.styles'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { useDispatch } from 'react-redux'
import {
  googleSignInStart,
  emailSignInStart,
} from '../../store/user/user.action'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields
  const dispatch = useDispatch()

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart())
  }

  const resetFormField = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      dispatch(emailSignInStart(email, password))
      resetFormField()
    } catch (error) {
      console.log('User sign in failed', error)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }
  return (
    <SignUpContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={(e) => handleSubmit}>
        <FormInput
            type= 'email'
            required
            onChange= {handleChange}
            name= 'email'
            value= 'email'
          label='Email'
        />
        <FormInput
            type= 'password'
            required
            onChange= {handleChange}
            name= 'password'
            value= 'password'
          label='Password'
        />
        <ButtonContainer>
          <Button type='submit'>Sign In</Button>
          <Button
            type='button'
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </ButtonContainer>
      </form>
    </SignUpContainer>
  )
}

export default SignInForm
