import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addInviteeSubscribers } from '../../../../redux/actions/subscribersAction/SubscribersAction';
import { checkForEmail, errorNotification } from '../../../../constants/Toast';

function AddInvited() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const onCancelInvited = () => {
    history.replace('/subscribers');
  };
  const addInvited = () => {
    const userName = name.split(' ');
    if ((!name && !userName) || (userName && userName.toString().trim().length === 0)) {
      errorNotification('Please enter invitee name');
    }else if(!userName[1] || userName[1] && userName[1].toString().trim().length === 0){
      errorNotification('Please specify last name');
    }
    else if (!email || (email && email.toString().trim().length === 0)) {
      errorNotification('Please enter invitee email');
    } else if (!checkForEmail(email)) {
      errorNotification('Please valid email');
    } else if (!phone || (phone && phone.toString().trim().length === 0)) {
      errorNotification('Please enter invitee phone');
    }
    else {
      const data = {
        firstName: userName[0],
        lastName: userName[1] || '',
        email,
        phone,
      };
      dispatch(addInviteeSubscribers(data));
      history.push('/subscribers');
    }
  };

  return (
    <div className="add-invited-container">
      <div className="breadcrumb common-subtitle">
        <span>MANAGE INVITED </span>
        <span>/ Add Invited</span>
      </div>

      <div className="admin-detail">
        <div id="name" className="mr-20">
          <div className="common-title mb-5">Name</div>
          <input
            className="common-input"
            value={name}
            name="name"
            placeholder="Michelle Obama"
            type="text"
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div id="email" className="mr-20">
          <div className="common-title mb-5">Email</div>
          <input
            className="common-input"
            value={email}
            name="email"
            type="text"
            placeholder="michelle@abcmedia.com"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div id="phone">
          <div className="common-title mb-5">Phone</div>
          <input
            className="common-input"
            value={phone}
            type="text"
            name="phone"
            placeholder="(+61)545-589-9977"
            onChange={e => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="buttons-row">
        <button type="button" className="button success-button mr-10" onClick={addInvited}>
          ADD INVITED
        </button>
        <button type="button" className="button primary-button mr-10" onClick={onCancelInvited}>
          CANCEL
        </button>
      </div>
    </div>
  );
}

export default AddInvited;
