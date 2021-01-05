import { QUOTE_URLS } from '../../constants/UrlConstant';
import ApiService from '../api-service/ApiService';

const QuoteServices = {
  getAllQuotes: (page, limit) =>
    ApiService.getData(`${QUOTE_URLS.ALL_QUOTE_URL}?page=${page}&limit=${limit}`),
  setPublishedStatus: (status, id) =>
    ApiService.putData(QUOTE_URLS.SET_PUBLISHED_STATUS_URL + id, { isPublished: status }),
  deleteQuote: id => ApiService.deleteData(QUOTE_URLS.DELETE_QUOTE_URL + id),
  addQuote: data => ApiService.postData(QUOTE_URLS.ADD_QUOTE_URL, data),
  updateQuote: (id, data) => ApiService.putData(QUOTE_URLS.UPDATE_QUOTE_URL + id, data),
};
export default QuoteServices;
