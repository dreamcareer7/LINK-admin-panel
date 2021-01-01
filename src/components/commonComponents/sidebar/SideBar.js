import React from 'react';
import './sidebar.scss';
import linkfluencer from '../../../assets/images/linkfluencer.png';
import home from '../../../assets/images/home.png';
import group from '../../../assets/images/group.png';
import rightQuote from '../../../assets/images/right-quote-sign.png';
import gear from '../../../assets/images/gear.png';

function SideBar() {
  return (
    <div>
      <div className="dashboard-logo">
        <img alt="Linkfluencer" src={linkfluencer} />
      </div>
      <div className="menu-bar">
        <div className="menu">
          <div className="menu-item">
            <img alt="home" src={home} /> <span>Dashboard</span>
          </div>

          <div className="menu-item">
            <img alt="subscribers" src={group} /> <span>Subscribers</span>
          </div>

          <div className="menu-item">
            <img alt="quoteBank" src={rightQuote} /> <span>Quote Bank</span>
          </div>

          <div className="menu-item">
            <img alt="settings" src={gear} /> <span>Settings</span>
          </div>
        </div>
        <div className="copyright">Copyright 2021. Linkfluencer Pvt. Ltd.</div>
      </div>
    </div>
  );
}

export default SideBar;
