import React from 'react';
import './settings.scss';
import ManageAdmins from './manage-admins/manage-admins';

function Settings() {
  return (
    <div>
      <div className="settings-buttons-row">
        <div className="d-flex">
          <div className="settings-button" onClick="">
            Error Messages
          </div>
          <div className="settings-button" onClick="">
            Integrations
          </div>
          <div className="settings-button" onClick="">
            Manage Admins
          </div>
        </div>
        <div className="button settings-button success-button" onClick="">
          ADD ADMIN
        </div>
      </div>
      <div className="settings-common-area">
        <ManageAdmins />
      </div>
    </div>
  );
}

export default Settings;
