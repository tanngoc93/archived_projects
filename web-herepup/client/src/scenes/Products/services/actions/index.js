import { NEW_PRODUCT_REQUEST } from '../../../../constants';

// Calls the API to get a token and
// dispatches actions along the way
export function newProduct(product) {
	const actions = {
		type: NEW_PRODUCT_REQUEST,
		product,
		message: '',
		fetching: true
	}
	return actions;
}
