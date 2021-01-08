import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubscribers } from '../../../redux/actions/subscribersAction/SubscribersActuion';
import User from '../../../assets/images/dummy-user.jpg';
import edit from '../../../assets/images/pencil.png';
import bin from '../../../assets/images/delete.png';
import './subscribers.scss';

function Subscribers() {
  const dispatch = useDispatch();
  const allSubscribers = useSelector(state => state.subscrberReducer);
  console.log(allSubscribers);
  useEffect(() => {
    dispatch(getAllSubscribers({ page: 1, limit: 2 }));
  }, []);

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
              <select />
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
          <button type="button" className="button success-button">
            ADD SUBSCRIBER
          </button>
          <button type="button" className="button primary-button">
            DOWNLOAD
          </button>
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
          {allSubscribers && allSubscribers.docs && allSubscribers.docs.length > 0 ? (
            <>
              {allSubscribers.docs.map(value => (
                <div key={value._id} className="row-container">
                  <div className="tr">
                    <div className="admin-table-details">
                      <div className="td name">
                        <img src={User} />
                        {value.firstName}
                      </div>

                      <div className="td">{value.email}</div>
                      <div className="td">{value.phone}</div>
                      <div className="td">{value.phone}</div>
                      <div className="td">{value.phone}</div>
                    </div>
                    <div className="action-cell">
                      <img className="mr-5" src={edit} alt="" />
                      <img src={bin} alt="" />
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
      </div>
    </div>
  );
}

export default Subscribers;
