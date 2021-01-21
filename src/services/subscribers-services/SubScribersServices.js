import { SUBSCRIBERS_URLS } from '../../constants/UrlConstant';
import ApiService from '../api-service/ApiService';

const SubscriberService = {
  getAllSubscribers: (page,limit) =>
    ApiService.getData(
      `${SUBSCRIBERS_URLS.GET_ALL_SUBSCRIBERS}?page=${page}&limit=${limit}`
    ),
  getIndustry: () => ApiService.getData(SUBSCRIBERS_URLS.GET_INDUSTRY),
  getInvitee: (page,limit) => ApiService.getData(`${SUBSCRIBERS_URLS.INVITEE_SUBSCRIBERS}?page=${page}&limit=${limit}`),
  addInvitee:data => ApiService.postData(`${SUBSCRIBERS_URLS.ADD_INVITED_SUBSCRIBERS}`,data),
  getCompany: () => ApiService.getData(SUBSCRIBERS_URLS.GET_COMPANY_SIZE),
  getSubById: id => ApiService.getData(SUBSCRIBERS_URLS.GET_SUBSCRIPTION_BYID + id),
  updateSub: (id, data) => ApiService.putData(SUBSCRIBERS_URLS.UPDATE_SUBSCRIPTION + id, data),
  deleteSub: id => ApiService.deleteData(SUBSCRIBERS_URLS.DELETE_SUBSCRIPTION + id),
};

export default SubscriberService;
