import React from 'react';
import './integrations.scss';

function Integrations() {
  return (
    <div className="integrations-block">
      <div className="light-gray-block integrations-inner-block">
        <div className="common-title mar-bott-5">STRIPE</div>
        <div className="common-subtitle mar-bott-5">Account ID</div>
        <input className="integrations-input" placeholder="Enter Account ID"
               onFocus={(e) => {e.target.placeholder = ""}}
               onBlur={(e) => {e.target.placeholder = "Enter Account ID"}}
        />
        <div className="common-subtitle mar-bott-5 mt-10">API Key</div>
        <input className="integrations-input" placeholder="Enter API Key"
               onFocus={(e) => {e.target.placeholder = ""}}
               onBlur={(e) => {e.target.placeholder = "Enter API Key"}}
        />
      </div>

      <div className="light-gray-block integrations-inner-block">
        <div className="common-title mar-bott-5">ZenDesk</div>
        <div className="common-subtitle mar-bott-5">Account ID</div>
        <input className="integrations-input" placeholder="Enter Account ID"
               onFocus={(e) => {e.target.placeholder = ""}}
               onBlur={(e) => {e.target.placeholder = "Enter Account ID"}}
        />
        <div className="common-subtitle mar-bott-5 mt-10">API Key</div>
        <input className="integrations-input" placeholder="Enter API Key"
               onFocus={(e) => {e.target.placeholder = ""}}
               onBlur={(e) => {e.target.placeholder = "Enter API Key"}}
        />
      </div>
      <button type="button" className="button success-button">
        SAVE
      </button>
    </div>
  );
}

export default Integrations;
