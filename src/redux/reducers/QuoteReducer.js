import QUOTE_REDUX_CONSTANTS from '../constants/QuoteReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const allQuotes = (state = [], action) => {
  switch (action.type) {
    case QUOTE_REDUX_CONSTANTS.ALL_QUOTE:
      return action.data;

    case QUOTE_REDUX_CONSTANTS.DELETE_QUOTE:
      return state.filter(quote => quote._id !== action.id);

    default:
      return state;
  }
};
