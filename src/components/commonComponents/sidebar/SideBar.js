import React from 'react';
import './sidebar.scss';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import linkfluencer from '../../../assets/images/linkfluencer.png';
import home from '../../../assets/images/home.png';
import group from '../../../assets/images/group.png';
import rightQuote from '../../../assets/images/right-quote-sign.png';
import gear from '../../../assets/images/gear.png';
import { logOutUser } from '../../../redux/actions/authActions/AuthActions';

function SideBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogOut = () => {
    dispatch(
      logOutUser(() => {
        history.push('/login');
      }),
    );
  };
  return (
    <div>
      <div className="">
        <NavLink className="dashboard-logo" to="/dashboard" replace>
          <img alt="Linkfluencer" src={linkfluencer} />
        </NavLink>
      </div>
      <div className="menu-bar">
        <div className="menu">
          <div className="menu-item">
            <NavLink className="menu-link" to="/dashboard" replace>
              <img alt="home" src={home} /> <span>Dashboard</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink className="menu-link" to="/subscribers" replace>
              <img alt="subscribers" src={group} /> <span>Subscribers</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink className="menu-link" to="/quoteBank" replace>
              <img alt="quoteBank" src={rightQuote} /> <span>Quote Bank</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink className="menu-link" to="/settings" replace>
              <img alt="settings" src={gear} /> <span>Settings</span>
            </NavLink>
          </div>
          <div className="menu-item">
            <button type="button" onClick={() => onLogOut()}>
              Logout
            </button>
          </div>
        </div>
        <div className="copyright">Copyright 2021. Linkfluencer Pvt. Ltd.</div>
      </div>
    </div>
  );
}

export default SideBar;
