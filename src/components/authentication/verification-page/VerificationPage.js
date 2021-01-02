import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import linkFluencer from '../../../assets/images/linkfluencer.png';
import './verification.scss';
import AuthService from '../../../services/auth-services/AuthSevices';
import { errorNotification, successNotification } from '../../../constants/Toast';

function VerificationPage() {
  const [verificationCode, setVerificationCode] = useState('');
  const history = useHistory();

  const onClickVerify = () => {
    console.log(verificationCode);
    const token = localStorage.getItem('userToken');
    console.log('token=>', token);
    AuthService.verify2faLogin(token, verificationCode)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          successNotification('OTP is verified');
          localStorage.setItem('userToken', response.data.data.token);
          localStorage.setItem('userEmail', response.data.data.email);
          // eslint-disable-next-line no-underscore-dangle
          localStorage.setItem('userId', response.data.data._id);
          history.push('/dashboard');
        }
      })
      .catch(e => {
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        } else if (e.response.data.status === 'TOKEN_EXPIRED') {
          errorNotification('Please try again login');
        } else if (e.response.data.status === 'INVALID_CODE') {
          errorNotification('Invalid otp');
        }
      });
  };

  return (
    <div className="content-container">
      <img alt="linkfluencer" src={linkFluencer} className="logo" />
      <div className="form">
        <div className="form--detail-container">
          <input
            className="verification-input-container"
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value.toString().trim())}
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
