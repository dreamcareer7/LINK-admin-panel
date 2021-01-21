import React, {useEffect, useMemo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from "react-js-pagination";
import User from '../../../assets/images/avatar.jpg';
import {getInviteeSubscribers} from '../../../redux/actions/subscribersAction/SubscribersAction';


const Invited = () => {
  const dispatch = useDispatch();
  const allInvitee = useSelector(state => state.subscrberReducer.invite);
  const docs = useMemo(
      () => (allInvitee && allInvitee.data ? allInvitee.data : []),
      [allInvitee]
  );
  const  invitee = useMemo(() => (docs && docs.docs ? docs.docs : []), [docs]);
  const activePage = useMemo(() => (allInvitee && allInvitee.page ? allInvitee.page : 1), [allInvitee]);

  useEffect(() => {
    dispatch(getInviteeSubscribers(1));
  }, []);
  const handlePageChange = page =>{
    dispatch(getInviteeSubscribers(page))
  }
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
            {invitee && invitee.length > 0 ? (
                <>
              <div style={{minHeight:'75vh'}}>
                {invitee.map(value => (
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
              </div>
                  <Pagination
                      activePage={activePage}
                      itemsCountPerPage={10}
                      totalItemsCount={allInvitee.total || 1}
                      pageRangeDisplayed={3}
                      onChange={handlePageChange}
                      itemClass="page-item"
                      linkClass="page-link"
                  />
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
