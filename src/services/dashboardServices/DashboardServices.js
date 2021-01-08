import { DASHBOARD_URLS } from '../../constants/UrlConstant';
import ApiService from '../api-service/ApiService';

const DashBoardService = {
  subscriptionChartData: data => ApiService.putData(DASHBOARD_URLS.SUBSCRIPTION_VALUE_DATA, data),
  companySizeChartData: data => ApiService.putData(DASHBOARD_URLS.COMPANY_VALUE_DATA, data),
  genderChartData: data => ApiService.putData(DASHBOARD_URLS.GENDER_VALUE_DATA, data),
  industriesChartData: data => ApiService.putData(DASHBOARD_URLS.INDUSTRIES_VALUE_DATA, data),
  opportunityChartData: data => ApiService.putData(DASHBOARD_URLS.OPPORTUNITY_VALUE_DATA, data),
  dealChartData: data => ApiService.putData(DASHBOARD_URLS.DEAL_VALUE_DATA, data),
};

export default DashBoardService;
