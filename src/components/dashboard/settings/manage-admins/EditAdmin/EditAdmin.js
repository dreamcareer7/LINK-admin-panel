import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import './EditAdmin.scss';
import Switch from 'react-switch';
import upload from '../../../../../assets/images/upload.png';
import user from '../../../../../assets/images/user.jpg';
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
  checkForEmail,
  errorNotification,
  successNotification,
} from '../../../../../constants/Toast';
import { configure2FA } from '../../../../../redux/actions/authActions/AuthActions';
import ManageAdminService from '../../../../../services/manage-admin/ManageAdminServices';
import AUTH_REDUX_CONSTANTS from '../../../../../redux/constants/AuthReduxConstant';

function EditAdmin() {
  const { userId } = useParams();
  const history = useHistory();
  const admin = useSelector(state => state.Admin2FAReducer);
  const editAdmin = useSelector(state => state.editAdminReducer);
  const [twoFaCode, setTwoFaCode] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [selected, setSelected] = useState(false);

  const [adminLoggedIn, setAdminLoggedIn] = useState();

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [addImage, setAddImage] = useState(upload);
  const [deleteImageClick, setDeleteImageClick] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId !== 'addAdmin') {
      dispatch(getAdminById(userId));
    }
  }, []);

  useEffect(() => {
    if (userId !== 'addAdmin') {
      setAdminName(
        editAdmin &&
          editAdmin.firstName &&
          `${editAdmin.firstName} ${editAdmin.lastName ? editAdmin.lastName : ''}`
      );
      setAdminEmail(editAdmin && editAdmin.email && editAdmin.email);
      setAdminPhone(editAdmin && editAdmin.phone && editAdmin.phone);
      setAdminLoggedIn(editAdmin && editAdmin.isLoggedIn && editAdmin.isLoggedIn);
      setAddImage(editAdmin && editAdmin.profilePic ? editAdmin.profilePic : upload);
      if (editAdmin && editAdmin.phone && editAdmin.isTwoFAEnabled !== null)
        setSelected(editAdmin && editAdmin.phone && editAdmin.isTwoFAEnabled);
      setIsVerified(editAdmin && editAdmin.phone && editAdmin.isTwoFAEnabled);
    }
  }, [
    editAdmin && editAdmin.firstName && editAdmin.firstName,
    editAdmin && editAdmin.lastName && editAdmin.lastName,
    editAdmin && editAdmin.phone && editAdmin.isTwoFAEnabled,
    editAdmin && editAdmin.profilePic && editAdmin.profilePic,
  ]);

  const onClickUploadImg = () => {
    document.getElementById('imageDropBox').click();
  };

  const addProfilePic = event => {
    const formData = new FormData();
    formData.append('profile-pic', event.target.files[0]);
    ManageAdminService.uploadProfilePic(formData)
      .then(response => {
        if (response) {
          successNotification('Image uploaded successfully');
          setAddImage(response.data.data.profilePicUrl);
          /* dispatch({
            type: AUTH_REDUX_CONSTANTS.CHANGE_USER_DATA,
            data: { profilePic: response.data.data.profilePicUrl },
          }); */
        } else {
          errorNotification('It seems like server is down, Please try after sometime.');
        }
      })
      .catch(e => console.log(e));
  };

  const showUploadBtn = () => {
    setAddImage(upload);
    setDeleteImageClick(true);

    /*  const img = addImage.split('/');
    const imgLength = img.length;
    const addPic = img[imgLength - 1];
    ManageAdminService.deleteProfilePic(addPic)
      .then(r => {
        if (r.data.status === 'SUCCESS') {
          successNotification('Image deleted successfully');
          setDeleteImageClick(true);
          /!* dispatch({
            type: AUTH_REDUX_CONSTANTS.CHANGE_USER_DATA,
            data: { profilePic: null },
          }); *!/
        }
      })
      .catch(e => {
        console.log(e);
        errorNotification('Error in deleting image');
      }); */
  };

  const onClickChangePass = () => {
    if (!currentPass || currentPass.trim().length === 0) {
      errorNotification('Please enter current password');
    } else if (!newPass || newPass.trim().length === 0) {
      errorNotification('Please enter new password');
    } else if (!confirmPass || confirmPass.trim().length === 0) {
      errorNotification('Please confirm different password');
    } else if (currentPass === newPass) {
      errorNotification('Please enter different password');
    } else if (newPass !== confirmPass) {
      errorNotification('Password does not match');
    } else {
      const data = {
        oldPassword: currentPass,
        newPassword: confirmPass,
      };
      dispatch(
        changeAdminPass(data, () => {
          setConfirmPass('');
          setCurrentPass('');
          setNewPass('');
        })
      );
    }
  };

  const onCancel = () => {
    history.push('/settings/manageAdmin');
  };

  const onUpdateAdminEvent = () => {
    const userName = adminName.split(' ');

    if (adminName.toString().trim().length === 0) {
      errorNotification('Please enter name');
    } else if (adminEmail.length === 0) {
      errorNotification('Please enter email address');
    } else if (!checkForEmail(adminEmail)) {
      errorNotification('Please add a valid email address');
    } else if (adminPhone.length === 0) {
      errorNotification('Please enter phone no');
    } else {
      const data = {
        firstName: userName[0] || '',
        lastName: userName[2] ? `${userName[1]}  ${userName[2]}` : userName[1] || '',
        email: adminEmail,
        phone: adminPhone,
        profilePic: addImage !== upload ? addImage : null,
      };
      dispatch(editAdminById(userId, data));
      history.push('/settings/manageAdmin');
      if (userId !== 'addAdmin' && editAdmin.isLoggedIn) {
        dispatch({
          type: AUTH_REDUX_CONSTANTS.CHANGE_USER_DATA,
          data: {
            firstName: userName[0] || '',
            lastName: userName[2] ? `${userName[1]}  ${userName[2]}` : userName[1] || '',
          },
        });
        dispatch({
          type: AUTH_REDUX_CONSTANTS.CHANGE_USER_DATA,
          data: { profilePic: addImage !== upload ? addImage : null },
        });
        if (deleteImageClick) {
          dispatch({
            type: AUTH_REDUX_CONSTANTS.CHANGE_USER_DATA,
            data: { profilePic: null },
          });
        }
      }
    }
  };

  const onChangeSwitch = async e => {
    setSelected(e);
    if (e) {
      dispatch(generate2FA());
    } else {
      setIsVerified(false);
      dispatch(configure2FA({ twoFAStatus: false }));
    }
  };

  const onClickVerify = () => {
    if (!twoFaCode || (twoFaCode && twoFaCode.trim().length === 0)) {
      errorNotification('Please enter 2fa code.');
    } else if (twoFaCode && twoFaCode.trim().length !== 6) {
      errorNotification('Please enter valid 2fa code.');
    } else {
      AuthService.configure2faLogin(selected, twoFaCode)
        .then(response => {
          if (response.data.status === 'SUCCESS') {
            setIsVerified(true);
            successNotification('2FA Code is verified');
          }
        })
        .catch(() => {
          errorNotification('2fa Verification is failed, Please try again.');
        });
    }
  };

  const onClickSaveAdmin = async () => {
    const userName = adminName.split(' ');
    if (adminName.toString().trim().length === 0) {
      errorNotification('Please enter name');
    } else if (adminEmail.length === 0) {
      errorNotification('Please enter email');
    } else if (!checkForEmail(adminEmail)) {
      errorNotification('Please enter valid email');
    } else if (adminPhone.length === 0) {
      errorNotification('Please enter phone no');
    } else if (adminName && adminEmail && adminPhone) {
      const data = {
        firstName: userName[0] || '',
        lastName: userName[2] ? `${userName[1]}  ${userName[2]}` : userName[1] || '',
        email: adminEmail && adminEmail.trim().toString(),
        phone: adminPhone,
      };
      if (userId !== 'addAdmin') {
        dispatch(editAdminById(userId, data, () => history.push('/settings/manageAdmin/')));
      } else {
        dispatch(addAdmin(data, () => history.push('/settings/manageAdmin/')));
      }
      // history.push('/settings/manageAdmin/');
    }
  };

  const copyToClipboard = e => {
    console.log(e);
  };

  const handleChange = userOtp => setTwoFaCode(userOtp);

  return (
    <div className="edit-admin-container">
      <div className="breadcrumb-custom common-subtitle">
        <span onClick={() => history.goBack()}>MANAGE ADMINS </span>
        {userId === 'addAdmin' && <span>/ Add</span>}
        {userId !== 'addAdmin' && <span>/ EDIT / UPDATE PROFILE</span>}
      </div>

      {userId !== 'addAdmin' && adminLoggedIn ? (
        <div className="profile-image-container">
          {addImage !== upload && (
            <button type="button" className="close-btn" onClick={showUploadBtn}>
              X
            </button>
          )}
          <img className="DP-image-edit add-image" src={addImage} onClick={onClickUploadImg} />
          <input
            id="imageDropBox"
            style={{ display: 'none' }}
            type="file"
            accept={'image/*'}
            onChange={addProfilePic}
          />
        </div>
      ) : (
        <img className="DP-image-edit" src={editAdmin ? editAdmin.profilePic : user} />
      )}

      <div className="admin-detail">
        <div id="name" className="mr-20">
          <div className="common-title mar-bott-5">Name</div>
          <input
            className="common-input"
            name="name"
            placeholder="John Smith"
            value={adminName ?? ''}
            type="text"
            onFocus={e => {
              e.target.placeholder = '';
            }}
            onBlur={e => {
              e.target.placeholder = 'John Smith';
            }}
            onChange={e => {
              setAdminName(e.target.value);
            }}
          />
        </div>
        <div id="email" className="mr-20">
          <div className="common-title mar-bott-5">Email</div>
          <input
            className="common-input"
            value={adminEmail ?? ''}
            name="email"
            type="text"
            onChange={e => setAdminEmail(e.target.value)}
            placeholder="john@abcmedia.com"
            onFocus={e => {
              e.target.placeholder = '';
            }}
            onBlur={e => {
              e.target.placeholder = 'john@abcmedia.com';
            }}
            disabled={userId !== 'addAdmin'}
          />
        </div>
        <div id="phone">
          <div className="common-title mar-bott-5">Phone</div>
          <input
            className="common-input"
            value={adminPhone ?? ''}
            type="text"
            name="phone"
            onChange={e => setAdminPhone(e.target.value)}
            placeholder="(+61)545-589-9977"
            onFocus={e => {
              e.target.placeholder = '';
            }}
            onBlur={e => {
              e.target.placeholder = '(+61)545-589-9977';
            }}
          />
        </div>
      </div>
      {userId !== 'addAdmin' && adminLoggedIn !== undefined && (
        <div style={{ marginTop: 30 }}>
          <div className="admin-detail">
            <div id="name" className="mr-20">
              <div className="common-title mar-bott-5">Current Password</div>
              <input
                className="common-input"
                name="currentPass"
                type="password"
                value={currentPass}
                placeholder="Enter Current Password"
                onChange={e => setCurrentPass(e.target.value)}
                onFocus={e => {
                  e.target.placeholder = '';
                }}
                onBlur={e => {
                  e.target.placeholder = 'Enter Current Password';
                }}
              />
            </div>

            <div id="newPass" className="mr-20">
              <div className="common-title mar-bott-5">New password</div>
              <input
                className="common-input"
                type="password"
                name="newPass"
                value={newPass}
                placeholder="Enter New Password"
                onChange={e => setNewPass(e.target.value)}
                onFocus={e => {
                  e.target.placeholder = '';
                }}
                onBlur={e => {
                  e.target.placeholder = 'Enter New Password';
                }}
              />
            </div>
            <div id="confirmPass" className="mr-20">
              <div className="common-title mar-bott-5">Confirm Password</div>
              <input
                className="common-input"
                type="password"
                name="confirmPass"
                value={confirmPass}
                placeholder="Confirm Password"
                onChange={e => setConfirmPass(e.target.value)}
                onFocus={e => {
                  e.target.placeholder = '';
                }}
                onBlur={e => {
                  e.target.placeholder = 'Confirm Password';
                }}
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
            ADD
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
              <div className="common-title mar-bott-5 mt-20">2-Step Authenticator</div>
              <div className="two-fa-container">
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
                {isVerified && <p className="text-2fa">2FA is enabled</p>}
              </div>

              {selected && !isVerified && (
                <>
                  <div className="step-container">
                    <div className="common-title step-title">STEP 1</div>
                    <div className="common-subtitle">Scan this Barcode in Authenticator App</div>
                    <img className="barcode" src={admin && admin.qrCode} />
                    <div className="common-title mar-bott-5 info-text-color">OR</div>
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
                          value={twoFaCode}
                          isInputNum
                          onChange={handleChange}
                          className=""
                          numInputs={6}
                          separator={<span className="mr-5"> </span>}
                        />

                        <button type="button" className="button" onClick={() => onClickVerify()}>
                          VERIFY CODE
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          <div className="buttons-row">
            <button
              type="submit"
              className="button success-button mr-10"
              onClick={() => onUpdateAdminEvent()}
            >
              SAVE
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
