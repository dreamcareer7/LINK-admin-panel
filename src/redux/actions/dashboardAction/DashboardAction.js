import DashBoardService from '../../../services/dashboardServices/DashboardServices';
import DASHBOARD_REDUX_CONSTANTS from '../../constants/DashboardConstant';
import { errorNotification } from '../../../constants/Toast';

// eslint-disable-next-line import/prefer-default-export
export const subscriptionChartData = data => {
  return dispatch => {
    DashBoardService.subscriptionChartData(data)
      .then(response => {
        if (response?.data?.status === 'SUCCESS') {
          dispatch({
            type: DASHBOARD_REDUX_CONSTANTS.SUBSCRIPTION_CHART_DATA,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e?.response && e?.response?.data?.status === undefined) {
          errorNotification('Please try again later due to connectivity issues');
        } else if (e?.response && e?.response?.data?.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const companySizeChartData = data => {
  return dispatch => {
    DashBoardService.companySizeChartData(data)
      .then(response => {
        if (response?.data?.status === 'SUCCESS') {
          dispatch({
            type: DASHBOARD_REDUX_CONSTANTS.COMPANY_SIZE_CHART_DATA,
            data: response.data.data,
          });
        }
      })
      .catch(() => {
        errorNotification('Please try again later due to connectivity issues');
      });
  };
};

export const genderChartData = data => {
  return dispatch => {
    DashBoardService.genderChartData(data)
      .then(response => {
        if (response?.data?.status === 'SUCCESS') {
          dispatch({
            type: DASHBOARD_REDUX_CONSTANTS.GENDER_CHART_DATA,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e?.response && e?.response?.data?.status === undefined) {
          errorNotification('Please try again later due to connectivity issues');
        } else if (e?.response?.data?.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const industriesChartData = data => {
  return dispatch => {
    DashBoardService.industriesChartData(data)
      .then(response => {
        if (response?.data?.status === 'SUCCESS') {
          dispatch({
            type: DASHBOARD_REDUX_CONSTANTS.TOP10_INDUSTRIES_DATA,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e?.response?.data?.status === undefined) {
          errorNotification('Please try again later due to connectivity issues');
        } else if (e?.response?.data?.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const opportunityChartData = data => {
  return dispatch => {
    DashBoardService.opportunityChartData(data)
      .then(response => {
        if (response?.data?.status === 'SUCCESS') {
          dispatch({
            type: DASHBOARD_REDUX_CONSTANTS.OPPORTUNITY_STAGES,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e?.response?.data?.status === undefined) {
          errorNotification('Please try again later due to connectivity issues');
        } else if (e?.response && e?.response?.data?.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const dealChartData = data => {
  return dispatch => {
    DashBoardService.dealChartData(data)
      .then(response => {
        if (response?.data?.status === 'SUCCESS') {
          dispatch({
            type: DASHBOARD_REDUX_CONSTANTS.DEAL_VALUES_DATA,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e?.response && e?.response?.data?.status === undefined) {
          errorNotification('Please try again later due to connectivity issues');
        } else if (e?.response && e?.response?.data?.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
