import React, { useState } from 'react';
import linkFluencer from '../../../assets/images/linkfluencer.png';
import './verification.scss';

function VerificationPage() {
  const [verificationCode, setVerificationCode] = useState('');

  const onClickVerify = () => {
    setVerificationCode('');
  };

  return (
    <div className="content-container">
      <img alt="linkfluencer" src={linkFluencer} className="logo" />
      <div className="form">
        <div className="form--detail-container">
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.toString().trim())}
          />
        </div>
        <button
          type="button"
          className="button success-button authButtonStyle"
          onClick={onClickVerify}
        >
          VERIFY
        </button>
      </div>
    </div>
  );
}
export default VerificationPage;
