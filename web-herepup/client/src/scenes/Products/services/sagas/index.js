import { call, put, takeEvery } from 'redux-saga/effects';
import { newProductApi } from '../api';

import { 
  NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAILURE
} from '../../../../constants';

function *newProduct(action) {
	try {
	  const { product } = yield call(newProductApi, action.product);
	  yield put({
	    type: NEW_PRODUCT_SUCCESS, 
	    message: '',
	    fetching: false,
	    productData: product,
	  });
	} catch (e) {
	  yield put({
	    type: NEW_PRODUCT_FAILURE,
	    message: e.message,
	    fetching: false,
	    productData: null,
	  });
	}
}

/*************************************************************/
/*************************************************************/
/*************************************************************/

function *newProductWatcher() {
  yield takeEvery(NEW_PRODUCT_REQUEST, newProduct);
}

export { newProductWatcher };