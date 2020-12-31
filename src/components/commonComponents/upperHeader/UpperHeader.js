import React from 'react';
import './upperHeader.scss';
import search from '../../../assets/images/search.png';
import user from '../../../assets/images/dummy-user.jpg';
import downArrow from '../../../assets/images/arrow_down.png';
import logout from '../../../assets/images/logout.svg';

function UpperHeader() {
  return (
    <div className="upper-header-block">
      <div className="upper-header--rounded-block search-block">
        <input placeholder="Search Subscriber" />
        <button type="button" onClick="">
          <img src={search} />{' '}
        </button>
      </div>
      <div className="upper-header--rounded-block">
        <img className="user-dp" src={user} />
        <label>Michelle Obama</label>
        <div className="down-arrow">
          <img src={downArrow} />
          <div className="user-dropdown">
            <div className="dropdown-option">
              <img src={logout} />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperHeader;
