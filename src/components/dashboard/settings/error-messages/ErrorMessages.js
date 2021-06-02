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
  const errorData = useSelector(({errorMessage}) => errorMessage ?? []);
  const [error, setError] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    dispatch(getAllErrorMessage());
  }, []);

  useEffect(() => {
    if (errorData?.length > 0) {
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

    const temp = error?.map(e => (e._id === _id ? newData : e));

    setError(temp);
  };

  const saveChangeError = () => {
    if (isChanged) {
      const data = {
        errorMessages: error,
      };

      dispatch(updateErrorMessage(data));
    } else {
      errorNotification('You have not made any changes');
    }
  };

  return (
    <>
      { errorData?.length !== 0  ? (<>
      <div className="error-message-list">
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
      </div>
        <div>
          <button
            className="button success-button mt-20"
            type="button"
            onClick={() => saveChangeError()}
          >
            Save
          </button>
        </div>
        </>
      ) : <div className='no-error-container'>No Data Available</div>}
    </>
  );
}

export default ErrorMessages;
