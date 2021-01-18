import React, { useState } from 'react';
import Invited from './Invited';
import Subscribers from './Subscribers';

import './subscribers.scss';
import AddInvited from './AddInvited/AddInvited';

const Subscribed = () => {
  const [activeComponent, setActiveComponent] = React.useState(<Subscribers key="error" />);
  const [keys, setKeys] = useState('error');
  const onChangeComponent = component => {
    setKeys(component.key);
    setActiveComponent(component);
  };
  return (
    <>
      <div className="subscribed-buttons-row">
        <div className="d-flex">
          <div
            className={keys === 'error' ? 'sub-button active-menu' : 'sub-button'}
            onClick={() => onChangeComponent(<Subscribers key="error" />)}
          >
            Subscribed
          </div>
          <div
            className={keys === 'manage' ? 'sub-button active-menu' : 'sub-button'}
            onClick={() => onChangeComponent(<Invited key="manage" />)}
          >
            Invited
          </div>
        </div>
        <div className="d-flex">
          <button
            type="button"
            className="button success-button mr-10"
            onClick={() => onChangeComponent(<AddInvited key="manage" />)}
          >
            ADD
          </button>
          <button type="button" className="button primary-button">
            DOWNLOAD
          </button>
        </div>
      </div>
      <div className="">{activeComponent}</div>
    </>
  );
};

export default Subscribed;
