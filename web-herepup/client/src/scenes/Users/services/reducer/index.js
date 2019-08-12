import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE } from '../../../../constants';

let initState = {
  userData: null,
  fetching: false,
  message: '',
}

export default (state = initState, action) => {
  const { message, userData, fetching, } = action;

  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        message,
        userData,
        fetching,
      }
    case SIGNUP_SUCCESS:
      return {
        message,
        userData,
        fetching,
      }
    case SIGNUP_FAILURE:
      return {
        message,
        userData,
        fetching,
      }
    case GET_PROFILE_REQUEST:
      return {
        message,
        userData,
        fetching,
      }
    case GET_PROFILE_SUCCESS:
      return {
        message,
        userData,
        fetching,
      }
    case GET_PROFILE_FAILURE:
      return {
        message,
        userData,
        fetching,
      }
    case UPDATE_PROFILE_REQUEST:
      return {
        message,
        userData,
        fetching,
      }
    case UPDATE_PROFILE_SUCCESS:
      return {
        message,
        userData,
        fetching,
      }
    case UPDATE_PROFILE_FAILURE:
      return {
        message,
        userData,
        fetching,
      }
    default:
      return state
  }
}
