import ADMIN_REDUX_CONSTANTS from "../../constants/ManageAdminConstant";

const toggleLoader = (value) => {
    return dispatch => {
        dispatch({
            type: ADMIN_REDUX_CONSTANTS.ENABLE_LOADER,
            data: value,
        });
    };
};

export {toggleLoader as default};