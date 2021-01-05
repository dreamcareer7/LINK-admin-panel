import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { errorMessage } from '../../../../redux/actions/settingAction/SettingAction';
import './error-messages.scss';

function ErrorMessages() {
  const dispatch = useDispatch();
  const errorData = useSelector(state => state.errorMessage);
  const token = localStorage.getItem('userToken');
  useEffect(() => {
    dispatch(errorMessage(token));
  }, []);

  return (
    <div className="error-message-list">
      {errorData &&
        errorData.map(value => (
          <div className="common-input error-message" key={value._id}>
            <div className="common-title">{value && value.title && value.title}</div>
            <div className="common-content">{value && value.text && value.text} </div>
          </div>
        ))}
    </div>
  );
}

export default ErrorMessages;
