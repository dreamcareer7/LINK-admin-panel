import React, { useEffect, useMemo, useState } from 'react';
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
  const [fromDate, setFromDate] = useState(moment().subtract(30, 'days').toDate());
  const [toDate, setToDate] = useState(moment().toDate());
  const [subType, setSubType] = useState('all');

  const handleSortChange = e => {
    const sort = e.target.value;
    setSorting(sort);
    const data = {
      page: pageNum,
      sorting: sort,
      startDate: moment(fromDate).toISOString(),
      endDate: moment(toDate).toISOString(),
    };
    dispatch(getAllSubscribers(data));
  };
  useEffect(() => {
    const data = {
      page: 1,
      sorting,
    };
    dispatch(getAllSubscribers(data));
  }, []);

  const handleFromDateChange = e => {
    const date = e.target.value;
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
      dispatch(getAllSubscribers(data));
    }
  };
  const handleToDateChange = e => {
    const date = e.target.value;
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
      dispatch(getAllSubscribers(data));
    }
  };

  const onChangeSubType = e => {
    const subscriptionType = e.target.value;
    setSubType(subscriptionType);
    if (subscriptionType !== 'all') {
      const data = {
        page: pageNum,
        sorting,
        startDate: moment(fromDate).toISOString(),
        endDate: moment(toDate).toISOString(),
        subscriptionType,
      };
      dispatch(getAllSubscribers(data));
    } else {
      const data = {
        page: pageNum,
        sorting,
        startDate: moment(fromDate).toISOString(),
        endDate: moment(toDate).toISOString(),
      };
      dispatch(getAllSubscribers(data));
    }
  };

  const activePage = useMemo(
    () => (allSubscribers && allSubscribers.page ? allSubscribers.page : 1),
    [allSubscribers]
  );
  const onEditSub = subId => {
    history.push(`/subscribers/subscribed/${subId}`);
  };

  const onDeleteSub = subId => {
    dispatch(deleteSubscribers(subId));
  };
  const handlePageChange = page => {
    setPageNum(page);
    dispatch(getAllSubscribers(page, sorting));
  };

  return (
    <div>
      <div className="action-container">
        <div className="filters">
          <div className="filter">
            <label htmlFor="from" className="filter-label">
              Date Range
            </label>
            <div className="filter-action">
              <input
                name="from"
                type="date"
                placeholder="From"
                value={moment(fromDate).format('YYYY-MM-DD')}
                onChange={handleFromDateChange}
              />
              <input
                name="to"
                type="date"
                placeholder="To"
                value={moment(toDate).format('YYYY-MM-DD')}
                onChange={handleToDateChange}
              />
            </div>
          </div>
          <div className="filter">
            <div className="filter-label" style={{ paddingTop: '3px' }}>
              Subscription Type:
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
                <option value="ASC">Old</option>
                <option value="DESC">Recent</option>
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
        {subScribers.length > 0 && (
          <div className="no-of-results-in-display mt-30">
            Showing {(allSubscribers.data.page - 1) * allSubscribers.data.limit + 1} to{' '}
            {allSubscribers.data.total < allSubscribers.data.page * allSubscribers.data.limit
              ? allSubscribers.data.total
              : allSubscribers.data.page * allSubscribers.data.limit}{' '}
            of {allSubscribers.data.total} results{' '}
            {subType !== 'all' && <span className="font-600 ml-10">Subscription Type: </span>}
            {getLabelFromValues(subType, subTypeObject)}{' '}
            <span className="font-600 ml-10">Sorting: </span>
            {sorting === 'DESC' ? 'Recent' : 'Old'}
          </div>
        )}
        <div className="admin-table mt-30 fix-size">
          <div className="tr heading">
            <div className="subscribe-table-details">
              <div>NAME</div>
              <div>EMAIL</div>
              <div>PHONE</div>
              <div>SUBSCRIPTION</div>
              <div>DATE SUBSCRIBED</div>
              <div>TOTAL PAYMENTS</div>
              <div className="action-cell" />
            </div>
          </div>
          {subScribers && subScribers.length > 0 ? (
            <>
              {subScribers.map(value => (
                <div key={value._id} className="row-container">
                  <div className="tr">
                    <div className="subscribe-table-details">
                      <div className="td name">
                        <img
                          src={
                            value && value.profilePicUrl && value.profilePicUrl
                              ? value.profilePicUrl
                              : User
                          }
                        />
                        {value.firstName}
                        {value.selectedPlan.status === 'CANCELLED' ? (
                          <span className="sub-type-admin">CANCELLED</span>
                        ) : (
                          value.vicSub && <span className="sub-type-admin sub-type-vic">VIC</span>
                        )}
                      </div>

                      <div className="td">{value.email}</div>
                      <div className="td">{value.phone}</div>
                      <div className="td">
                        {getLabelFromValues(value.selectedPlan.status, subTypeObject)}
                      </div>
                      <div className="td">{moment(value.createdAt).format('L')}</div>
                      <div className="td">{`$${value.totalReceivedAmount}`}</div>
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
            <>
              <div className="row-container">
                <div style={{ textAlign: 'center', marginTop: '5vh' }}>Empty Data</div>
              </div>
            </>
          )}
        </div>
        {subScribers && subScribers.length > 0 ? (
          <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={allSubscribers.total || 1}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SubscriberListingAndFilters;
