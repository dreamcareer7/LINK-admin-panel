import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootReducer from './reducers/RootReducer';

export const store = createStore(
  rootReducer,

  applyMiddleware(
    thunkMiddleware,
    loadingBarMiddleware({
      promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
    })
  )
);
export default store;
