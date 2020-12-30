import React from 'react';
import ErrorMessages from "./error-messages/error-messages";
import "./settings.scss"
import ManageAdmins from "./manage-admins/manage-admins";
import Integrations from "./integrations/integrations";

function Settings() {
    return (
        <div>
            <div className="buttons-row">
                <div className="d-flex">
                    <div className="button settings-button">Error Messages</div>
                    <div className="button settings-button">Integrations</div>
                    <div className="button settings-button">Manage Admins</div>
                </div>
                <div className="button settings-button success-button">ADD ADMIN</div>
            </div>
            <div className="settings-common-area">
                <ManageAdmins/>
            </div>
        </div>
    );
}

export default Settings;
