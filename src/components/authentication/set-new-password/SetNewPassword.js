import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import padlock from '../../../assets/images/padlock.png';
import hideInterface from '../../../assets/images/hide-interface-symbol.png';
import showPass from '../../../assets/images/showPass.svg';
import linkFluencer from '../../../assets/images/linkfluencer.png';
import {
  errorNotification,
  replaceHiddenCharacters,
  successNotification,
} from '../../../constants/Toast';
import AuthService from '../../../services/auth-services/AuthSevices';

function SetNewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const history = useHistory();

  const { token } = useParams();

  const checkPasswordMatch = () => {
    if (replaceHiddenCharacters(password.toString()).trim().length === 0) {
      errorNotification('Password can not be empty');
    } else if (replaceHiddenCharacters(confirmPassword.toString()).trim().length === 0) {
      errorNotification('Confirm password can not be empty');
    } else if (password !== confirmPassword) {
      errorNotification("Passwords do not match");
    } else {
      AuthService.setNewPassword(token, password)
        .then(response => {
          if (response.data.status === 'SUCCESS') {
            successNotification('Password successfully reset');
            history.replace('/login');
          }
        })
        .catch(() => {
          errorNotification('Password reset error');
        });
    }
  };

  const onEnterKeyPress = (e) => {
    if(e.keyCode === 13) {
      checkPasswordMatch()
    }
  }


  return (
    <div className="content-container">
      <img alt="linkfluencer" src={linkFluencer} className="logo" />
      <div className="form">
        <div className="form--detail-container">
          <div className="detail-icon">
            <img alt="password" src={padlock} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter New Password"
            value={password}
            onChange={e => setPassword(e.target.value.toString().trim())}
            onFocus={(e) => {e.target.placeholder = ""}}
            onBlur={(e) => {e.target.placeholder = "Enter New Password"}}
            onKeyDown={onEnterKeyPress}
          />
          <button
            className="show-hide-eye-btn"
            type="button"
            onClick={() => setShowPassword(e => !e)}
          >
            <img
              alt="hide-pswrd"
              className="show-hide-pswrd"
              src={showPassword ? showPass : hideInterface}
            />
          </button>
        </div>
        <div className="form--detail-container">
          <div className="detail-icon">
            <img alt="confirmPassword" src={padlock} />
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value.toString().trim())}
            onFocus={(e) => {e.target.placeholder = ""}}
            onBlur={(e) => {e.target.placeholder = "Confirm New Password"}}
            onKeyDown={onEnterKeyPress}
          />
          <button
            className="show-hide-eye-btn"
            type="button"
            onClick={() => setShowConfirmPassword(e => !e)}
          >
            <img
              alt="hide-pswrd"
              className="show-hide-pswrd"
              src={showConfirmPassword ? showPass : hideInterface}
            />
          </button>
        </div>

        <button
          type="button"
          className="button success-button login-button"
          onClick={checkPasswordMatch}
        >
          SET NEW PASSWORD
        </button>
      </div>
    </div>
  );
}

export default SetNewPassword;
