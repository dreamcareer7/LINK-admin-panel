import { errorNotification, successNotification } from '../../../constants/Toast';
import QuoteServices from '../../../services/auth-services/QuoteServices';
import QUOTE_REDUX_CONSTANTS from '../../constants/QuoteReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const getAllQuotes = dispatch => {
  QuoteServices.getAllQuotes()
    .then(response => {
      console.log('quote response->', response);
      if (response.data.status === 'SUCCESS') {
        dispatch({
          type: QUOTE_REDUX_CONSTANTS.ALL_QUOTE,
          data: response.data.data,
        });
        successNotification('Login successfully');
      }
    })
    .catch(e => {
      if (e.response.data.status === undefined) {
        errorNotification('It seems like server is down, Please try after sometime.');
      } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
        errorNotification('Internal server error');
      }
    });
};

export const deleteQuote = id => {
  return dispatch => {
    QuoteServices.deleteQuote(id)
      .then(() => {
        dispatch({
          type: QUOTE_REDUX_CONSTANTS.DELETE_QUOTE,
          id,
        });
        successNotification('Quote deleted successfully');
      })
      .catch(() => errorNotification('Error during deleting quote'));
  };
};
