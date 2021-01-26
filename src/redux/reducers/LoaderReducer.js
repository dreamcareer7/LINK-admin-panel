import ADMIN_REDUX_CONSTANTS from '../constants/ManageAdminConstant';

// eslint-disable-next-line import/prefer-default-export
export const LoaderReducer = (state = false, action) => {
    switch (action.type) {
        case ADMIN_REDUX_CONSTANTS.ENABLE_LOADER:
            return action.data;

        default:
            return state;
    }
};
