import React from 'react';
import { useHistory } from 'react-router-dom';
import './settings.scss';
// import ManageAdmins from './manage-admins/ManageAdmins';
import ErrorMessages from './error-messages/ErrorMessages';
import ManageAdmins from './manage-admins/ManageAdmins';

// import ErrorMessages from './error-messages/ErrorMessages';

function Settings(props) {
  console.log('Setting', props);
  const history = useHistory();
  console.log('history', history);
  const [activeComponent, setActiveComponent] = React.useState(<ErrorMessages />);

  const onChangeComponent = component => {
    setActiveComponent(component);
  };

  return (
    <div>
      <div className="settings-buttons-row">
        <div className="d-flex">
          <div className="settings-button" onClick={() => onChangeComponent(<ErrorMessages />)}>
            Error Messages
          </div>
          {/* <div className="settings-button" onClick={() => history.push('/integrations')}>
            Integrations
          </div> */}
          <div className="settings-button" onClick={() => onChangeComponent(<ManageAdmins />)}>
            Manage Admins
          </div>
        </div>
      </div>
      <div className="settings-common-area">{activeComponent}</div>
    </div>
  );
}

export default Settings;
