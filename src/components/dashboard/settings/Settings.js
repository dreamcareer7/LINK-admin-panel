import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './settings.scss';
import ErrorMessages from './error-messages/ErrorMessages';
import ManageAdmins from './manage-admins/ManageAdmins';

function Settings() {
  const history = useHistory();
  const [activeComponent, setActiveComponent] = React.useState(<ErrorMessages key="error" />);
  const [keys, setKeys] = useState('error');

  const onChangeComponent = component => {
    setKeys(component.key);
    setActiveComponent(component);
  };

  return (
    <div>
      <div className="settings-buttons-row">
        <div className="d-flex">
          <div
            className={keys === 'error' ? 'settings-button active-menu' : 'settings-button'}
            onClick={() => onChangeComponent(<ErrorMessages key="error" />)}
          >
            Error Messages
          </div>
          {/* <div className="settings-button" onClick={() => history.push('/integrations')}>
            Integrations
          </div> */}
          <div
            className={keys === 'manage' ? 'settings-button active-menu' : 'settings-button'}
            onClick={() => onChangeComponent(<ManageAdmins key="manage" />)}
          >
            Manage Admins
          </div>
        </div>
        {keys === 'manage' ? (
          <div
            style={{ float: 'right' }}
            className="button success-button"
            onClick={() => history.push('/addAdmin')}
          >
            ADD ADMIN
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="settings-common-area">{activeComponent}</div>
    </div>
  );
}

export default Settings;
