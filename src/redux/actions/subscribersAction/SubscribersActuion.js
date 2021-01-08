import { errorNotification } from '../../../constants/Toast';
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
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
