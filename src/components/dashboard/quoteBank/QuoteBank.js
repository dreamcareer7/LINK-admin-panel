import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import './quoteBank.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuotes } from '../../../redux/actions/authActions/QuoteActions';
import Quote from './Quote';
import { useQuery } from '../../../helpers/GetQueryParamHook';

function QuoteBank() {
  const allQuotesData = useSelector(({ allQuotes }) => allQuotes);
  const [sorting, setSorting] = useState('RECENT');
  const [status, setStatus] = useState('all');
  const [pageNum, setPageNum] = useState(1);

  const quotes = useMemo(() => (allQuotesData && allQuotesData.docs ? allQuotesData.docs : []), [
    allQuotesData,
  ]);

  const [data, setData] = useState(quotes);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    const statusParam = query.get('status');
    const sort = query.get('sort');
    const page = query.get('page');
    dispatch(getAllQuotes(page, sort, statusParam !== 'all' ? statusParam : undefined));
    setPageNum(page);
    setStatus(statusParam);
    setSorting(sort);
  }, []);

  useEffect(() => {
    setData(quotes);
  }, [quotes]);

  useEffect(() => {
    const params = new URLSearchParams();

    params.append('sort', sorting);
    params.append('status', status);
    params.append('page', pageNum);
    history.push({ search: params.toString() });
  }, [sorting, status, pageNum, history]);

  const handlePageChange = page => {
    setPageNum(page);
    dispatch(getAllQuotes(page, sorting, status !== 'all' ? status : undefined));
  };
  const handleSortChange = e => {
    setSorting(e.target.value);
    dispatch(getAllQuotes(1, e.target.value, status !== 'all' ? status : undefined));
    setPageNum(1);
  };
  const handleStatusFilter = e => {
    if (e.target.value !== 'all') {
      dispatch(getAllQuotes(1, sorting, e.target.value));
    } else {
      dispatch(getAllQuotes(1, sorting));
    }
    setStatus(e.target.value);
    setPageNum(1);
  };

  const activePage = useMemo(() => (allQuotesData && allQuotesData.page ? allQuotesData.page : 1), [
    allQuotesData,
  ]);

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
                <select value={status} onChange={e => handleStatusFilter(e)}>
                  <option value="all">All</option>
                  <option value="true">Active</option>
                  <option value="false">InActive</option>
                </select>
              </div>
            </div>
            <div className="filter">
              <div className="filter-label">Sorting</div>
              <div className="filter-action">
                <select onChange={e => handleSortChange(e)} value={sorting}>
                  <option value="OLD">Ascending</option>
                  <option value="RECENT">Descending</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <div className="button success-button add-quot-btn" onClick={onClickAddQuote}>
            ADD QUOTE
          </div>
        </div>
      </div>
      {quotes.length !== 0 && (
        <div className="no-of-results-in-display">
          Showing {(allQuotesData.page - 1) * allQuotesData.limit + 1} to{' '}
          {allQuotesData.total % allQuotesData.limit < allQuotesData.limit
            ? allQuotesData.total
            : allQuotesData.page * allQuotesData.limit}{' '}
          of {allQuotesData.total} results
        </div>
      )}
      {quotes.length !== 0 ? (
        <>
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
          <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={allQuotesData.total || 1}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </>
      ) : (
        <div className="row-container">
          <div style={{ textAlign: 'center', marginTop: '5vh' }}>Empty Data</div>
        </div>
      )}
    </div>
  );
}

export default QuoteBank;
