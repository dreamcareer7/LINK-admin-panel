import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './settings.scss';
import ErrorMessages from './error-messages/ErrorMessages';
import ManageAdmins from './manage-admins/ManageAdmins';

function Settings(props) {
  console.log('Setting', props);
  const history = useHistory();
  console.log('history', history);
  const [activeComponent, setActiveComponent] = React.useState(<ErrorMessages key="error" />);
  const [keys, setKeys] = useState();

  const onChangeComponent = component => {
    console.log('component', component);
    setKeys(component.key);
    setActiveComponent(component);
  };

  return (
    <div>
      <div className="settings-buttons-row">
        <div className="d-flex">
          <div
            className="settings-button" 
            style={keys === 'error' ? { background: '#4590e4' } : { background: '#f9f9f9' }}
            onClick={() => onChangeComponent(<ErrorMessages key="error" />)}
          >
            Error Messages
          </div>
          {/* <div className="settings-button" onClick={() => history.push('/integrations')}>
            Integrations
          </div> */}
          <div
            className="settings-button"
            style={keys === 'manage' ? { background: '#4590e4' } : { background: '#f9f9f9' }}
            onClick={() => onChangeComponent(<ManageAdmins key="manage" />)}
          >
            Manage Admins
          </div>
        </div>
        {keys === 'manage' ? (
          <div style={{ float: 'right' }} className="button success-button">
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
