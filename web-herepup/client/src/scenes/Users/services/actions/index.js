import {
  SIGNUP_REQUEST,
  GET_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST } from '../../../../constants';

// Calls the API to get a token and
// dispatches actions along the way
export function signupUser(user) {
  const action = {
    type: SIGNUP_REQUEST, 
    user,
    message: '',
    fetching: true,
  }
  return action;
}

export function getProfile() {
  const action = {
    type: GET_PROFILE_REQUEST,
    message: '',
    fetching: true,
  }
  return action;
}

export function updateProfile(user) {
  const action = {
    type: UPDATE_PROFILE_REQUEST,
    user,
    message: '',
    fetching: true,
  }
  return action;
}
