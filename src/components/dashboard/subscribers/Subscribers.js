import React from 'react';
import './subscribers.scss';

function Subscribers() {
  return (
    <div>
      <div className="action-container">
        <div className="filters">
          <div className="filter">
            <label htmlFor="from" className="filter-label">
              Date Range
            </label>
            <div className="filter-action">
              <input name="from" placeholder="From" />
              <input name="to" placeholder="To" />
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
              <select />
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
    </div>
  );
}

export default Subscribers;
