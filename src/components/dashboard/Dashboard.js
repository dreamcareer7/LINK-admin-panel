import React from 'react';
import './dashboard.scss';
import SideBar from '../commonComponents/sidebar/SideBar';
import UpperHeader from '../commonComponents/upperHeader/UpperHeader';
import Settings from './settings/Settings';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard--left-part">
        <SideBar />
      </div>
      <div className="dashboard--right-part">
        <div className="dashboard--upperHeader">
          <UpperHeader />
        </div>

        <div className="common-area">
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
