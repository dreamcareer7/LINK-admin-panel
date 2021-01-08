import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllErrorMessage,
  updateErrorMessage,
} from '../../../../redux/actions/settingAction/SettingAction';
import './error-messages.scss';

function ErrorMessages() {
  const dispatch = useDispatch();
  const errorData = useSelector(state => state.errorMessage);
  const [error, setError] = useState({
    title: '',
    text: '',
  });
  // const [title, setTitle] = useState();
  const [userId, setUserId] = useState();
  useEffect(() => {
    dispatch(getAllErrorMessage());
  }, []);

  const onErrorChange = id => {
    // console.log('onErrorChange', e.currentTarget.textContent, id);
    const titles = document.getElementById('title').textContent;
    const errorText = document.getElementById('text').textContent;
    setUserId(id);
    setError({
      title: titles,
      text: errorText,
    });
  };

  const saveChangeError = () => {
    console.log('error', error);
    dispatch(updateErrorMessage(userId, error));
  };

  return (
    <>
      <div className="error-message-list">
        {errorData && errorData.length > 0 ? (
          <>
            {errorData.map(value => (
              <React.Fragment key={value._id}>
                <div
                  contentEditable="true"
                  suppressContentEditableWarning="true"
                  onInput={() => onErrorChange(value._id)}
                  className="common-input error-message"
                >
                  <div
                    className="common-title"
                    id="title"
                    value={value && value.title && value.title}
                  >
                    {value && value.title && value.title}
                  </div>
                  <div id="text" className="common-content">
                    {value && value.text && value.text}{' '}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </>
        ) : (
          <div className="common-content">Error Message Empty</div>
        )}
      </div>
      {errorData && errorData.length > 0 && (
        <div>
          <button
            className="button success-button mt-5"
            type="button"
            onClick={() => saveChangeError()}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
}

export default ErrorMessages;
