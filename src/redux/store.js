import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {loadingBarMiddleware} from 'react-redux-loading-bar';
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from './reducers/RootReducer';

export const store = createStore(
    rootReducer,

    composeWithDevTools(applyMiddleware(
        thunkMiddleware,
        loadingBarMiddleware({
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
        })
        )
    ));
export default store;
