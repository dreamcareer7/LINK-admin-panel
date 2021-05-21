import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import User from '../../../../assets/images/user.jpg';
import {
  deleteSubscribers,
  getCompanySize,
  getIndutries,
  getSubscribersById, resetSubscriberInfo,
  updateSubscribers,
} from '../../../../redux/actions/subscribersAction/SubscribersAction';
import './Editsubscribers.scss';
import { getLabelFromValues } from '../../../../helpers/mappingHelper';
import subTypeObject from '../../../../helpers/Mapper';
import Modal from "../../../commonComponents/Modal/Modal";

const AddSubscribers = () => {
  const { subId } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();
  const { data } = useSelector(state => state?.subscrberReducer?.getById ?? {});
  const { company, industries } = useSelector(state => state?.subscrberReducer);
  const [isModelOpen, setIsModelOpen] = useState(false);
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
    companySize: '',
    vicSub: 'true',
    isActive: '',
  });

  const updateField = e => {
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
    return () => dispatch(resetSubscriberInfo());
  }, [subId]);

  useEffect(() => {
    if (data && data.client) {
      setFormValue({
        username: data.client.firstName && `${data.client.firstName} ${data.client.lastName}`,
        email: data.client.email && data.client.email,
        phone: data.client.phone && data.client.phone,
        subscription_date: moment(data.client.createdAt && data.client.createdAt).format(
          'yyyy-MM-DD'
        ),
        lifetime_payment: data.client.totalReceivedAmount && data.client.totalReceivedAmount,
        gender: data.client.gender ? data.client.gender : 'none',
        location: data.client.companyLocation && data.client.companyLocation,
        sub_type: data.client.selectedPlan && data.client.selectedPlan.status,
        ave_dealvalue: data.client.ave_dealvalue && data.client.ave_dealvalue,
        industry: data.client.industry ? data.client.industry : 'none',
        companySize: (data.client.companySize && data.client.companySize) || 'none',
        vicSub: data.client.vicSub && data.client.vicSub.toString(),
        isActive: data.client.isActive && data.client.isActive,
      });
    }
  }, [data]);

  const onSubmitSub = e => {
    e.preventDefault();

    const userName = form.username ? form.username.split(' ') : '';
      const formData = {
        firstName: (userName && userName[0] && userName[0].trim()) || '',
        lastName: (userName && userName[1] && userName[1].trim()) || '',
        email: (form.email && form.email.trim()) || '',
        phone: (form.phone && form.phone.trim()) || '',
        industry: form.industry && form.industry !== 'none' ? form.industry : undefined,
        gender: form.gender && form.gender !== 'none' ? form.gender : undefined,
        companyLocation: form.location && form.location.length === 0 ? '' : form.location,
        vicSub: form.vicSub,
        // totalReceivedAmount: parseInt(form.lifetime_payment, 10),
        companySize: form.companySize && form.companySize !== 'none' ? form.companySize : undefined,
        selectedPlan: {
          currentPlan: form.sub_type,
        },
      };

      dispatch(
        updateSubscribers(subId, formData, () => history.replace('/subscribers/subscribed'))
      );

  };

  const onDiscardChanges = () => {
    history.replace('/subscribers/subscribed');
  };

  const onClosePopup = () => {
    setIsModelOpen(false);
  };
  const onDeleteSubscribers = () => {
    setIsModelOpen(true);
  };
  const onDeleteData = () => {
    setIsModelOpen(false);
    dispatch(deleteSubscribers(subId));
    history.push('/subscribers/subscribed');
  };

  const subscriptionDifference = useMemo(() => {
    const current = moment();
    const subDate = moment(`${form.subscription_date}`, 'YYYY-MM-DD');

    return `${current.diff(subDate, 'years')} Years ${current.diff(
      subDate,
      'months'
    )} Months  ${current.diff(subDate, 'days')} Days`;
  }, [form.subscription_date]);

  return (
    <>
      {isModelOpen && (
              <Modal
                      description="Are you sure you want to delete this subscriber?"
                      title="Delete Subscriber"
                      deleteData={onDeleteData}
                      onClosePopup={onClosePopup}
              />
      )}
      <div className="edit-sub-container">
        <div className="breadcrumb-custom common-subtitle" style={{ marginBottom: '1rem' }}>
          <span onClick={() => history.replace('/subscribers/subscribed')}>SUBSCRIBERS&nbsp;</span>
          <span>/ EDIT</span>
        </div>
        <div className="d-flex">
          <img
            className="DP-image"
            src={
              data && data.client && data.client.profilePicUrl ? data.client.profilePicUrl : User
            }
          />

          <div className="edit-subscribers-right-container">
            <div className="sub-tag d-flex mt-30 mb-3">
              {form?.sub_type && <span className="monthly">{getLabelFromValues(form?.sub_type, subTypeObject)}</span>}
              {form.isActive && <span className="act">ACTIVE</span>}
              {form.vicSub === 'true' && <span className="vic">VIC</span>}
            </div>
            <form>
              <div className="admin-detail">
                <div id="name" className="mr-20">
                  <div className="common-title-black mar-bott-5">Name</div>
                  <input
                    value={form.username}
                    name="username"
                    onChange={updateField}
                    className="common-input"
                    placeholder="Enter their name"
                    type="text"
                    onFocus={e => {
                      e.target.placeholder = '';
                    }}
                    onBlur={e => {
                      e.target.placeholder = 'Enter their name';
                    }}
                  />
                </div>
                <div id="email" className="mr-20">
                  <div className="common-title-black mar-bott-5">Email</div>
                  <input
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    className="common-input"
                    type="text"
                    placeholder="Enter their email"
                    onFocus={e => {
                      e.target.placeholder = '';
                    }}
                    onBlur={e => {
                      e.target.placeholder = 'Enter their email';
                    }}
                    disabled
                  />
                </div>
                <div id="phone">
                  <div className="common-title-black mar-bott-5">Phone</div>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={updateField}
                    className="common-input"
                    type="text"
                    placeholder="Enter their phone number"
                    onFocus={e => {
                      e.target.placeholder = '';
                    }}
                    onBlur={e => {
                      e.target.placeholder = 'Enter their phone number';
                    }}
                  />
                </div>
              </div>
              <div className="admin-detail mt-30">
                <div className="mr-20">
                  <div className="common-title-black mar-bott-5">Subscription Date</div>
                  <input
                    name="subscription_date"
                    value={form.subscription_date}
                    onChange={updateField}
                    className="common-input"
                    type="date"
                    disabled
                  />
                  {form.subscription_date && (
                    <div className="edit-subscription-duration">{subscriptionDifference}</div>
                  )}
                </div>
                <div className="mr-20">
                  <div className="common-title-black mar-bott-5">Lifetime Payments</div>
                  <input
                    value={form.lifetime_payment}
                    name="lifetime_payment"
                    onChange={updateField}
                    className="common-input"
                    type="text"
                    placeholder="-"
                    disabled
                  />
                </div>
              </div>
              <div className="admin-detail mt-40">
                <div className="mr-20">
                  <div className="common-title-black mar-bott-5">Gender</div>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={updateField}
                    className="common-input"
                  >
                    <option value="none">Select</option>
                    <option value="FEMALE">Female</option>
                    <option value="MALE">Male</option>
                    <option value="OTHER">Others</option>
                  </select>
                </div>
                <div className="mr-20">
                  <div className="common-title-black mar-bott-5">Location</div>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter their location"
                    onFocus={e => {
                      e.target.placeholder = '';
                    }}
                    onBlur={e => {
                      e.target.placeholder = 'Enter their location';
                    }}
                    onChange={updateField}
                    className="common-input"
                    value={form.location}
                  />
                </div>
                <div className="mr-20">
                  <div className="common-title-black mar-bott-5">Subscription Type</div>
                  <select
                    name="sub_type"
                    value={form.sub_type}
                    onChange={updateField}
                    className="common-input"
                    disabled
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
                  <div className="common-title-black mar-bott-5">Average Deal Value</div>
                  <input
                    type="text"
                    name="ave_dealvalue"
                    onChange={updateField}
                    className="common-input"
                    value={`${form.ave_dealvalue ? `$ ${form.ave_dealvalue}` : ' - '}`}
                    disabled={!form.ave_dealvalue}
                  />
                </div>
                <div className="mr-20">
                  <div className="common-title-black mar-bott-5">Industry</div>
                  <select
                    className="common-input"
                    value={form.industry}
                    name="industry"
                    onChange={updateField}
                  >
                    <option value="none">None</option>
                    {industries &&
                      industries?.data &&
                      industries?.data?.map(value => <option key={value}>{value}</option>)}
                  </select>
                </div>
                <div className="mr-20">
                  <div className="common-title-black mar-bott-5">Company Size</div>

                  <select
                    className="common-input"
                    value={form.companySize}
                    onChange={updateField}
                    name="companySize"
                  >
                    <option value="none">None</option>
                    {company &&
                      company?.data &&
                      company?.data?.map(value => <option key={value}>{value}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-detail mt-40">
                <div className="mr-20" onChange={updateField}>
                  <div className="common-title-black mar-bott-5">VIC Subscriber?</div>
                  <select
                    className="common-input"
                    onChange={updateField}
                    name="vicSub"
                    value={form.vicSub}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="mr-20">
                  <div className="common-title-black mar-bott-5">Status</div>
                  <select
                    className="common-input"
                    onChange={updateField}
                    name="status"
                    disabled
                    value={form.isActive}
                  >
                    <option value="true">Active</option>
                    <option value="false">In Active</option>
                  </select>
                </div>
              </div>
              <div className="buttons-row edit-subscriber-buttons-row mt-40">
                <button type="submit" className="button success-button mr-10" onClick={onSubmitSub}>
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
                  DELETE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSubscribers;
