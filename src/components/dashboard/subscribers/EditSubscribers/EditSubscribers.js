import React from 'react';
import User from '../../../../assets/images/dummy-user.jpg';
import './Editsubscribers.scss';

const AddSubscribers = () => {
  return (
    <>
      <div className="edit-sub-container">
        <div className="breadcrumb common-subtitle">
          <span>SUBSCRIBERS </span>
          <span>/ EDIT / EDIT SUBSCRIBERS</span>
        </div>
        <div className="column-5">
          <img className="DP-image" src={User} />
        </div>
        <div className="column-95">
          <div className="sub-tag d-flex mt-33">
            <span className="monthly">MONTHLY</span>
            <span className="act">ACTIVE</span>
            <span className="vic">VIC</span>
          </div>

          <div className="admin-detail mt-20">
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
          <div className="admin-detail mt-33">
            <div className="mr-20">
              <div className="common-title mb-5">Subscription Date</div>
              <input className="common-input" name="sub_date" type="date" />
            </div>
            <div className="mr-20">
              <div className="common-title mb-5">Lifetime Payments</div>
              <input
                className="common-input"
                name="email"
                type="text"
                placeholder="michelle@abcmedia.com"
              />
            </div>
          </div>
          <div className="admin-detail mt-40">
            <div className="mr-20">
              <div className="common-title mb-5">Gender</div>
              <select className="common-input">
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
            </div>
            <div className="mr-20">
              <div className="common-title mb-5">Location</div>
              <select className="common-input">
                <option>India</option>
                <option>Australia</option>
                <option>UAE</option>
              </select>
            </div>
            <div className="mr-20">
              <div className="common-title mb-5">Subscription Type</div>
              <select className="common-input">
                <option>Free Trial</option>
                <option>Monthly</option>
                <option>Yearly</option>
                <option>Paused</option>
              </select>
            </div>
          </div>
          <div className="admin-detail mt-40">
            <div className="mr-20">
              <div className="common-title mb-5">Average Deal Value</div>
              <select className="common-input">
                <option>$100-$200</option>
                <option>$300-$400</option>
                <option>$500-$1000</option>
              </select>
            </div>
            <div className="mr-20">
              <div className="common-title mb-5">Industry</div>
              <select className="common-input">
                <option>Computer Software</option>
                <option>Automotive</option>
                <option>Information Technology</option>
              </select>
            </div>
            <div className="mr-20">
              <div className="common-title mb-5">Company Size</div>
              <select className="common-input">
                <option>1-10</option>
                <option>20-30</option>
                <option>30-40</option>
                <option>51-100</option>
              </select>
            </div>
          </div>
          <div className="admin-detail mt-40">
            <div className="mr-20">
              <div className="common-title mb-5">VIC Subscriber?</div>
              <select className="common-input">
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="mr-20">
              <div className="common-title mb-5">Status</div>
              <select className="common-input">
                <option>Active</option>
                <option>In Active</option>
              </select>
            </div>
          </div>
          <div className="buttons-row mt-40">
            <button type="button" className="button success-button mr-10">
              SAVE CHANGES
            </button>
            <button type="button" className="button primary-button mr-10">
              DISCARD CHANGES
            </button>
            <button type="button" className="button danger-button mr-10">
              DELETE SUBSCRIBER
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSubscribers;
