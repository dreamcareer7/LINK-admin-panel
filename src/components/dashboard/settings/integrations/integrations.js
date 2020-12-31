import React from 'react';
import './integrations.scss'

function Integrations() {
    return (
        <div className="integrations-block">
            <div className="light-gray-block integrations-inner-block">
                <div className="common-title mb-5">
                    STRIPE
                </div>
                <div className="common-subtitle mb-5">
                    Account ID
                </div>
                <input className="integrations-input" placeholder="Enter Account ID"/>
                <div className="common-subtitle mb-5 mt-10">
                    API Key
                </div>
                <input className="integrations-input" placeholder="Enter API Key"/>
            </div>

            <div className="light-gray-block integrations-inner-block">
                <div className="common-title mb-5">
                    ZenDesk
                </div>
                <div className="common-subtitle mb-5">
                    Account ID
                </div>
                <input className="integrations-input" placeholder="Enter Account ID"/>
                <div className="common-subtitle mb-5 mt-10">
                    API Key
                </div>
                <input className="integrations-input" placeholder="Enter API Key"/>
            </div>
                <button className="button success-button" onClick="">
                    SAVE
                </button>
        </div>
    );
}

export default Integrations;
