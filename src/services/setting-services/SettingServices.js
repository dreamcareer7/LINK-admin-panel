import { SETTING_URLS } from '../../constants/UrlConstant';
import ApiService from '../api-service/ApiService';

const SettingService = {
  getAllErrorMessage: () => ApiService.getData(SETTING_URLS.GET_ERROR_MESSAGE),
  updateErrorMessage: data => ApiService.putData(SETTING_URLS.UPDATE_ERROR_MESSAGE, data),
};

export default SettingService;
