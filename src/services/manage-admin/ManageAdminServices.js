import axios from 'axios';
import { API_METHODS, MANAGE_ADMIN_URLS } from '../../constants/UrlConstant';

const ManageAdminService = {
  manageAdmin: token => {
    return axios({
      method: API_METHODS.GET,
      url: MANAGE_ADMIN_URLS.GET_ALL_ADMIN,
      headers: { authorization: token },
    });
  },
  deleteAdmin: (token, userId) => {
    return axios({
      method: API_METHODS.DELETE,
      url: `${MANAGE_ADMIN_URLS.GET_ALL_ADMIN}${userId}`,
      headers: { authorization: token },
    });
  },
};

export default ManageAdminService;
