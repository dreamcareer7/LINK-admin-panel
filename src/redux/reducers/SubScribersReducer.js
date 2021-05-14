// import AUTH_REDUX_CONSTANTS from '../constants/AuthReduxConstant';
import SUBSCRIBERS_REDUX_CONSTANTS from '../constants/SubscribersConstant';

const initialValue = {
  getAllSub: {
    data: [],
  },
  getById: {
    data: [],
  },
  industries: {
    data: [],
  },
  company: {
    data: [],
  },
  invite: {
    data: [],
  },
  invitee: {
    data: [],
  },
};
// eslint-disable-next-line import/prefer-default-export
export const subscrberReducer = (state = initialValue, action) => {
  switch (action.type) {
    case SUBSCRIBERS_REDUX_CONSTANTS.GET_ALL_SUBSCRIBERS:
      return {
        ...state,
        getAllSub: {
          ...state.getAllSub,
          data: action.data,
        },
      };

    case SUBSCRIBERS_REDUX_CONSTANTS.INVITEE_SUBSCRIBERS:
      return {
        ...state,
        invite: {
          ...state.invite,
          data: action.data,
        },
      };

    case SUBSCRIBERS_REDUX_CONSTANTS.ADD_INVITEE_SUBSCRIBER:
      return {
        ...state,
        invitee: {
          ...state.invitee,
          data: action.data,
        },
      };

    case SUBSCRIBERS_REDUX_CONSTANTS.DELETE_INVITEE_SUBSCRIBER:
      return {
        ...state,
        invitee: {
          ...state.invitee,
          data: action.data,
        },
      };

    case SUBSCRIBERS_REDUX_CONSTANTS.GET_SUBSCRIBERS_BYID:
      return {
        ...state,
        getById: {
          ...state.getById,
          data: action.data,
        },
      };

    case SUBSCRIBERS_REDUX_CONSTANTS.GET_INDUSTRIES:
      return {
        ...state,
        industries: {
          ...state.industries,
          data: action.data,
        },
      };

    case SUBSCRIBERS_REDUX_CONSTANTS.GET_COMPANY_SIZE:
      return {
        ...state,
        company: {
          ...state.company,
          data: action.data,
        },
      };

    case SUBSCRIBERS_REDUX_CONSTANTS.UPDATE_SUBSCRIBERS:
      return {
        ...state,
        getAllSub: {
          ...state.getAllSub,
          data: {
            ...state.getAllSub.data,
            docs: state.getAllSub.data.docs
              ? state.getAllSub.data.docs.map(e => (e._id === action.data._id ? action.data : e))
              : state.getAllSub.data.docs,
          },
        },
      };

    case SUBSCRIBERS_REDUX_CONSTANTS.DELETE_SUBSCRIBERS:
      return {
        ...state,
        getAllSub: {
          ...state.getAllSub,
          data: {
            ...state.getAllSub.data,
            docs: state.getAllSub.data.docs.filter(e => e._id !== action.subId),
          },
        },
      };

    case SUBSCRIBERS_REDUX_CONSTANTS.RESET_SUBSCRIBER_INFO:
      return {
        ...state.initialValue
      }

    default:
      return state;
  }
};
export const selectedInvitee = (state = null, action) => {
  switch (action.type) {
    case SUBSCRIBERS_REDUX_CONSTANTS.EDIT_INVITEE_BY_ID:
      return action.data;
    default:
      return state;
  }
};
