/* eslint-disable import/prefer-default-export */
import QUOTE_REDUX_CONSTANTS from '../constants/QuoteReduxConstant';

export const allQuotes = (state = [], action) => {
  switch (action.type) {
    case QUOTE_REDUX_CONSTANTS.ALL_QUOTE:
      return action.data;

    case QUOTE_REDUX_CONSTANTS.DELETE_QUOTE:
      return state.filter(quote => quote._id !== action.id);

    case QUOTE_REDUX_CONSTANTS.ADD_QUOTE:
      return [...state, action.data];

    case QUOTE_REDUX_CONSTANTS.UPDATE_QUOTE:
      // eslint-disable-next-line no-case-declarations
      const findIndex = state.findIndex(e => e._id === action.data._id);
      // eslint-disable-next-line no-case-declarations
      const temp = [...state];
      temp[findIndex] = action.data;
      return temp;

    default:
      return state;
  }
};
export const selectedQuote = (state = null, action) => {
  switch (action.type) {
    case QUOTE_REDUX_CONSTANTS.SET_SELECTED_QUOTE_DATA:
      return action.data;

    default:
      return state;
  }
};
