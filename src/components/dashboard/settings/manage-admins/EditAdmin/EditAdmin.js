import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import './EditAdmin.scss';
import Switch from 'react-switch';
import user from '../../../../../assets/images/dummy-user.jpg';
import copy from '../../../../../assets/images/copy.svg';
import {
  addAdmin,
  editAdminById,
  generate2FA,
  getAdminById,
} from '../../../../../redux/actions/manageAdminAction/ManageAdminAction';
import AuthService from '../../../../../services/auth-services/AuthSevices';
import { errorNotification, successNotification } from '../../../../../constants/Toast';
import { configure2FA } from '../../../../../redux/actions/authActions/AuthActions';

function EditAdmin() {
  const { userId } = useParams();
  const history = useHistory();
  const admin = useSelector(state => state.Admin2FAReducer);
  const editAdmin = useSelector(state => state.editAdminReducer);
  const [otp, setOtp] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [show2Fa, set2FaShow] = useState(false);
  const [selected, setSelected] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (userId !== 'addAdmin') {
      dispatch(getAdminById(userId));
    }
  }, []);

  useEffect(() => {
    if (userId !== 'addAdmin') {
      setAdminName(editAdmin && editAdmin.firstName && editAdmin.firstName);
      setAdminEmail(editAdmin && editAdmin.email && editAdmin.email);
      setAdminPhone(editAdmin && editAdmin.phone && editAdmin.phone);
      if (editAdmin && editAdmin.phone && editAdmin.isTwoFAEnabled !== null)
        setSelected(editAdmin && editAdmin.phone && editAdmin.isTwoFAEnabled);
    }
  }, [
    editAdmin && editAdmin.firstName && editAdmin.firstName,
    editAdmin && editAdmin.phone && editAdmin.isTwoFAEnabled,
  ]);

  const onCancel = () => {
    history.push('/settings/manageAdmin');
  };

  const onUpdateAdminEvent = () => {
    const data = {
      firstName: adminName,
      email: adminEmail,
      phone: adminPhone,
    };
    dispatch(editAdminById(userId, data));
    history.push('/settings/manageAdmin');
  };

  const onChangeSwitch = async e => {
    set2FaShow(e);
    setSelected(e);
    if (e) {
      dispatch(generate2FA());
    } else {
      dispatch(configure2FA({ twoFAStatus: false }));
    }
  };

  const onClickVerify = () => {
    const token = localStorage.getItem('userToken');
    AuthService.verify2faLogin(token, otp)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          successNotification('OTP is verified');
          dispatch(AuthService.configure2FA({ twoFAStatus: true, code: otp }));
        }
      })
      .catch(e => {
        errorNotification('Verification is failde. Please try again', e);
      });
  };

  const onClickSaveAdmin = async () => {
    if (adminName.toString().trim().length === 0) {
      errorNotification('Please enter Name!!');
    } else if (adminEmail.length === 0) {
      errorNotification('Please enter Email!!');
    } else if (adminPhone.length === 0) {
      errorNotification('Please enter Phone no!!');
    } else if (adminName && adminEmail && adminPhone) {
      const data = {
        firstName: adminName,
        email: adminEmail,
        phone: adminPhone,
      };
      if (userId !== 'addAdmin') {
        dispatch(editAdminById((userId, data)));
      } else {
        dispatch(addAdmin(data));
      }
      history.push('/settings/manageAdmin/');
    }
  };

  const copyToClipboard = e => {
    console.log(e);
  };

  const handleChange = userOtp => setOtp(userOtp);
  return (
    <div className="edit-admin-container">
      <div className="breadcrumb common-subtitle">
        <span>MANAGE ADMINS </span>
        {userId === 'addAdmin' && <span>/ Add Admin</span>}
        {userId !== 'addAdmin' && <span>/ EDIT / UPDATE PROFILE</span>}
      </div>

      <img className="DP-image" src={user} />

      <div className="admin-detail">
        <div id="name" className="mr-20">
          <div className="common-title mb-5">Name</div>
          <input
            className="common-input"
            name="name"
            placeholder="Michelle Obama"
            value={adminName ?? ''}
            type="text"
            onChange={e => setAdminName(e.target.value)}
          />
        </div>
        <div id="email" className="mr-20">
          <div className="common-title mb-5">Email</div>
          <input
            className="common-input"
            value={adminEmail ?? ''}
            name="email"
            type="text"
            onChange={e => setAdminEmail(e.target.value)}
            placeholder="michelle@abcmedia.com"
          />
        </div>
        <div id="phone">
          <div className="common-title mb-5">Phone</div>
          <input
            className="common-input"
            value={adminPhone ?? ''}
            type="text"
            name="phone"
            onChange={e => setAdminPhone(e.target.value)}
            placeholder="(+61)545-589-9977"
          />
        </div>
      </div>

      {userId === 'addAdmin' && (
        <div className="buttons-row">
          <button
            type="button"
            className="button success-button mr-10"
            onClick={() => onClickSaveAdmin()}
          >
            ADD ADMIN
          </button>
          <button type="button" className="button primary-button mr-10" onClick={() => onCancel()}>
            CANCEL
          </button>
        </div>
      )}

      {userId && userId !== 'addAdmin' && (
        <>
          {editAdmin && editAdmin.isLoggedIn && (
            <>
              <div className="common-title mb-5 mt-20">2-Step Authenticator</div>
              <Switch
                checked={selected}
                onChange={e => onChangeSwitch(e)}
                onColor="#00A8FF"
                onHandleColor="#07084B"
                handleDiameter={18}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={26}
                width={55}
                className="react-switch"
                id="material-switch"
              />{' '}
              {editAdmin && editAdmin.isTwoFAEnabled && <p className="text-2fa">2FA is enable</p>}
              {show2Fa ? (
                <>
                  {editAdmin && !editAdmin.isTwoFAEnabled && (
                    <>
                      <div className="step-container">
                        <div className="common-title step-title">STEP 1</div>
                        <div className="common-subtitle">
                          Scan this Barcode in Authenticator App
                        </div>
                        <img className="barcode" src={admin && admin.qrCode} />
                        <div className="common-title mb-5 info-text-color">OR</div>
                        <div className="common-subtitle">Enter this Key Authenticator App</div>
                        <div className="key-container common-text-background">
                          <label>{admin && admin.twoFASecretKey}</label>
                          <img src={copy} onClick={e => copyToClipboard(e)} title="Copy Key" />
                        </div>
                      </div>

                      <div className="step-container">
                        <div className="common-title step-title">STEP 2</div>
                        <div className="common-subtitle">
                          <div>Enter the 6 digit Code you see in your Authenticator App</div>
                          <div className="code-container">
                            <OtpInput
                              value={otp}
                              isInputNum
                              onChange={handleChange}
                              className=""
                              numInputs={6}
                              separator={<span className="mr-5"> </span>}
                            />

                            <button
                              type="button"
                              className="button"
                              onClick={() => onClickVerify()}
                            >
                              VERIFY CODE
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                ''
              )}
            </>
          )}

          <div className="buttons-row">
            <button
              type="submit"
              className="button success-button mr-10"
              onClick={() => onUpdateAdminEvent()}
            >
              SUBMIT
            </button>
            <button
              type="button"
              className="button primary-button mr-10"
              onClick={() => onCancel()}
            >
              CANCEL
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default EditAdmin;
