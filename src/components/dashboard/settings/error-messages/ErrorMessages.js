import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllErrorMessage,
  updateErrorMessage,
} from '../../../../redux/actions/settingAction/SettingAction';
import './error-messages.scss';
import { errorNotification } from '../../../../constants/Toast';

function ErrorMessages() {
  const dispatch = useDispatch();
  const errorData = useSelector(state => state.errorMessage);
  const [error, setError] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    dispatch(getAllErrorMessage());
  }, []);

  useEffect(() => {
    if (errorData && errorData.length > 0) {
      setError(errorData);
    }
  }, [errorData]);

  const onErrorChange = _id => {
    setIsChanged(true);
    const text = document.getElementById(_id.toString()).textContent;
    const newData = {
      _id,
      text,
    };

    const temp = error.map(e => (e._id === _id ? newData : e));

    setError(temp);
  };

  const saveChangeError = () => {
    if (isChanged) {
      const data = {
        errorMessages: error,
      };

      console.log(JSON.stringify(data, null, 2));
      dispatch(updateErrorMessage(data));
    } else {
      errorNotification('You have not changed anything');
    }
  };

  return (
    <>
      <div className="error-message-list">
        {errorData && errorData.length > 0 ? (
          <>
            {errorData.map(value => (
              <React.Fragment key={value._id}>
                <div className="common-input error-message">
                  <div className="common-title" id="title">
                    {value && value.description && value.description}
                  </div>
                  <div
                    id={value._id.toString()}
                    className="common-content"
                    contentEditable="true"
                    suppressContentEditableWarning="true"
                    onInput={() => onErrorChange(value._id)}
                  >
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
