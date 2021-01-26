import DASHBOARD_REDUX_CONSTANTS from '../constants/DashboardConstant';

const initialValue = {
    dealValue: {
        data: [],
    },
    companyValue: {
        data: [],
    },
    genderValue: {
        data: [],
    },
    subscriptionValue: {
        data: [],
    },
    industriesValue: {
        data: [],
    },
    opportunityValue: {
        data: [],
    },
};
// eslint-disable-next-line import/prefer-default-export
export const dashboardReducer = (state = initialValue, action) => {
    switch (action.type) {
        case DASHBOARD_REDUX_CONSTANTS.DEAL_VALUES_DATA:
            return {
                ...state,
                dealValue: {
                    ...state.dealValue,
                    data: action.data,
                },
            };

        case DASHBOARD_REDUX_CONSTANTS.COMPANY_SIZE_CHART_DATA:
            return {
                ...state,
                companyValue: {
                    ...state.companyValue,
                    data: action.data,
                },
            };

        case DASHBOARD_REDUX_CONSTANTS.GENDER_CHART_DATA:
            return {
                ...state,
                genderValue: {
                    ...state.genderValue,
                    data: action.data,
                },
            };

        case DASHBOARD_REDUX_CONSTANTS.SUBSCRIPTION_CHART_DATA:
            return {
                ...state,
                subscriptionValue: {
                    ...state.subscriptionValue,
                    data: action.data,
                },
            };

        case DASHBOARD_REDUX_CONSTANTS.TOP10_INDUSTRIES_DATA:
            return {
                ...state,
                industriesValue: {
                    ...state.industriesValue,
                    data: action.data,
                },
            };

        case DASHBOARD_REDUX_CONSTANTS.OPPORTUNITY_STAGES:
            return {
                ...state,
                opportunityValue: {
                    ...state.opportunityValue,
                    data: action.data,
                },
            };

        default:
            return state;
    }
};
