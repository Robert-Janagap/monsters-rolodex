import { USER_ACTION_TYPE } from './user.types'
import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer.utils'
import {
  UserData,
  AdditionalInformation
} from '../../utils/firebase/firebase.utils'

export type CheckUserSession = Action<USER_ACTION_TYPE.CHECK_USER_SESSION>

export type SetCurrentUser = ActionWithPayload<
  USER_ACTION_TYPE.SET_CURRENT_USER,
  UserData
>

export type GoogleSignInStart = Action<USER_ACTION_TYPE.GOOGLE_SIGN_IN_START>

export type EmailSignInStart = ActionWithPayload<
  USER_ACTION_TYPE.EMAIL_SIGN_IN_START,
  { email: string; password: string }
>

export type SignUpStart = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_UP_START,
  { email: string; password: string; displayName: string }
>

export type SignInSuccess = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_IN_SUCCESS,
  UserData
>

export type SignInFailed = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_IN_FAILED,
  Error
>

export type SignUpFailed = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_UP_FAILED,
  Error
>

export type SignOutFailed = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_OUT_FAILED,
  Error
>

export type SignUpSuccess = ActionWithPayload<
  USER_ACTION_TYPE.SIGN_UP_SUCCESS,
  { user: UserData; additionalDetails: AdditionalInformation }
>

export const setCurrentUser = withMatcher(
  (user: UserData): SetCurrentUser =>
    createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user)
)

export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_ACTION_TYPE.CHECK_USER_SESSION)
)

export const googleSignInStart = withMatcher(
  (): GoogleSignInStart => createAction(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START)
)

export const emailSignInStart = withMatcher(
  (email: string, password: string): EmailSignInStart =>
    createAction(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, { email, password })
)

export const signInSuccess = withMatcher(
  (user: UserData): SignInSuccess =>
    createAction(USER_ACTION_TYPE.SIGN_IN_SUCCESS, user)
)

export const signInFailed = withMatcher(
  (error: Error): SignInFailed =>
    createAction(USER_ACTION_TYPE.SIGN_IN_FAILED, error)
)

export const signUpStart = withMatcher(
  (email: string, password: string, displayName: string): SignUpStart =>
    createAction(USER_ACTION_TYPE.SIGN_UP_START, {
      email,
      password,
      displayName
    })
)

export const signUpSuccess = withMatcher(
  (user: UserData, additionalDetails: AdditionalInformation): SignUpSuccess =>
    createAction(USER_ACTION_TYPE.SIGN_UP_SUCCESS, { user, additionalDetails })
)

export const signUpFailed = withMatcher(
  (error: Error): SignUpFailed =>
    createAction(USER_ACTION_TYPE.SIGN_UP_FAILED, error)
)

export const signOutStart = () => createAction(USER_ACTION_TYPE.SIGN_OUT_START)

export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPE.SIGN_OUT_SUCCESS)

export const signOutFailed = withMatcher(
  (error: Error): SignOutFailed =>
    createAction(USER_ACTION_TYPE.SIGN_OUT_FAILED, error)
)