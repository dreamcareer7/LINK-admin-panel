import { MANAGE_ADMIN_URLS } from '../../constants/UrlConstant';
import ApiService from '../api-service/ApiService';

const ManageAdminService = {
  getAllAdmins: () => ApiService.getData(MANAGE_ADMIN_URLS.GET_ALL_ADMIN),
  deleteUser: id => ApiService.deleteData(MANAGE_ADMIN_URLS.DELETE_ADMIN + id),
};

export default ManageAdminService;
