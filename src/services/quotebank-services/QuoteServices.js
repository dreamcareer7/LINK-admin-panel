import { QUOTE_URLS } from '../../constants/UrlConstant';
import ApiService from '../api-service/ApiService';

const QuoteServices = {
  getAllQuotes: (page, limit,sorting,status) =>
    ApiService.getData(`${QUOTE_URLS.ALL_QUOTE_URL}?page=${page}&limit=${limit}&sorting=${sorting}${status?`&status=${status}`:''}`),
  setPublishedStatus: (status, id) =>
    ApiService.putData(QUOTE_URLS.SET_PUBLISHED_STATUS_URL + id, { isPublished: status }),
  deleteQuote: id => ApiService.deleteData(QUOTE_URLS.DELETE_QUOTE_URL + id),
  addQuote: data => ApiService.postData(QUOTE_URLS.ADD_QUOTE_URL, data),
  updateQuote: (id, data) => ApiService.putData(QUOTE_URLS.UPDATE_QUOTE_URL + id, data),
  getSingleQuote: id => ApiService.getData(QUOTE_URLS.GET_SINGLE_QUOTE_URL + id),
};
export default QuoteServices;
