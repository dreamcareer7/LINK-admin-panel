import axios from 'axios';
import { API_METHODS, SETTING_URLS } from '../../constants/UrlConstant';

const SettingService = {
  errorMessage: token => {
    return axios({
      method: API_METHODS.GET,
      url: SETTING_URLS.GET_ERROR_MESSAGE,
      headers: { authorization: token },
    });
  },
};

export default SettingService;
