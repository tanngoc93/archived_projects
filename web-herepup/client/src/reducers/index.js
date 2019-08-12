import { combineReducers } from 'redux';
import session from '../services/session/reducer';
import user from '../scenes/Users/services/reducer';
import product from '../scenes/Products/services/reducer';

// We combine the reducers here so that they
// can be left split apart above
const reducer = combineReducers({
  session,
  user,
  product
});

export default reducer;
