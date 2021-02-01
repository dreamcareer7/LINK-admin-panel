import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import linkFluencer from '../../../assets/images/linkfluencer.png';
import showPass from '../../../assets/images/showPass.svg';
import './login.scss';
import user from '../../../assets/images/user.jpg';
import padlock from '../../../assets/images/padlock.png';
import hidePass from '../../../assets/images/hidePass.svg';
import {
  checkForEmail,
  errorNotification,
  replaceHiddenCharacters,
} from '../../../constants/Toast';
import AuthTextInput from '../common/text-input/AuthTextInput';
import { loginUser } from '../../../redux/actions/authActions/AuthActions';
import toggleLoader from '../../../redux/actions/loaderActions/LoaderActions';

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedUser = useSelector(state => state.loggedUser);

  useEffect(() => {
    if (loggedUser !== null) {
      if (loggedUser.isTwoFAEnabled) {
        history.replace('/verificationPage');
      } else {
        history.replace('/dashboard');
      }
    }
  }, [loggedUser]);

  const onClickLoginButton = (inputUserName, inputPassword) => {
    if (inputUserName.toString().trim().length === 0) errorNotification('Please enter username');
    else if (!checkForEmail(replaceHiddenCharacters(inputUserName)))
      errorNotification('Please enter a valid username');
    else if (replaceHiddenCharacters(inputPassword.toString()).trim().length === 0)
      errorNotification('Please enter password');
    else {
      dispatch(toggleLoader(true));
      dispatch(loginUser(userName, password));
    }
  };

  return (
    <div className="login-content-container">
      <img alt="linkfluencer" src={linkFluencer} className="logo" />
      <div className="login-form">
        <AuthTextInput
          src={user}
          type="text"
          placeholder="Enter Username"
          value={userName}
          onChange={e => setUserName(e.target.value.toString().trim())}
        />
        <div className="form--detail-container">
          <div className="detail-icon">
            <img alt="password" src={padlock} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value.toString().trim())}
          />
          <button
            className="show-hide-eye-btn"
            type="button"
            onClick={() => setShowPassword(e => !e)}
          >
            <img
              alt="hide-pswrd"
              className="show-hide-pswrd"
              src={showPassword ? showPass : hidePass}
            />
          </button>
        </div>

        <button
          type="button"
          className="button success-button login-button"
          onClick={() => onClickLoginButton(userName, password)}
        >
          LOGIN
        </button>
        <a href="forgot" className="forgot-password">
          Forgot Password?
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
