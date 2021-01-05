import React from 'react';
import { getAuthTokenLocalStorage } from '../../../helpers/LocalStorageHelper';
import SideBar from '../sidebar/SideBar';
import UpperHeader from '../upperHeader/UpperHeader';
import './layout.scss';

const Layout = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const isLoggedIn = getAuthTokenLocalStorage();
  if (!isLoggedIn) {
    return children;
  }
  return (
    <div>
      <div className="dashboard">
        <div className="dashboard--left-part">
          <SideBar />
        </div>
        <div className="dashboard--right-part">
          <div className="dashboard--upperHeader">
            <UpperHeader />
          </div>
          <div className="common-area">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
