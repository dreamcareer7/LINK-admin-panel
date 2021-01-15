import React from 'react';
import User from '../../../assets/images/avatar.jpg';

const Invited = () => {
  return (
    <>
      <div>
        <div className="action-container">
          <div className="filters">
            {/* <div className="filter">
              <label htmlFor="from" className="filter-label">
                Date Range
              </label>
              <div className="filter-action">
                <input name="from" type="date" placeholder="From" />
                <input name="to" type="date" placeholder="To" />
              </div>
            </div> */}
            {/* <div className="filter">
              <div className="filter-label">Subscription Type:</div>
              <div className="filter-action">
                <select>
                  <option value="asc">Free Trial</option>
                  <option value="dsc">Monthly</option>
                  <option value="dsc">Yearly</option>
                  <option value="dsc">Paused</option>
                </select>
              </div>
            </div> */}

            {/* <div className="filter">
              <div className="filter-label">Sorting</div>
              <div className="filter-action">
                <select>
                  <option value="asc">Ascending</option>
                  <option value="dsc">Descending</option>
                </select>
              </div>
            </div> */}
          </div>
        </div>
        <div>
          <div className="admin-table mt-40">
            <div className="tr heading">
              <div className="admin-table-details">
                <div className="td">NAME</div>
                <div className="td">EMAIL</div>
                <div className="td">PHONE</div>
              </div>
            </div>
            <div className="row-container">
              <div className="tr">
                <div className="admin-table-details">
                  <div className="td name">
                    <img src={User} />
                    ABC
                  </div>

                  <div className="td">EMAIL</div>
                  <div className="td">PHONE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invited;
