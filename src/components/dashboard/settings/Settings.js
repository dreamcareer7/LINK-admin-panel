import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './settings.scss';
import ErrorMessages from './error-messages/ErrorMessages';
import ManageAdmins from './manage-admins/ManageAdmins';

function Settings() {
  const history = useHistory();
  const { type } = useParams();

  const [activeComponent, setActiveComponent] = useState(type ?? 'errorMessage');

  const onChangeComponent = component => {
    setActiveComponent(component);
    history.push(`/settings/${component}`);
  };
  return (
    <div>
      <div className="settings-buttons-row">
        <div className="d-flex">
          <div
            className={
              activeComponent === 'errorMessage' ? 'settings-button active-menu' : 'settings-button'
            }
            onClick={() => onChangeComponent('errorMessage')}
          >
            Error Messages
          </div>
          {/* <div className="settings-button" onClick={() => history.push('/integrations')}>
            Integrations
          </div> */}
          <div
            className={
              activeComponent === 'manageAdmin' ? 'settings-button active-menu' : 'settings-button'
            }
            onClick={() => onChangeComponent('manageAdmin')}
          >
            Manage Admins
          </div>
        </div>
        {activeComponent !== 'errorMessage' ? (
          <div
            style={{ float: 'right' }}
            className="button success-button"
            onClick={() => history.push('/settings/manageAdmin/addAdmin')}
          >
            ADD ADMIN
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="settings-common-area">
        {activeComponent === 'errorMessage' ? <ErrorMessages /> : <ManageAdmins />}
      </div>
    </div>
  );
}

export default Settings;
