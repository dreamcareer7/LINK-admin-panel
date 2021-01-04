import React from 'react';
import SideBar from '../sidebar/SideBar';
import UpperHeader from '../upperHeader/UpperHeader';
import './layout.scss';

const Layout = props => {
  console.log('Layout', props);
  // eslint-disable-next-line react/prop-types
  const { children } = props;

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
