import axios from 'axios';
import { API_METHODS, MANAGE_ADMIN_URLS } from '../../constants/UrlConstant';
import ApiService from '../api-service/ApiService';

const ManageAdminService = {
  manageAdmin: token => {
    return axios({
      method: API_METHODS.GET,
      url: MANAGE_ADMIN_URLS.GET_ALL_ADMIN,
      headers: { authorization: token },
    });
  },
  deleteUser: id => ApiService.deleteData(MANAGE_ADMIN_URLS.DELETE_ADMIN + id),
};

export default ManageAdminService;
