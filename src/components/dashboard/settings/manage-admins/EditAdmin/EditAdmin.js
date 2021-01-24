import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import './EditAdmin.scss';
import Switch from 'react-switch';
import upload from '../../../../../assets/images/upload.jpg';
import user from '../../../../../assets/images/dummy-user.jpg';
import copy from '../../../../../assets/images/copy.svg';
import {
  addAdmin,
  changeAdminPass,
  editAdminById,
  generate2FA,
  getAdminById,
} from '../../../../../redux/actions/manageAdminAction/ManageAdminAction';
import AuthService from '../../../../../services/auth-services/AuthSevices';
import {
  errorNotification,
  successNotification,
  warningNotification,
} from '../../../../../constants/Toast';
import { configure2FA } from '../../../../../redux/actions/authActions/AuthActions';
import ManageAdminService from '../../../../../services/manage-admin/ManageAdminServices';

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

  const [adminLoggedIn, setAdminLoggedIn] = useState();

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [addImage, setAddImage] = useState(upload);

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
      setAdminLoggedIn(editAdmin && editAdmin.isLoggedIn && editAdmin.isLoggedIn);
      setAddImage(editAdmin && editAdmin.profilePic && editAdmin.profilePic);
      if (editAdmin && editAdmin.phone && editAdmin.isTwoFAEnabled !== null)
        setSelected(editAdmin && editAdmin.phone && editAdmin.isTwoFAEnabled);
    }
  }, [
    editAdmin && editAdmin.firstName && editAdmin.firstName,
    editAdmin && editAdmin.phone && editAdmin.isTwoFAEnabled,
    editAdmin && editAdmin.profilePic && editAdmin.profilePic,
  ]);

  const onClickUploadImg = () => {
    console.log('upload image');
    document.getElementById('imageDropBox').click();
  };

  const addProfilePic = event => {
    const formData = new FormData();
    formData.append('profile-pic', event.target.files[0]);
    ManageAdminService.uploadProfilePic(formData)
      .then(response => {
        if (response) {
          console.log('response of add image', response);
          successNotification('Image uploaded successfully');
          setAddImage(response.data.data.profilePicUrl);
        } else {
          errorNotification('It seems like server is down, Please try after sometime.');
        }
      })
      .catch(e => console.log(e));
  };

  const showUploadBtn = () => {
    setAddImage(upload);
    const img = addImage.split('/');
    const imgLength = img.length;
    const addPic = img[imgLength - 1];
    ManageAdminService.deleteProfilePic(addPic)
      .then(r => {
        if (r.data.status === 'SUCCESS') {
          successNotification('Image deleted successfully');
        }
      })
      .catch(e => {
        console.log(e);
        errorNotification('Error in deleting image');
      });
  };

  const onClickChangePass = () => {
    console.log({ currentPass, newPass, confirmPass });
    if (!currentPass || currentPass.trim().length === 0) {
      errorNotification('Please enter current password');
    } else if (!newPass || newPass.trim().length === 0) {
      errorNotification('Please enter new password');
    } else if (!confirmPass || confirmPass.trim().length === 0) {
      errorNotification('Please confirm different password');
    } else if (currentPass === newPass) {
      errorNotification('Please enter different password');
    } else if (newPass !== confirmPass) {
      warningNotification('Password does not match');
    } else {
      const data = {
        oldPassword: currentPass,
        newPassword: confirmPass,
      };
      dispatch(changeAdminPass(data));
    }
    setConfirmPass('');
    setCurrentPass('');
    setNewPass('');
  };

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
        profilePicUrl: addImage,
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

      {userId !== 'addAdmin' && adminLoggedIn ? (
        <>
          {addImage !== upload && (
            <button type="button" className="close-btn" onClick={showUploadBtn}>
              X
            </button>
          )}
          <img className="DP-image add-image" src={addImage} onClick={onClickUploadImg} />
          <input
            id="imageDropBox"
            style={{ display: 'none' }}
            type="file"
            accept={'image/*'}
            onChange={addProfilePic}
          />
        </>
      ) : (
        <img className="DP-image" src={user} />
      )}

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
      {userId !== 'addAdmin' && (
        <div style={{ marginTop: 30 }}>
          <div className="admin-detail">
            <div id="name" className="mr-20">
              <div className="common-title mb-5">Current Password</div>
              <input
                className="common-input"
                name="currentPass"
                placeholder="current password"
                type="password"
                value={currentPass}
                onChange={e => setCurrentPass(e.target.value)}
              />
            </div>

            <div id="newPass" className="mr-20">
              <div className="common-title mb-5">New password</div>
              <input
                className="common-input"
                type="password"
                name="newPass"
                placeholder="new password"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
              />
            </div>
            <div id="confirmPass" className="mr-20">
              <div className="common-title mb-5">Confirm Password</div>
              <input
                className="common-input"
                type="password"
                name="confirmPass"
                placeholder="confirm password"
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
              />
            </div>
          </div>
          <div className="buttons-row">
            <button
              type="button"
              className="button success-button mr-10"
              onClick={onClickChangePass}
            >
              CHANGE PASSWORD
            </button>
            {/*   <button type="button" className="button primary-button mr-10">
              UPDATE
            </button>  */}
          </div>
        </div>
      )}

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
