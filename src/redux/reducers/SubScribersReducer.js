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
      return { ...state, docs: state.docs.filter(sub => sub._id !== action.subId) };

    case SUBSCRIBERS_REDUX_CONSTANTS.DELETE_SUBSCRIBERS:
      return state;

    default:
      return state;
  }
};
