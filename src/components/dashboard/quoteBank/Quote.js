/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import edit from '../../../assets/images/pencil.png';
import bin from '../../../assets/images/delete.png';
import QuoteServices from '../../../services/quotebank-services/QuoteServices';
import { errorNotification } from '../../../constants/Toast';
import {
  deleteQuote,
  getAllQuotes,
  setSelectedQuoteData,
} from '../../../redux/actions/authActions/QuoteActions';
import QUOTE_REDUX_CONSTANTS from '../../../redux/constants/QuoteReduxConstant';
import { useQuery } from '../../../helpers/GetQueryParamHook';
import Modal from '../../commonComponents/Modal/Modal';

function Quote({ quote }) {
  const [isSelected, setIsSelected] = useState(
    quote && quote.isPublished ? quote.isPublished.toString() : 'false'
  );
  const [isModelOpen, setIsModelOpen] = useState(false);
  const history = useHistory();
  const query = useQuery();
  const status = query.get('status');
  const sort = query.get('sort');
  const page = query.get('page');
  useEffect(() => {
    setIsSelected(quote.isPublished);
  }, [quote.isPublished]);

  const dispatch = useDispatch();
  const onClickEditQuote = () => {
    dispatch(setSelectedQuoteData(quote));
    history.push(`/quote/${quote._id}`);
  };

  const onChangeStatus = async e => {
    setIsSelected(e.target.value);
    try {
      await QuoteServices.setPublishedStatus(e.target.value, quote._id);
      dispatch({
        type: QUOTE_REDUX_CONSTANTS.UPDATE_QUOTE,
        data: { ...quote, isPublished: e.target.value },
      });
      dispatch(getAllQuotes(page, sort, status));
    } catch {
      errorNotification('Could not update status');
    }
  };
  const onClickDeleteQuote = () => {
    setIsModelOpen(true);
  };
  const onClosePopup = () => {
    setIsModelOpen(false);
  };
  const onDeleteData = () => {
    setIsModelOpen(false);
    dispatch(deleteQuote(quote._id));
  };

  return (
    <div className="tr-container">
      {isModelOpen && (
        <Modal
          description="Are you sure you want to delete Opportunity?"
          title="Delete Opportunity"
          deleteData={onDeleteData}
          onClosePopup={onClosePopup}
        />
      )}
      <div className="tr">
        <div className="td quote">{quote.quote}</div>
        <div className="td author font-400">{quote.quoteBy}</div>
        <div className="td tags">
          <div className="tag-container">
            {quote &&
              quote.tags &&
              quote.tags.map((tag, index) =>
                index < 4 ? (
                  <span key={tag._id} className="tag">
                    {tag.tag}
                  </span>
                ) : null
              )}
          </div>
        </div>
        <div className="td status">
          <select value={isSelected} onChange={onChangeStatus}>
            <option value="true">Active</option>
            <option value="false">InActive</option>
          </select>
        </div>
        <div className="td action">
          <img className="mr-5" src={edit} onClick={onClickEditQuote} />
          <img src={bin} onClick={onClickDeleteQuote} />
        </div>
      </div>
    </div>
  );
}
Quote.propTypes = {
  quote: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired,
    quoteBy: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf({ tag: PropTypes.string.isRequired }).isRequired,
    isPublished: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Quote;
