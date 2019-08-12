import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT_SUCCESS } from '../../../constants';

let initState = {
  message: '',
  fetching: false,
  isAuthenticated: localStorage.getItem('auth_token') ? true : false
}

export default (state = initState, action) => {
  const { message, fetching, isAuthenticated } = action;

  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        message,
        fetching,
        isAuthenticated
      }
    case SIGNIN_SUCCESS:
      return {
        message,
        fetching,
        isAuthenticated
      }
    case SIGNIN_FAILURE:
      return {
        message,
        fetching,
        isAuthenticated
      }
    case SIGNOUT_SUCCESS:
      return {
        message,
        fetching,
        isAuthenticated
      }
    default:
      return state
  }
}
