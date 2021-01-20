import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import User from '../../../assets/images/avatar.jpg';
import { getInviteeSubscribers } from '../../../redux/actions/subscribersAction/SubscribersAction';

const Invited = () => {
  const dispatch = useDispatch();
  const invitee = useSelector(state => state.subscrberReducer.invite);
  useEffect(() => {
    dispatch(getInviteeSubscribers());
  }, []);
  return (
    <>
      <div>
        <div>
          <div className="admin-table mt-40">
            <div className="tr heading">
              <div className="admin-table-details">
                <div className="td">NAME</div>
                <div className="td">EMAIL</div>
                <div className="td">PHONE</div>
              </div>
            </div>
            {invitee && invitee.data && invitee.data.length > 0 ? (
              <>
                {invitee.data.map(value => (
                  <div className="row-container" key={value._id}>
                    <div className="tr">
                      <div className="admin-table-details">
                        <div className="td name">
                          <img
                            src={
                              value && value.profilePicUrl && value.profilePicUrl
                                ? value.profilePicUrl
                                : User
                            }
                          />
                          {value.firstName}
                        </div>

                        <div className="td">{value.email}</div>
                        <div className="td">{value.phone}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="row-container">
                  <div className="tr">
                    <div className="admin-table-details ">Empty Data</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Invited;
