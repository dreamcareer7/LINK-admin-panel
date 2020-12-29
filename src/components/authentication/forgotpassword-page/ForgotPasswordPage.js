import React, { useState } from 'react';
import linkFluencer from '../../../assets/images/linkfluencer.png';
import user from '../../../assets/images/user.png';
import AuthTextInput from '../common/text-input/AuthTextInput';
import '../authStyle.scss';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const sendOtp = () => {
    console.log('in send otp');
  };

  return (
    <div>
      <div className="content-container">
        <img alt="linkfluencer" src={linkFluencer} className="logo" />
        <div className="form">
          <AuthTextInput
            src={user}
            type="text"
            placeholder="Enter Username"
            value={email}
            onChange={(e) => setEmail(e.target.value.toString().trim())}
          />
        </div>
      </div>
      <button type="button" className="button success-button authButtonStyle" onClick={sendOtp}>
        SEND OTP
      </button>
    </div>
  );
}
export default ForgotPasswordPage;
