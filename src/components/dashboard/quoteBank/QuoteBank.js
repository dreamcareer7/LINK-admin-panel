import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './quoteBank.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuotes } from '../../../redux/actions/authActions/QuoteActions';
import Quote from './Quote';

function QuoteBank() {
  const quotes = useSelector(({ allQuotes }) => allQuotes);
  // const [data, setData] = useState(quotes);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllQuotes);
  }, []);

  const onClickAddQuote = () => {
    history.replace('/quote');
  };

  return (
    <div>
      <div className="action-container">
        <div className="actions">
          <div className="filters">
            <div className="filter">
              <div className="filter-label">Status</div>
              <div className="filter-action">
                <select>
                  <option value="All">All</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
            <div className="filter">
              <div className="filter-label">Sorting</div>
              <div className="filter-action">
                <select>
                  <option value="Recent">Recent</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
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
      <div className="quote-table">
        <div className="tr heading">
          <div className="td quote">Quote</div>
          <div className="td author">Author</div>
          <div className="td tags">Tags</div>
          <div className="td status">Status</div>
          <div className="td action" />
        </div>
        {quotes.map(quote => (
          <Quote key={quote._id} quote={quote} />
        ))}
      </div>
    </div>
  );
}

export default QuoteBank;
