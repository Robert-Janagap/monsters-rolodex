import { takeLatest, call, all, put } from 'redux-saga/effects'

import { USER_ACTION_TYPE } from './user.types'

import { signInSuccess, signInFailed } from './user.action'
import {
  createUserDocumentFromAuth,
  getCurrentUser,
} from '../../utils/firebase/firebase.utils'

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    )
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser)
    if (!userAuth) return
    yield call(getSnapshotFromUserAuth, userAuth)
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSagas() {
  yield all([call(onCheckUserSession)])
}
