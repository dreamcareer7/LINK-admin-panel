import React from 'react';
import './sidebar.scss';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import linkfluencer from '../../../assets/images/linkfluencer.png';
import home from '../../../assets/images/home.png';
import group from '../../../assets/images/group.png';
import rightQuote from '../../../assets/images/right-quote-sign.png';
import gear from '../../../assets/images/gear.png';
import { clearUserData } from '../../../redux/actions/authActions/AuthActions';

function SideBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogOut = () => {
    dispatch(clearUserData());
    history.push('/login');
  };
  return (
    <div>
      <div className="">
        <Link className="dashboard-logo" to="/">
          <img alt="Linkfluencer" src={linkfluencer} />
        </Link>
      </div>
      <div className="menu-bar">
        <div className="menu">
          <div className="menu-item">
            <Link className="menu-link" to="/">
              <img alt="home" src={home} /> <span>Dashboard</span>
            </Link>
          </div>

          <div className="menu-item">
            <Link className="menu-link" to="/subscribers">
              <img alt="subscribers" src={group} /> <span>Subscribers</span>
            </Link>
          </div>

          <div className="menu-item">
            <Link className="menu-link" to="/quote">
              <img alt="quoteBank" src={rightQuote} /> <span>Quote Bank</span>
            </Link>
          </div>

          <div className="menu-item">
            <Link className="menu-link" to="/setting">
              <img alt="settings" src={gear} /> <span>Settings</span>
            </Link>
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
