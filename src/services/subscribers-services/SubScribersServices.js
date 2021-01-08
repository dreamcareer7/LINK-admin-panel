import { SUBSCRIBERS_URLS } from '../../constants/UrlConstant';
import ApiService from '../api-service/ApiService';

const SubscriberService = {
  getAllSubscribers: data =>
    ApiService.getData(
      `${SUBSCRIBERS_URLS.GET_ALL_SUBSCRIBERS}?page=${data.page}&limit=${data.limit}`
    ),
};

export default SubscriberService;
