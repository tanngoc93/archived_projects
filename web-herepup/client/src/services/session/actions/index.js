import { SIGNIN_REQUEST, SIGNOUT_REQUEST } from '../../../constants';

// Calls the API to get a token and
// dispatches actions along the way
export function signinUser(credentials) {
  const action = {
    type: SIGNIN_REQUEST,
    message: '',
    credentials,
    fetching: true,
    isAuthenticated: false,
  }
  return action;
}

// Logs the user out
export function signOutUser() {
  const action = {
    type: SIGNOUT_REQUEST,
    fetching: false,
    isAuthenticated: false,
  }
  return action;
}