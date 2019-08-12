import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import { signinUserWatcher, signoutUserWatcher } from '../services/session/sagas';

import { 
  signupUserWatcher,
  getProfileWatcher,
  updateProfileWatcher } from '../scenes/Users/services/sagas';

import { 
	newProductWatcher } from '../scenes/Products/services/sagas';

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(signinUserWatcher);
  sagaMiddleware.run(signoutUserWatcher);
  sagaMiddleware.run(signupUserWatcher);
  sagaMiddleware.run(getProfileWatcher);
  sagaMiddleware.run(updateProfileWatcher);
  sagaMiddleware.run(newProductWatcher);

  return store;
}

export default configureStore;
