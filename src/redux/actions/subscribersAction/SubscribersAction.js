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
        if (e.response && e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response && e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const getIndutries = data => {
  return dispatch => {
    SubscriberService.getIndustry(data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: SUBSCRIBERS_REDUX_CONSTANTS.GET_INDUSTRIES,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e.response && e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response && e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const getInviteeSubscribers = page => {
  return dispatch => {
    SubscriberService.getInvitee(page, 10)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: SUBSCRIBERS_REDUX_CONSTANTS.INVITEE_SUBSCRIBERS,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e.response && e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response && e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
export const addInvitee = data => {
  return dispatch => {
    SubscriberService.addInvitee(data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: SUBSCRIBERS_REDUX_CONSTANTS.ADD_INVITEE_SUBSCRIBER,
            data: response.data.data,
          });
          successNotification('Invitee added successfully');
        }
      })
      .catch(e => {
        if (e.response && e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response && e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
export const deleteInvitee = id => {
  return dispatch => {
    SubscriberService.deleteInvitee(id)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: SUBSCRIBERS_REDUX_CONSTANTS.DELETE_INVITEE_SUBSCRIBER,
            data: response.data.data,
          });
          successNotification('Invitee deleted successfully');
        }
      })
      .catch(e => {
        if (e.response && e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response && e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const getCompanySize = data => {
  return dispatch => {
    SubscriberService.getCompany(data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: SUBSCRIBERS_REDUX_CONSTANTS.GET_COMPANY_SIZE,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e.response && e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response && e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const getSubscribersById = id => {
  return dispatch => {
    SubscriberService.getSubById(id)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: SUBSCRIBERS_REDUX_CONSTANTS.GET_SUBSCRIBERS_BYID,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e.response && e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response && e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const updateSubscribers = (id, data) => {
  return dispatch => {
    SubscriberService.updateSub(id, data)
      .then(res => {
        if (res.data.status === 'SUCCESS') {
          dispatch({
            type: SUBSCRIBERS_REDUX_CONSTANTS.UPDATE_SUBSCRIBERS,
            data: res.data,
          });
          successNotification('Subscribers updated successfully');
        }
      })
      .catch(() => {
        errorNotification('Error during updating Subscribers');
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
      .catch(() => {
        errorNotification('Error during deleting Subscribers');
      });
  };
};
