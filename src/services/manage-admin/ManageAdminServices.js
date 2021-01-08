import { MANAGE_ADMIN_URLS } from '../../constants/UrlConstant';
import ApiService from '../api-service/ApiService';

const ManageAdminService = {
  getAllAdmins: () => ApiService.getData(MANAGE_ADMIN_URLS.GET_ALL_ADMIN),
  getAdmin: id => ApiService.getData(MANAGE_ADMIN_URLS.GET_ADMIN + id),
  addAdmin: data => ApiService.postData(MANAGE_ADMIN_URLS.ADD_ADMIN, data),
  editAdmin: (id, data) => ApiService.putData(MANAGE_ADMIN_URLS.UPDATE_ADMIN + id, data),
  deleteUser: id => ApiService.deleteData(MANAGE_ADMIN_URLS.DELETE_ADMIN + id),
  generate2FA: () => ApiService.getData(MANAGE_ADMIN_URLS.GENERATE_2FA),
};

export default ManageAdminService;
