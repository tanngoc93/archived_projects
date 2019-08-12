import { history } from '../../../../services/history';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { signupApi, getProfileApi, updateProfileApi } from '../api';

import { 
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE,
} from '../../../../constants';

function *signupUser(action) {
	try {
	  const { user } = yield call(signupApi, action.user);
	  yield put({
	    type: SIGNUP_SUCCESS, 
	    message: '',
	    fetching: false,
	    userData: user,
	  });
	  history.push('/signin');
	} catch (e) {
	  yield put({
	    type: SIGNUP_FAILURE,
	    message: e.message,
	    fetching: false,
	    userData: null,
	  });
	}
}

function *getProfile(action) {
	try {
	  const { user } = yield call(getProfileApi);
	  yield put({
	    type: GET_PROFILE_SUCCESS, 
	    message: '',
	    fetching: false,
	    userData: user,
	  });
	} catch (e) {
	  yield put({
	    type: GET_PROFILE_FAILURE,
	    message: e.message,
	    fetching: false,
	    userData: null,
	  });
	}
}

function *updateProfile(action) {
	try {
	  const { user } = yield call(updateProfileApi, action.user);
	  yield put({
	    type: UPDATE_PROFILE_SUCCESS, 
	    message: '',
	    fetching: false,
	    userData: user,
	  });
	} catch (e) {
	  yield put({
	    type: UPDATE_PROFILE_FAILURE,
	    message: e.message,
	    fetching: false,
	    userData: null,
	  });
	}
}

/*************************************************************/
/*************************************************************/
/*************************************************************/

function *signupUserWatcher() {
  yield takeEvery(SIGNUP_REQUEST, signupUser);
}

function *getProfileWatcher() {
  yield takeLatest(GET_PROFILE_REQUEST, getProfile);
}

function *updateProfileWatcher() {
  yield takeEvery(UPDATE_PROFILE_REQUEST, updateProfile);
}

export { signupUserWatcher, getProfileWatcher, updateProfileWatcher };
