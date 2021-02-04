import { SUBSCRIBERS_URLS } from '../../constants/UrlConstant';
import ApiService from '../api-service/ApiService';

const SubscriberService = {
  getAllSubscribers: ({
    page = 1,
    limit = 10,
    sorting = 'DESC',
    startDate,
    endDate,
    subscriptionType,
  }) =>
    ApiService.getData(
      `${SUBSCRIBERS_URLS.GET_ALL_SUBSCRIBERS}?page=${page}&limit=${limit}&sortOrder=${sorting}${
        startDate ? `&startDate=${startDate}` : ''
      }${endDate ? `&endDate=${endDate}` : ''}${
        subscriptionType ? `&subscriptionType=${subscriptionType}` : ''
      }`
    ),
  getIndustry: () => ApiService.getData(SUBSCRIBERS_URLS.GET_INDUSTRY),
  getInvitee: ({ page = 1, limit = 10, sorting = 'DESC', startDate, endDate, searchText }) =>
    ApiService.getData(
      `${SUBSCRIBERS_URLS.INVITEE_SUBSCRIBERS}?page=${page}&limit=${limit}&sortOrder=${sorting}${
        startDate ? `&startDate=${startDate}` : ''
      }${endDate ? `&endDate=${endDate}` : ''}${searchText ? `&searchText=${searchText}` : ''}`
    ),
  addInvitee: data => ApiService.postData(`${SUBSCRIBERS_URLS.ADD_INVITED_SUBSCRIBERS}`, data),
  getCompany: () => ApiService.getData(SUBSCRIBERS_URLS.GET_COMPANY_SIZE),
  getSubById: id => ApiService.getData(SUBSCRIBERS_URLS.GET_SUBSCRIPTION_BYID + id),
  updateSub: (id, data) => ApiService.putData(SUBSCRIBERS_URLS.UPDATE_SUBSCRIPTION + id, data),
  deleteSub: id => ApiService.deleteData(SUBSCRIBERS_URLS.DELETE_SUBSCRIPTION + id),
  downloadSubscriber: () => ApiService.getData(SUBSCRIBERS_URLS.DOWNLOAD_SUBSCRIBERS),
  downloadInvitees: () => ApiService.getData(SUBSCRIBERS_URLS.DOWNLOAD_INVITEES),
  searchSubscriber: name => ApiService.putData(SUBSCRIBERS_URLS.SEARCH_SUBSCRIBERS, name),
  deleteInvitee: id => ApiService.deleteData(SUBSCRIBERS_URLS.DELETE_INVITEE + id),
};

export default SubscriberService;
