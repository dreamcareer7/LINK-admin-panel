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
          errorNotification('It seems like server is down, Please try after sometime');
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
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response && e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const getInviteeSubscribers = data => {
  return dispatch => {
    SubscriberService.getInvitee(data)
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
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response && e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
export const addInvitee = (data, cb) => {
  return dispatch => {
    SubscriberService.addInvitee(data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: SUBSCRIBERS_REDUX_CONSTANTS.ADD_INVITEE_SUBSCRIBER,
            data: response.data.data,
          });
          successNotification('Invite sent successfully');
          cb();
        }
      })
      .catch(e => {
        if (e.response && e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response.data.status === 'ALREADY_SENT') {
          errorNotification('Subscriber or invitee already exists with this email');
        } else if (e.response && e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
export const deleteInvitee = id => {
  return async dispatch => {
    try {
      const response = await SubscriberService.deleteInvitee(id);

      if (response.data.status === 'SUCCESS') {
        dispatch({
          type: SUBSCRIBERS_REDUX_CONSTANTS.DELETE_INVITEE_SUBSCRIBER,
          data: response.data.data,
        });
        successNotification('Invitee deleted successfully');
      }
    } catch (e) {
      if (e.response && e.response.data.status === undefined) {
        errorNotification('It seems like server is down, Please try after sometime');
      } else if (e.response && e.response.data.status === 'INTERNAL_SERVER_ERROR') {
        errorNotification('Internal server error');
      }
    }
  };
};
export const editInvitee = id => {
  return dispatch => {
    SubscriberService.editInvitee(id)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: SUBSCRIBERS_REDUX_CONSTANTS.EDIT_INVITEE_BY_ID,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e.response && e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response && e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
export const updateInvitee = (id, data, cb) => {
  return () => {
    SubscriberService.updateInvitee(id, data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          if (cb) {
            cb();
            successNotification('Invitee details updated successfully')
          }
        }
      })
      .catch(e => {
        if (e.response && e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime');
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
          errorNotification('It seems like server is down, Please try after sometime');
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
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response && e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const updateSubscribers = (id, data, cb) => {
  return dispatch => {
    SubscriberService.updateSub(id, data)
      .then(res => {
        if (res.data.status === 'SUCCESS') {
          dispatch({
            type: SUBSCRIBERS_REDUX_CONSTANTS.UPDATE_SUBSCRIBERS,
            data: res.data,
          });
          successNotification('Subscriber updated successfully');
          if (cb) {
            cb();
          }
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
          successNotification('Subscriber deleted successfully');
        }
      })
      .catch(() => {
        errorNotification('Error during deleting Subscribers');
      });
  };
};
