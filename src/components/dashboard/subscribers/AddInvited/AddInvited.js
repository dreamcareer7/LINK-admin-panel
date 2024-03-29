/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addInvitee,
  editInvitee, resetInvitee,
  updateInvitee,
} from '../../../../redux/actions/subscribersAction/SubscribersAction';
import {checkForEmail, errorNotification} from '../../../../constants/Toast';

function AddInvited() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const editInvited = useSelector(({selectedInvitee}) => selectedInvitee ?? {});
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    if (userId !== 'addInvited') {
      dispatch(editInvitee(userId));
    }
    return () => dispatch(resetInvitee())
  }, []);
  useEffect(() => {
    if (userId !== 'addInvited') {
      setName(
        editInvited && editInvited.firstName && `${editInvited.firstName} ${editInvited.lastName}`
      );
      setEmail(editInvited && editInvited && editInvited.email && editInvited.email);
      setPhone(editInvited && editInvited.phone && editInvited.phone);
    }
  }, [
    editInvited && editInvited.firstName && editInvited.firstName,
    editInvited && editInvited.lastName && editInvited.lastName,
    editInvited && editInvited.phone && editInvited.isTwoFAEnabled,
    editInvited && editInvited.profilePic && editInvited.profilePic,
  ]);
  const onCancelInvited = () => {
    history.goBack();
  };

  const addInvited = () => {
    const userName = name.split(' ');

    if ((!name && !userName) || (userName && userName.toString().trim().length === 0)) {
      errorNotification('Please enter their name');
    } else if (!email || (email && email.toString().trim().length === 0)) {
      errorNotification('Please enter their email address');
    } else if (!checkForEmail(email)) {
      errorNotification('Please enter a valid email address');
    } else if (!phone || (phone && phone.toString().trim().length === 0)) {
      errorNotification('Please enter their phone number');
    } else {
      const data = {
        firstName: userName[0] || '',
        lastName: userName[2] ? `${userName[1]}  ${userName[2]}` : userName[1] || '',
        email: email && email.trim().toString(),
        phone,
      };
      const callback = () => {
        history.goBack();
      };
      if (userId === 'addInvited') {
        dispatch(addInvitee(data, callback));
      } else {
        dispatch(updateInvitee(userId, data, callback));
      }
    }
  };

  return (
    <div className="add-invited-container">
      <div className="breadcrumb-custom common-subtitle">
        <span onClick={() => history.goBack()}>MANAGE INVITED &nbsp; </span>
        {userId !== 'addInvited' ? <span>/ Edit Invited</span> : <span>/ Add</span>}
      </div>

      <div className="admin-detail">
        <div id="name" className="mr-20">
          <div className="common-title mar-bott-5">Name</div>
          <input
            className="common-input"
            value={name}
            name="name"
            placeholder="Enter their name"
            type="text"
            onChange={e => setName(e.target.value)}
            onFocus={e => {
              e.target.placeholder = '';
            }}
            onBlur={e => {
              e.target.placeholder = 'Enter their name';
            }}
          />
        </div>
        <div id="email" className="mr-20">
          <div className="common-title mar-bott-5">Email</div>
          <input
            className="common-input"
            value={email}
            name="email"
            type="text"
            placeholder="Enter their email"
            onChange={e => setEmail(e.target.value)}
            onFocus={e => {
              e.target.placeholder = '';
            }}
            onBlur={e => {
              e.target.placeholder = 'Enter their email';
            }}
            disabled={userId !== 'addInvited'}
          />
        </div>
        <div id="phone">
          <div className="common-title mar-bott-5">Phone</div>
          <input
            className="common-input"
            value={phone}
            type="text"
            name="phone"
            placeholder="Enter their phone number"
            onChange={e => setPhone(e.target.value)}
            onFocus={e => {
              e.target.placeholder = '';
            }}
            onBlur={e => {
              e.target.placeholder = 'Enter their phone number';
            }}
          />
        </div>
      </div>

      <div className="buttons-row">
        {userId !== 'addInvited' ? (
          <button type="button" className="button success-button mr-10" onClick={addInvited}>
            EDIT
          </button>
        ) : (
          <button type="button" className="button success-button mr-10" onClick={addInvited}>
            ADD
          </button>
        )}
        <button type="button" className="button primary-button mr-10" onClick={onCancelInvited}>
          CANCEL
        </button>
      </div>
    </div>
  );
}

export default AddInvited;
