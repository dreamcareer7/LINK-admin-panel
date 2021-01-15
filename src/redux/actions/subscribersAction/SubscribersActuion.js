import { errorNotification, successNotification } from '../../../constants/Toast';
import SUBSCRIBERS_REDUX_CONSTANTS from '../../constants/SubscribersConstant';
import SubscriberService from '../../../services/subscribers-services/SubScribersServices';

// eslint-disable-next-line import/prefer-default-export
export const getAllSubscribers = data => {
  return dispatch => {
    SubscriberService.getAllSubscribers(data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: SUBSCRIBERS_REDUX_CONSTANTS.GET_ALL_SUBSCRIBERS,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        console.log(e);
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const deleteSubscribers = subId => {
  return async dispatch => {
    SubscriberService.deleteSub(subId)
      .then(res => {
        if (res.data.status === 'SUCCESS') {
          dispatch({
            type: SUBSCRIBERS_REDUX_CONSTANTS.DELETE_SUBSCRIBERS,
            subId,
          });
          successNotification('Subscribers deleted successfully');
        }
      })
      .catch(() => errorNotification('Error during deleting Subscribers'));
  };
};
