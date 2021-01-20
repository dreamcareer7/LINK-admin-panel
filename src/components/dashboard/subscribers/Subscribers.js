import React, {useEffect, useMemo} from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Pagination from "react-js-pagination";
import {
  deleteSubscribers,
  getAllSubscribers,
} from '../../../redux/actions/subscribersAction/SubscribersAction';
import edit from '../../../assets/images/pencil.png';
import bin from '../../../assets/images/delete.png';
import User from '../../../assets/images/avatar.jpg';
import './subscribers.scss';

function Subscribers() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allSubscribers = useSelector(state => state.subscrberReducer.getAllSub);
  const docs = useMemo(
      () => (allSubscribers && allSubscribers.data ? allSubscribers.data : []),
      [allSubscribers]
  );
  const subScribers = useMemo(() => (docs && docs.docs ? docs.docs : []), [docs]);
  useEffect(() => {
    dispatch(getAllSubscribers(1));
  }, []);


  const activePage = useMemo(() => (allSubscribers && allSubscribers.page ? allSubscribers.page : 1), [allSubscribers]);
  const onEditSub = subId => {
    history.push(`/subscribers/${subId}`);
  };

  const onDeleteSub = subId => {
    dispatch(deleteSubscribers(subId));
  };
  const handlePageChange = page =>{
    dispatch(getAllSubscribers(page))
  }

  return (
    <div>
      <div className="action-container">
        <div className="filters">
          <div className="filter">
            <label htmlFor="from" className="filter-label">
              Date Range
            </label>
            <div className="filter-action">
              <input name="from" type="date" placeholder="From" />
              <input name="to" type="date" placeholder="To" />
            </div>
          </div>
          <div className="filter">
            <div className="filter-label">Subscription Type:</div>
            <div className="filter-action">
              <select>
                <option value="asc">Free Trial</option>
                <option value="dsc">Monthly</option>
                <option value="dsc">Yearly</option>
                <option value="dsc">Paused</option>
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
        <div className="action-buttons">
          {/* <button type="button" className="button success-button" onClick={() => history.push('/add-subscribers')}>
            ADD SUBSCRIBER
          </button> */}
        </div>
      </div>
      <div>
        <div className="admin-table mt-40">
          <div className="tr heading">
            <div className="admin-table-details">
              <div className="td">NAME</div>
              <div className="td">EMAIL</div>
              <div className="td">PHONE</div>
              <div className="td">SUBSCRIPTION</div>
              <div className="td">DATE SUBSCRIPTION</div>
            </div>
            <div className="action-cell" />
          </div>
          {subScribers &&
            subScribers.length > 0 ? (
            <>
              {subScribers.map(value => (
                <div key={value._id} className="row-container">
                  <div className="tr">
                    <div className="admin-table-details">
                      <div className="td name">
                        <img
                          src={
                            value && value.profilePicUrl && value.profilePicUrl
                              ? value.profilePicUrl
                              : User
                          }
                        />
                        {value.firstName}
                      </div>

                      <div className="td">{value.email}</div>
                      <div className="td">{value.phone}</div>
                      <div className="td">{value.phone}</div>
                      <div className="td">Yearly</div>
                      <div className="td">{moment(value.createdAt).format('L')}</div>
                    </div>
                    <div className="action-cell">
                      <img
                        className="mr-5"
                        src={edit}
                        alt=""
                        onClick={() => onEditSub(value._id)}
                      />
                      <img src={bin} alt="" onClick={() => onDeleteSub(value._id)} />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="row-container">
                <div className="tr">
                  <div className="admin-table-details ">Empty Data</div>
                </div>
              </div>
            </>
          )}
        </div>
        <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={allSubscribers.total || 1}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
        />
      </div>
    </div>
  );
}

export default Subscribers;
