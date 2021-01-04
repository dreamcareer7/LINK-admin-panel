import React from 'react';
import { useHistory } from 'react-router-dom';
import './settings.scss';
// import ManageAdmins from './manage-admins/ManageAdmins';
import ErrorMessages from './error-messages/ErrorMessages';
// import ErrorMessages from './error-messages/ErrorMessages';

function Settings(props) {
  console.log('Setting', props);
  const history = useHistory();
  console.log('history', history);
  return (
    <div>
      <div className="settings-buttons-row">
        <div className="d-flex">
          <div className="settings-button" onClick={() => history.push('/error-message')}>
            Error Messages
          </div>
          {/* <div className="settings-button" onClick={() => history.push('/integrations')}>
            Integrations
          </div> */}
          <div className="settings-button" onClick={() => history.push('/manage-admin')}>
            Manage Admins
          </div>
        </div>
      </div>
      <div className="settings-common-area">
        <ErrorMessages />
      </div>
    </div>
  );
}

export default Settings;
