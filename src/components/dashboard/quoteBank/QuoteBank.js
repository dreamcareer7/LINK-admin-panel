import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './quoteBank.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuotes } from '../../../redux/actions/authActions/QuoteActions';
import Quote from './Quote';

function QuoteBank() {
  const allQuotesData = useSelector(({ allQuotes }) => allQuotes);
  const quotes = allQuotesData && allQuotesData.docs ? allQuotesData.docs : [];
  const [data, setData] = useState(quotes);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getAllQuotes);
  }, []);
  useEffect(() => {
    setData(quotes);
  }, [quotes]);

  const onClickAddQuote = () => {
    history.replace('/quote');
  };

  const applyStatusFilter = event => {
    switch (event.target.value) {
      case 'true':
        // eslint-disable-next-line no-case-declarations
        const activeQuotes = quotes.filter(e => e.isPublished === true);
        setData(activeQuotes);
        break;
      case 'false':
        // eslint-disable-next-line no-case-declarations
        const inActiveQuotes = quotes.filter(e => e.isPublished === false);
        setData(inActiveQuotes);
        break;
      default:
        setData(quotes);
    }
  };

  return (
    <div>
      <div className="action-container">
        <div className="actions">
          <div className="filters">
            <div className="filter">
              <div className="filter-label">Status</div>
              <div className="filter-action">
                <select onChange={applyStatusFilter}>
                  <option value="all">All</option>
                  <option value="true">Active</option>
                  <option value="false">InActive</option>
                </select>
              </div>
            </div>
            <div className="filter">
              <div className="filter-label">Sorting</div>
              <div className="filter-action">
                <select>
                  <option value="asc">Ascending</option>
                  <option value="dsc">Descending</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <div className="button success-button" onClick={onClickAddQuote}>
            ADD QUOTE
          </div>
        </div>
      </div>

      <div className="no-of-results-in-display">Showing 1-20 of 357 results</div>
      {quotes.length !== 0 ? (
        <div className="quote-table">
          <div className="tr heading">
            <div className="td quote">Quote</div>
            <div className="td author">Author</div>
            <div className="td tags">Tags</div>
            <div className="td status">Status</div>
            <div className="td action" />
          </div>
          {data && data.map(quote => <Quote key={quote._id} quote={quote} />)}
        </div>
      ) : (
        <div>No quote data available</div>
      )}
    </div>
  );
}

export default QuoteBank;
