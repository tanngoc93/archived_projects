import {
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAILURE } from '../../../../constants';

let initState = {
  productData: null,
  fetching: false,
  message: '',
}

export default (state = initState, action) => {
	const { message, productData, fetching, } = action;

	switch (action.type) {
		case NEW_PRODUCT_REQUEST:
      return {
        message,
        productData,
        fetching,
      }
    case NEW_PRODUCT_SUCCESS:
      return {
        message,
        productData,
        fetching,
      }
    case NEW_PRODUCT_FAILURE:
      return {
        message,
        productData,
        fetching,
      }
    default:
      return state
	}
}