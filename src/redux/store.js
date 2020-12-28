import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));


export default  store;