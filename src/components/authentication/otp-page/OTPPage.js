import React, { useState } from 'react';
import linkFluencer from '../../../assets/images/linkfluencer.png';

function OTPPage() {
  const [verifyOtp, setVeifyOtp] = useState('');
  // VEIFY FROM BACKEND

  const onClickVerifyOtp = () => {};

  return (
    <div className="content-container">
      <img alt="linkfluencer" src={linkFluencer} className="logo" />
      <div className="form">
        <div className="form--detail-container">
          <input
            type="text"
            placeholder="Enter verification code"
            value={verifyOtp}
            onChange={e => setVeifyOtp(e.target.value.toString().trim())}
          />
        </div>
        <button
          type="button"
          className="button success-button authButtonStyle"
          onClick={onClickVerifyOtp}
        >
          VERIFY OTP
        </button>
      </div>
    </div>
  );
}

export default OTPPage;
