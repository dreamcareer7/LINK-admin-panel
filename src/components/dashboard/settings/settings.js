import React from 'react';
import ErrorMessages from "./error-messages/error-messages";
import "./settings.scss"
import ManageAdmissions from "./manage-admissions/manage-admissions";
import Integrations from "./integrations/integrations";

function Settings() {
    return (
        <div>
            <div className="buttons-row">
                <div className="button settings-button">Error Messages</div>
                <div className="button settings-button">Integrations</div>
                <div className="button settings-button">Manage Admins</div>
            </div>
            <div className="settings-common-area">
                <Integrations/>
            </div>
        </div>
    );
}

export default Settings;
