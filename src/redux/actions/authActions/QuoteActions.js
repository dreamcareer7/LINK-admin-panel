import { errorNotification, successNotification } from '../../../constants/Toast';
import QuoteServices from '../../../services/quotebank-services/QuoteServices';
import QUOTE_REDUX_CONSTANTS from '../../constants/QuoteReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const getAllQuotes = dispatch => {
  QuoteServices.getAllQuotes(1, 500)
    .then(response => {
      if (response.data.status === 'SUCCESS') {
        dispatch({
          type: QUOTE_REDUX_CONSTANTS.ALL_QUOTE,
          data: response.data.data,
        });
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
      .catch(e => {
        console.log(e);
        errorNotification('Error during deleting quote');
      });
  };
};
export const getSingleQuote = id => {
  return dispatch => {
    QuoteServices.getSingleQuote(id)
      .then(response => {
        dispatch({
          type: QUOTE_REDUX_CONSTANTS.SET_SELECTED_QUOTE_DATA,
          data: response.data.data,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };
};

export const addQuote = data => {
  return dispatch => {
    QuoteServices.addQuote(data)
      .then(res => {
        dispatch({
          type: QUOTE_REDUX_CONSTANTS.ADD_QUOTE,
          data: res.data.data,
        });
        successNotification('Quote added successfully');
      })
      .catch(() => errorNotification('Error during adding quote'));
  };
};
export const updateQuote = (id, data) => {
  return dispatch => {
    QuoteServices.updateQuote(id, data)
      .then(res => {
        dispatch({
          type: QUOTE_REDUX_CONSTANTS.UPDATE_QUOTE,
          data: res.data,
        });
        successNotification('Quote updated successfully');
      })
      .catch(() => errorNotification('Error during updating quote'));
  };
};

export const setSelectedQuoteData = data => {
  return dispatch => {
    dispatch({
      type: QUOTE_REDUX_CONSTANTS.SET_SELECTED_QUOTE_DATA,
      data,
    });
  };
};
