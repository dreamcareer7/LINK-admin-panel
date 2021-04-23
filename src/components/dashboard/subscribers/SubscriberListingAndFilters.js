import React, { useEffect, useMemo, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import {
  deleteSubscribers,
  getAllSubscribers,
} from '../../../redux/actions/subscribersAction/SubscribersAction';
import edit from '../../../assets/images/pencil.png';
import bin from '../../../assets/images/delete.png';
import User from '../../../assets/images/user.jpg';
import './subscribers.scss';
import { errorNotification } from '../../../constants/Toast';
import { getLabelFromValues } from '../../../helpers/mappingHelper';
import subTypeObject from '../../../helpers/Mapper';
import Modal from '../../commonComponents/Modal/Modal';

function SubscriberListingAndFilters() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allSubscribers = useSelector(state => state.subscrberReducer.getAllSub);
  const docs = useMemo(() => (allSubscribers && allSubscribers.data ? allSubscribers.data : []), [
    allSubscribers,
  ]);
  const subScribers = useMemo(() => (docs && docs.docs ? docs.docs : []), [docs]);

  const [sorting, setSorting] = useState('DESC');
  const [pageNum, setPageNum] = useState(1);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [subType, setSubType] = useState('all');
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [subscriberId, setSubscriberId] = useState('');

  const handleSortChange = e => {
    const sort = e.target.value;
    setSorting(sort);
    let data = null;
    if (subType !== 'all') {
      data = {
        page: pageNum,
        sorting: sort,
        subscriptionType: subType,
        startDate: moment(fromDate).toISOString(),
        endDate: moment(toDate).toISOString(),
      };
    } else {
      data = {
        page: pageNum,
        sorting: sort,
        startDate: moment(fromDate).toISOString(),
        endDate: moment(toDate).toISOString(),
      };
    }
    dispatch(getAllSubscribers(data));
  };
  useEffect(() => {
    const data = {
      page: 1,
      sorting,
    };
    dispatch(getAllSubscribers(data));
  }, []);

  const handleFromDateChange = datePass => {
    const date = datePass;
    if (moment(date).isAfter(toDate)) {
      errorNotification('Please enter a valid date range');
    } else {
      setFromDate(date);
      if (subType !== 'all') {
        const data = {
          page: 1,
          sorting,
          subscriptionType: subType,
          startDate: date ? date.toISOString() : undefined,
          endDate: toDate ? toDate.toISOString() : undefined,
        };
        if (data.startDate && data.endDate) dispatch(getAllSubscribers(data));
      } else {
        const data = {
          page: 1,
          sorting,
          startDate: date ? date.toISOString() : undefined,
          endDate: toDate ? toDate.toISOString() : undefined,
        };
        if (data.startDate && data.endDate) dispatch(getAllSubscribers(data));
      }
    }
  };
  const handleToDateChange = datePass => {
    const date = datePass;
    if (date) {
      date.setHours(23, 59, 59);
    }
    if (moment(date).isBefore(fromDate)) {
      errorNotification('Please enter a valid date range');
    } else {
      setToDate(date);
      if (subType !== 'all') {
        const data = {
          page: 1,
          sorting,
          subscriptionType: subType,
          startDate: fromDate ? fromDate.toISOString() : undefined,
          endDate: date ? date.toISOString() : undefined,
        };
        if (data.startDate && data.endDate) dispatch(getAllSubscribers(data));
      } else {
        const data = {
          page: 1,
          sorting,
          startDate: fromDate ? fromDate.toISOString() : undefined,
          endDate: date ? date.toISOString() : undefined,
        };
        if (data.startDate && data.endDate) dispatch(getAllSubscribers(data));
      }
    }
  };

  const onChangeSubType = e => {
    const subscriptionType = e.target.value;
    setSubType(subscriptionType);
    if (subscriptionType !== 'all') {
      const data = {
        page: 1,
        sorting,
        startDate: fromDate ? fromDate.toISOString() : '',
        endDate: toDate ? moment(toDate).toISOString() : '',
        subscriptionType,
      };
      dispatch(getAllSubscribers(data));
    } else {
      const data = {
        page: 1,
        sorting,
        startDate: fromDate ? moment(fromDate).toISOString() : '',
        endDate: toDate ? moment(toDate).toISOString() : '',
      };
      dispatch(getAllSubscribers(data));
    }
  };

  const activePage = useMemo(
    () => (allSubscribers && allSubscribers.data.page ? allSubscribers.data.page : 1),
    [allSubscribers]
  );
  const onEditSub = subId => {
    history.push(`/subscribers/subscribed/${subId}`);
  };
  const onClosePopup = () => {
    setIsModelOpen(false);
  };
  const onDeleteSub = subId => {
    setSubscriberId(subId);
    setIsModelOpen(true);
  };
  const onDeleteData = () => {
    setIsModelOpen(false);
    dispatch(deleteSubscribers(subscriberId));
  };
  const handlePageChange = page => {
    setPageNum(page);
    dispatch(getAllSubscribers({ page, sorting }));
  };
  return (
    <div>
      {isModelOpen && (
        <Modal
          description="Are you sure you want to delete this subscriber?"
          title="Delete Subscriber"
          deleteData={onDeleteData}
          onClosePopup={onClosePopup}
        />
      )}
      <div className="action-container">
        <div className="filters">
          <div className="filter">
            <label htmlFor="from" className="filter-label">
              Date Range
            </label>
            <div className="filter-action">
              <DatePicker
                className="mr-10"
                placeholderText="From Date"
                dateFormat="dd/MM/yyyy"
                selected={fromDate}
                onChange={datePass => handleFromDateChange(datePass)}
                onFocus={e => {
                  e.target.placeholder = '';
                }}
                onBlur={e => {
                  e.target.placeholder = 'From Date';
                }}
              />
              <DatePicker
                placeholderText="To Date"
                dateFormat="dd/MM/yyyy"
                selected={toDate}
                onChange={datePass => handleToDateChange(datePass)}
                onFocus={e => {
                  e.target.placeholder = '';
                }}
                onBlur={e => {
                  e.target.placeholder = 'To Date';
                }}
              />
            </div>
          </div>
          <div className="filter">
            <div className="filter-label" style={{ paddingTop: '3px' }}>
              Subscription Type
            </div>
            <div className="filter-action">
              <select value={subType} onChange={onChangeSubType}>
                <option value="all">All</option>
                <option value="FREE_TRIAL">Free Trial</option>
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="filter">
            <div className="filter-label" style={{ paddingTop: '3px' }}>
              Sorting
            </div>
            <div className="filter-action">
              <select onChange={e => handleSortChange(e)} value={sorting}>
                <option value="DESC">Latest</option>
                <option value="ASC">Oldest</option>
              </select>
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

          <div className="no-of-results-in-display mt-30">
            Showing {allSubscribers.data.total < allSubscribers.data.page * allSubscribers.data.limit
              ? allSubscribers.data.total
              : allSubscribers.data.page * allSubscribers.data.limit}{' '}
            of {allSubscribers.data.total} results{' '}
            {subScribers.length > 0 && subType !== 'all' && <span className="font-600 ml-10">Subscription Type: </span>}
            {getLabelFromValues(subType, subTypeObject)}{' '}
            <span className="font-600 ml-10">Sorting: </span>
            {sorting === 'DESC' ? 'Recent' : 'Old'}
          </div>

        <div className="admin-table mt-30 fix-size">
          {subScribers && subScribers.length > 0 ?
          <div className="tr heading">
            <div className="subscribe-table-details">
              <div>NAME</div>
              <div>EMAIL</div>
              <div>PHONE</div>
              <div>SUBSCRIPTION</div>
              <div>DATE</div>
              <div>PAID</div>
              <div className="action-cell" />
            </div>
          </div> : ''}
          {subScribers && subScribers.length > 0 ? (
            <>
              {subScribers.map(value => (
                <div key={value._id} className="row-container">
                  <div className="tr">
                    <div className="subscribe-table-details">
                      <div className="td name">
                        <img
                          src={
                            value  && value.profilePicUrl
                              ? value.profilePicUrl
                              : User
                          }
                        />
                        {value.firstName} {value?.lastName ? value?.lastName : ''}
                       {/* {value.selectedPlan.status === 'CANCELLED' ? (
                          <span className="sub-type-admin">CANCELLED</span>
                        ) : (
                          value.vicSub && <span className="sub-type-admin sub-type-vic">VIC</span>
                        )} */}
                      </div>

                      <div className="td email">{value?.email}</div>
                      <div className="td phone">{value?.phone ? value.phone : ''}</div>
                      <div className="td subscribe">
                        {getLabelFromValues(value?.selectedPlan?.status, subTypeObject)}
                      </div>
                      <div className="td date">{moment(value.createdAt).format('DD/MM/YYYY')}</div>
                      <div className="td total-payment">{`$${value.totalReceivedAmount}`}</div>
                      <div className="action-cell">
                        <img
                          className="edit-image mr-5"
                          src={edit}
                          alt=""
                          onClick={() => onEditSub(value._id)}
                        />
                        <img
                          className="delete-image"
                          src={bin}
                          alt=""
                          onClick={() => onDeleteSub(value._id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
              <div className="no-subscriber-container">
                <div style={{ textAlign: 'center', marginTop: '5vh' }}>No Data Available</div>
              </div>
          )}
        </div>
        {subScribers && subScribers.length > 0 && (
          <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={allSubscribers?.data?.total || 1}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
            prevPageText="Prev"
            nextPageText="Next"
            hideFirstLastPages="true"
          />
        )}
      </div>
    </div>
  );
}

export default SubscriberListingAndFilters;
