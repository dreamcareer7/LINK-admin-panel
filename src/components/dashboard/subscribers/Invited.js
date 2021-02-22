import React, { useEffect, useMemo, useState } from 'react';
import './Invited.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import User from '../../../assets/images/user.jpg';
import {
  deleteInvitee,
  getInviteeSubscribers,
} from '../../../redux/actions/subscribersAction/SubscribersAction';
import bin from '../../../assets/images/delete.png';
import { errorNotification } from '../../../constants/Toast';
import edit from '../../../assets/images/pencil.png';
import Modal from '../../commonComponents/Modal/Modal';

const Invited = () => {
  const dispatch = useDispatch();
  const allInvitee = useSelector(state => state.subscrberReducer.invite);
  const [pageNum, setPageNum] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sorting, setSorting] = useState('DESC');
  const [searchText, setSearchText] = useState('');
  const docs = useMemo(() => (allInvitee && allInvitee.data ? allInvitee.data : []), [allInvitee]);
  const invitee = useMemo(() => (docs && docs.docs ? docs.docs : []), [docs]);
  const activePage = useMemo(() => (allInvitee && allInvitee.page ? allInvitee.page : 1), [
    allInvitee,
  ]);
  const history = useHistory();

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [inviteeId, setInviteeId] = useState('');

  const onClosePopup = () => {
    setIsModelOpen(false);
  };

  useEffect(() => {
    dispatch(getInviteeSubscribers(1));
  }, []);
  const handlePageChange = page => {
    const data = {
      page,
      sorting,
    };
    dispatch(getInviteeSubscribers(data));
    setPageNum(page);
  };
  const onDeleteInvitee = id => {
    setInviteeId(id);
    setIsModelOpen(true);
  };

  const onDeleteData = () => {
    setIsModelOpen(false);
    const data = {
      page: pageNum,
      sorting,
    };
    dispatch(deleteInvitee(inviteeId));
    dispatch(getInviteeSubscribers(data));
  };
  const onEditInvitee = id => {
    history.push(`/subscribers/invited/${id}`);
  };
  const onSearch = e => {
    const text = e.target.value;
    setSearchText(text);
    const data = {
      page: pageNum,
      sorting,
      startDate: moment(fromDate).toISOString(),
      endDate: moment(toDate).toISOString(),
      searchText: text,
    };
    dispatch(getInviteeSubscribers(data));
  };

  const handleSortChange = e => {
    const sort = e.target.value;
    setSorting(sort);
    const data = {
      page: pageNum,
      sorting: sort,
      startDate: moment(fromDate).toISOString(),
      endDate: moment(toDate).toISOString(),
    };
    dispatch(getInviteeSubscribers(data));
  };
  const handleFromDateChange = datePass => {
    const date = datePass;
    if (moment(date).isAfter(toDate)) {
      errorNotification('From date should be less than to date');
    } else {
      setFromDate(date);
      const data = {
        page: pageNum,
        sorting,
        startDate: moment(date).toISOString(),
        endDate: moment(toDate).toISOString(),
      };
      if (data.startDate && data.endDate) dispatch(getInviteeSubscribers(data));
    }
  };
  const handleToDateChange = datePass => {
    const date = datePass;
    if (date) {
      date.setHours(23, 59, 59);
    }
    if (moment(date).isBefore(fromDate)) {
      errorNotification('To date should be greater than from date');
    } else {
      setToDate(date);
      const data = {
        page: pageNum,
        sorting,
        startDate: moment(fromDate).toISOString(),
        endDate: moment(date).toISOString(),
      };
      if (data.startDate && data.endDate) dispatch(getInviteeSubscribers(data));
    }
  };
  return (
    <>
      {isModelOpen && (
        <Modal
          description="Are you sure you want to delete invitee?"
          title="Delete Invitee"
          deleteData={onDeleteData}
          onClosePopup={onClosePopup}
        />
      )}
      <div>
        <div className="action-container">
          <div className="filters">
            <div className="filter">
              <label htmlFor="from" className="filter-label">
                Date Range
              </label>
              <div className="filter-action">
                <DatePicker
                  className="mr-10"
                  placeholderText="From"
                  selected={fromDate}
                  onFocus={e => {
                    e.target.placeholder = '';
                  }}
                  onBlur={e => {
                    e.target.placeholder = 'From';
                  }}
                  onChange={datePass => handleFromDateChange(datePass)}
                />
                <DatePicker
                  placeholderText="To"
                  selected={toDate}
                  onChange={datePass => handleToDateChange(datePass)}
                  onFocus={e => {
                    e.target.placeholder = '';
                  }}
                  onBlur={e => {
                    e.target.placeholder = 'To';
                  }}
                />
              </div>
            </div>
            <div className="filter">
              <div className="filter-label" style={{ paddingTop: '3px' }}>
                Sorting
              </div>
              <div className="filter-action">
                <select onChange={e => handleSortChange(e)} value={sorting}>
                  <option value="ASC">Oldest</option>
                  <option value="DESC">Latest</option>
                </select>
              </div>
            </div>
            <div className="filter">
              <div className="filter-label" style={{ paddingTop: '3px' }}>
                SEARCH INVITED
              </div>
              <div className="filter-action">
                <input
                  type="text"
                  className="common-input"
                  placeholder="Enter name or email"
                  value={searchText}
                  onChange={onSearch}
                  onFocus={e => {
                    e.target.placeholder = '';
                  }}
                  onBlur={e => {
                    e.target.placeholder = 'Enter name or email';
                  }}
                />
              </div>
            </div>
          </div>

          <div className="action-buttons">
            {/* <button type="button" className="button success-button" onClick={() => history.push('/add-subscribers')}>
            ADD SUBSCRIBER
          </button> */}
          </div>
        </div>
        <div>
          {invitee && invitee.length > 0 && (
            <div className="no-of-results-in-display">
              Showing {(allInvitee.data.page - 1) * allInvitee.data.limit + 1} to{' '}
              {allInvitee.data.total < allInvitee.data.page * allInvitee.data.limit
                ? allInvitee.data.total
                : allInvitee.data.page * allInvitee.data.limit}{' '}
              of {allInvitee.data.total} results{' '}
            </div>
          )}
          <div className="admin-table">
            <div className="tr heading">
              <div className="invited-table-details">
                <div className="td">NAME</div>
                <div className="td">EMAIL</div>
                <div className="td">PHONE</div>
                <div className="td">DATE INVITED</div>
                <div />
              </div>
            </div>
            {invitee && invitee.length > 0 ? (
              <>
                <div style={{ minHeight: 'calc(100vh - 370px)' }}>
                  {invitee.map(value => (
                    <div className="row-container" key={value._id}>
                      <div className="tr invited-table-details">
                        <div className="td name">
                          <img
                            src={
                              value && value.profilePicUrl && value.profilePicUrl
                                ? value.profilePicUrl
                                : User
                            }
                          />
                          {value.firstName} {value.lastName}
                        </div>

                        <div className="td email">{value.email}</div>
                        <div className="td phone">{value.phone ? value.phone : ''}</div>
                        <div className="td date">
                          {moment(value.createdAt).format('DD/MM/YYYY')}
                        </div>
                        <div className="action-cell">
                          <img
                            className="edit-image mr-5"
                            src={edit}
                            alt=""
                            onClick={() => onEditInvitee(value._id)}
                          />
                          <img
                            src={bin}
                            alt=""
                            onClick={() => onDeleteInvitee(value._id)}
                            className="delete-image"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={allInvitee.total || 1}
                  pageRangeDisplayed={3}
                  onChange={handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                  prevPageText="Prev"
                  nextPageText="Next"
                  hideFirstLastPages="true"
                />
              </>
            ) : (
              <>
                <div className="row-container">
                  <div style={{ textAlign: 'center', marginTop: '5vh' }}>Empty Data</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Invited;
