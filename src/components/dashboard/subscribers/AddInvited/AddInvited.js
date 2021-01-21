import React from 'react';
import user from "../../../../assets/images/dummy-user.jpg";

function AddInvited() {
  return (<div className="add-invited-container">
    <div className="breadcrumb common-subtitle">
      <span>MANAGE INVITED </span>
      <span>/ Add Invited</span>
    </div>

    <img className="DP-image" src={user} />

    <div className="admin-detail">
      <div id="name" className="mr-20">
        <div className="common-title mb-5">Name</div>
        <input
            className="common-input"
            name="name"
            placeholder="Michelle Obama"
            type="text"
        />
      </div>
      <div id="email" className="mr-20">
        <div className="common-title mb-5">Email</div>
        <input
            className="common-input"
            name="email"
            type="text"
            placeholder="michelle@abcmedia.com"
        />
      </div>
      <div id="phone">
        <div className="common-title mb-5">Phone</div>
        <input
            className="common-input"
            type="text"
            name="phone"
            placeholder="(+61)545-589-9977"
        />
      </div>
    </div>

        <div className="buttons-row">
          <button
              type="button"
              className="button success-button mr-10"
          >
            ADD INVITED
          </button>
          <button type="button" className="button primary-button mr-10">
            CANCEL
          </button>
        </div>


  </div>);
}

export default AddInvited;
