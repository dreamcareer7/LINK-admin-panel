import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import linkFluencer from '../../../assets/images/linkfluencer.png';
import './verification.scss';
import AuthService from '../../../services/auth-services/AuthSevices';
import { errorNotification, successNotification } from '../../../constants/Toast';
import AUTH_REDUX_CONSTANTS from '../../../redux/constants/AuthReduxConstant';

function VerificationPage() {
  const [verificationCode, setVerificationCode] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const onClickVerify = () => {
    const token = localStorage.getItem('userToken');
    AuthService.verify2faLogin(token, verificationCode)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          successNotification('Logged in successfully');
          dispatch({
            type: AUTH_REDUX_CONSTANTS.LOGIN_USER,
            data: response.data.data,
          });
          localStorage.setItem('userToken', response.data.data.token);
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
          errorNotification('Invalid verification code');
        }
      });
  };

  const onEnterKeyPress = e => {
    if (e.keyCode === 13) {
      onClickVerify();
    }
  };
  useEffect(() => {
    document.title = 'Verification Page';
  }, []);

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
            onFocus={e => {
              e.target.placeholder = '';
            }}
            onBlur={e => {
              e.target.placeholder = 'Enter verification code';
            }}
            onChange={e => setVerificationCode(e.target.value.toString().trim())}
            onKeyDown={onEnterKeyPress}
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
