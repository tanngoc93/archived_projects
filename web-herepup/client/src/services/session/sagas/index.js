import { call, put, takeEvery } from 'redux-saga/effects';
import { signinApi } from '../api';

import { 
  SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE,
  SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE,
} from '../../../constants';

function *signinUser(action) {
   try {
      const { user } = yield call(signinApi, action.credentials);
      yield put({
        type: SIGNIN_SUCCESS,
        message: '',
        fetching: false,
        isAuthenticated: true,
      });
      localStorage.setItem('auth_token', user.auth_token);
   } catch (e) {
      yield put({
        type: SIGNIN_FAILURE,
        message: e.message,
        fetching: false,
        isAuthenticated: false,
      });
   }
}

function *signoutUser(action) {
   try {
      yield put({
        type: SIGNOUT_SUCCESS,
        message: '',
        fetching: false,
        isAuthenticated: false,
      });
      localStorage.removeItem('auth_token');
   } catch (e) {
      yield put({
        type: SIGNOUT_FAILURE,
        message: e.message,
        fetching: false,
        isAuthenticated: false,
      });
   }
}

/*************************************************************/
/*************************************************************/
/*************************************************************/

function *signinUserWatcher() {
  yield takeEvery(SIGNIN_REQUEST, signinUser);
}

function *signoutUserWatcher() {
  yield takeEvery(SIGNOUT_REQUEST, signoutUser);
}

export { signinUserWatcher, signoutUserWatcher };
