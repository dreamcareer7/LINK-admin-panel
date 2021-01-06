import React, { useState } from 'react';
import './EditAdmin.scss';
import Switch from 'react-switch';
import user from '../../../../../assets/images/dummy-user.jpg';
import dummyQR from '../../../../../assets/images/dummy-qr.png';
import copy from '../../../../../assets/images/copy.svg';

function EditAdmin() {
  const [selected, setSelected] = useState(false);
  return (
    <div className="edit-admin-container">
      <div className="breadcrumb common-subtitle">
        <span>MANAGE ADMINS </span>
        <span>/ EDIT / UPDATE PROFILE</span>
      </div>

      <img className="DP-image" src={user} />

      <div className="admin-detail">
        <div id="name" className="mr-20">
          <div className="common-title mb-5">Name</div>
          <input className="common-input" placeholder="Michelle Obama" />
        </div>
        <div id="email" className="mr-20">
          <div className="common-title mb-5">Email</div>
          <input className="common-input" placeholder="michelle@abcmedia.com" />
        </div>
        <div id="phone">
          <div className="common-title mb-5">Phone</div>
          <input className="common-input" placeholder="(+61)545-589-9977" />
        </div>
      </div>

      <div className="buttons-row">
        <button type="submit" className="button success-button" onClick="">
          ADD ADMIN
        </button>
        <button type="button" className="button primary-button" onClick="">
          CANCEL
        </button>
      </div>

      <div className="common-title mb-5">2-Step Authenticator</div>

      <Switch
        checked={selected}
        onChange={() => setSelected(e => !e)}
        onColor="#00A8FF"
        onHandleColor="#07084B"
        handleDiameter={18}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={26}
        width={55}
        className="react-switch"
        id="material-switch"
      />

      <div className="step-container">
        <div className="common-title step-title">STEP 1</div>
        <div className="common-subtitle">Scan this Barcode in Authenticator App</div>
        <img className="barcode" src={dummyQR} />
        <div className="common-title mb-5 info-text-color">OR</div>
        <div className="common-subtitle">Enter this Key Authenticator App</div>
        <div className="key-container common-text-background">
          <label>ASC4 TG87 TW0K7 44U6</label>
          <img src={copy} title="Copy Key" />
        </div>
      </div>

      <div className="step-container">
        <div className="common-title step-title">STEP 2</div>
        <div className="common-subtitle">
          <div>Enter the 6 digit Code you see in your Authenticator App</div>
          <div className="code-container">
            <input className="common-input" />
            <input className="common-input" />
            <input className="common-input" />
            <input className="common-input" />
            <input className="common-input" />
            <input className="common-input" />
            <button type="button" className="button">
              VERIFY CODE
            </button>
          </div>
        </div>
      </div>

      <div className="buttons-row">
        <button type="submit" className="button success-button">
          SUBMIT
        </button>
        <button type="button" className="button primary-button">
          CANCEL
        </button>
      </div>
    </div>
  );
}

export default EditAdmin;
