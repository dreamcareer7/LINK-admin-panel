import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './upperHeader.scss';
import search from '../../../assets/images/search.png';
import user from '../../../assets/images/dummy-user.jpg';
import downArrow from '../../../assets/images/arrow_down.png';
import logout from '../../../assets/images/logout.svg';
import account from '../../../assets/images/account.svg';
import help from '../../../assets/images/lifesaver.svg';
import { logOutUser } from '../../../redux/actions/authActions/AuthActions';

function UpperHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogOut = () => {
    dispatch(
      logOutUser(() => {
        history.push('/login');
      })
    );
  };
  const onAccountClick = () => {
    history.replace('/account');
  };
  return (
    <div className="upper-header-block">
      <div className="upper-header--rounded-block search-block">
        <input placeholder="Search Subscriber" />
        <button type="button">
          <img src={search} />{' '}
        </button>
      </div>
      <div className="logout-area">
        <div className="upper-header--rounded-block">
          <img className="user-dp" src={user} />
          <label>Michelle Obama</label>
          <div className="down-arrow">
            <img src={downArrow} />
            <div className="user-dropdown">
              <div className="dropdown-option" onClick={onAccountClick}>
                <img src={account} />
                <span>Account</span>
              </div>
              <div className="dropdown-option">
                <img src={help} />
                <span>Help & Support</span>
              </div>
              <div className="dropdown-option" onClick={onLogOut}>
                <img src={logout} />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperHeader;
