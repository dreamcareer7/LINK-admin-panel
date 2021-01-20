import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import User from '../../../../assets/images/dummy-user.jpg';
import {
  deleteSubscribers,
  getCompanySize,
  getIndutries,
  getSubscribersById,
} from '../../../../redux/actions/subscribersAction/SubscribersAction';
import './Editsubscribers.scss';

const AddSubscribers = () => {
  const { subId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.subscrberReducer.getById);
  const { company, industries } = useSelector(state => state.subscrberReducer);
  const [form, setFormValue] = useState({
    username: '',
    email: '',
    phone: '',
    subscription_date: '',
    lifetime_payment: '',
    gender: '',
    location: '',
    sub_type: '',
    ave_dealvalue: '',
    industry: '',
    company_size: '',
    vic_sub: '',
    status: '',
  });

  const updateField = e => {
    console.log(e.target.value);
    setFormValue({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getCompanySize());
    dispatch(getIndutries());
    if (subId) {
      dispatch(getSubscribersById(subId));
    }
    if (data && data.client) {
      if (data.client && data.client) {
        setFormValue({
          username: data.client.firstName && data.client.firstName,
          email: data.client.email && data.client.email,
          phone: data.client.phone && data.client.phone,
          subscription_date: moment(data.client.createdAt && data.client.createdAt).format(
            'yyyy-MM-DD'
          ),
          lifetime_payment: data.client.lifetime_payment && data.client.lifetime_payment,
          gender: data.client.gender && data.client.gender,
          location: data.client.companyLocation && data.client.companyLocation,
          sub_type: data.client.selectedPlan && data.client.selectedPlan.status,
          ave_dealvalue: data.client.ave_dealvalue && data.client.ave_dealvalue,
          industry: data.client.industry && data.client.industry,
          company_size: data.client.company_size && data.client.company_size,
          vic_sub: data.client.vic_sub && data.client.vic_sub,
          status: data.client.status && data.client.status,
        });
      }
    }
  }, [
    data && data.client && data.client.firstName,
    data && data.client && data.client.email,
    data && data.client && data.client.phone,
    data && data.client && data.client.subscription_date,
    data && data.client && data.client.lifetime_payment,
    data && data.client && data.client.gender,
    data && data.client && data.client.location,
    data && data.client && data.client.selectedPlan && data.client.selectedPlan.status,
    data && data.client && data.client.ave_dealvalue,
    data && data.client && data.client.industry,
    data && data.client && data.client.company_size,
    data && data.client && data.client.vic_sub,
    data && data.client && data.client.status,
  ]);

  const onSubmitSub = e => {
    e.preventDefault();
    const formData = {
      firstName: form.username,
      email: form.email,
      phone: form.phone,
      industry: form.industry,
      gender: form.gender,
      companyLocation: form.location,
      selectedPlan: {
        currentPlan: form.sub_type,
      },
    };
    console.log(formData);
    // dispatch(updateSubscribers(subId, data));
  };

  const onDiscardChanges = () => {};

  const onDeleteSubscribers = () => {
    dispatch(deleteSubscribers(subId));
    history.push('/subscribers');
  };
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
          <form onSubmit={onSubmitSub}>
            <div className="admin-detail mt-20">
              <div id="name" className="mr-20">
                <div className="common-title mb-5">Name</div>
                <input
                  value={form.username}
                  name="username"
                  onChange={updateField}
                  className="common-input"
                  placeholder="Michelle Obama"
                  type="text"
                />
              </div>
              <div id="email" className="mr-20">
                <div className="common-title mb-5">Email</div>
                <input
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  className="common-input"
                  type="text"
                  placeholder="michelle@abcmedia.com"
                />
              </div>
              <div id="phone">
                <div className="common-title mb-5">Phone</div>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={updateField}
                  className="common-input"
                  type="text"
                  placeholder="(+61)545-589-9977"
                />
              </div>
            </div>
            <div className="admin-detail mt-33">
              <div className="mr-20">
                <div className="common-title mb-5">Subscription Date</div>
                <input
                  name="subscription_date"
                  value={form.subscription_date}
                  onChange={updateField}
                  className="common-input"
                  type="date"
                />
              </div>
              <div className="mr-20">
                <div className="common-title mb-5">Lifetime Payments</div>
                <input
                  value={form.lifetime_payment}
                  name="lifetime_payment"
                  onChange={updateField}
                  className="common-input"
                  type="text"
                  placeholder="michelle@abcmedia.com"
                />
              </div>
            </div>
            <div className="admin-detail mt-40">
              <div className="mr-20">
                <div className="common-title mb-5">Gender</div>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={updateField}
                  className="common-input"
                >
                  <option value="FEMALE">Female</option>
                  <option value="MALE">Male</option>
                  <option value="OTHER">Others</option>
                </select>
              </div>
              <div className="mr-20">
                <div className="common-title mb-5">Location</div>
                <select name="location" onChange={updateField} className="common-input">
                  <option>India</option>
                  <option>Australia</option>
                  <option>UAE</option>
                </select>
              </div>
              <div className="mr-20">
                <div className="common-title mb-5">Subscription Type</div>
                <select
                  name="sub_type"
                  value={form.sub_type}
                  onChange={updateField}
                  className="common-input"
                >
                  <option value="FREE_TRIAL">Free Trial</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="YEARLY">Yearly</option>
                  <option value="PAUSED">Paused</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="admin-detail mt-40">
              <div className="mr-20">
                <div className="common-title mb-5">Average Deal Value</div>
                <select name="ave_dealvalue" onChange={updateField} className="common-input">
                  <option>$100-$200</option>
                  <option>$300-$400</option>
                  <option>$500-$1000</option>
                </select>
              </div>
              <div className="mr-20">
                <div className="common-title mb-5">Industry</div>
                <select className="common-input" value={form.industry} name="industry">
                  {industries &&
                    industries.data &&
                    industries.data.map(value => <option key={value}>{value}</option>)}
                </select>
              </div>
              <div className="mr-20">
                <div className="common-title mb-5">Company Size</div>
                <select
                  className="common-input"
                  value={form.company_size}
                  onChange={updateField}
                  name="company_size"
                >
                  {company &&
                    company.data &&
                    company.data.map(value => <option key={value}>{value}</option>)}
                </select>
              </div>
            </div>
            <div className="admin-detail mt-40">
              <div className="mr-20" onChange={updateField}>
                <div className="common-title mb-5">VIC Subscriber?</div>
                <select className="common-input" onChange={updateField} name="vic_sub">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="mr-20">
                <div className="common-title mb-5">Status</div>
                <select className="common-input" onChange={updateField} name="status">
                  <option>Active</option>
                  <option>In Active</option>
                </select>
              </div>
            </div>
            <div className="buttons-row mt-40">
              <button type="submit" className="button success-button mr-10">
                SAVE CHANGES
              </button>
              <button
                type="button"
                onClick={onDiscardChanges}
                className="button primary-button mr-10"
              >
                DISCARD CHANGES
              </button>
              <button
                type="button"
                onClick={onDeleteSubscribers}
                className="button danger-button mr-10"
              >
                DELETE SUBSCRIBER
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSubscribers;
