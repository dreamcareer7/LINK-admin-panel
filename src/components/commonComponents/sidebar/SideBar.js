import React from 'react';
import './sidebar.scss';
import { NavLink } from 'react-router-dom';
import linkfluencer from '../../../assets/images/linkfluencer.png';
import home from '../../../assets/images/home.svg';
import group from '../../../assets/images/group.svg';
import rightQuote from '../../../assets/images/right-quotation-mark.svg';
import gear from '../../../assets/images/settings.svg';

function SideBar() {
  return (
    <div>
      <div className="">
        <NavLink className="dashboard-logo" to="/dashboard" replace>
          <img alt="Linkfluencer" src={linkfluencer} />
        </NavLink>
      </div>
      <div className="menu-bar">
        <div className="menu">
          <NavLink className="menu-item menu-link" to="/dashboard" replace>
            <img alt="home" src={home} /> <span>Dashboard</span>
          </NavLink>

          <NavLink className="menu-item menu-link" to="/subscribers" replace>
            <img alt="subscribers" src={group} /> <span>Subscribers</span>
          </NavLink>

          <NavLink
            className="menu-item menu-link"
            to="/quotebank?sort=RECENT&status=all&page=1"
            replace
          >
            <img alt="quoteBank" src={rightQuote} /> <span>Quote Bank</span>
          </NavLink>

          <NavLink className="menu-item menu-link" to="/settings" replace>
            <img alt="settings" src={gear} /> <span>Settings</span>
          </NavLink>
        </div>
        <div className="copyright">Copyright 2021. linkfluencer Pty Ltd</div>
      </div>
    </div>
  );
}

export default SideBar;
