import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-js-pagination';
import User from '../../../assets/images/avatar.jpg';
import {
  deleteInvitee,
  getInviteeSubscribers,
} from '../../../redux/actions/subscribersAction/SubscribersAction';
import bin from '../../../assets/images/delete.png';

const Invited = () => {
  const dispatch = useDispatch();
  const allInvitee = useSelector(state => state.subscrberReducer.invite);
  const [pageNum, setPageNum] = useState(1);
  const docs = useMemo(() => (allInvitee && allInvitee.data ? allInvitee.data : []), [allInvitee]);
  const invitee = useMemo(() => (docs && docs.docs ? docs.docs : []), [docs]);
  const activePage = useMemo(() => (allInvitee && allInvitee.page ? allInvitee.page : 1), [
    allInvitee,
  ]);

  useEffect(() => {
    dispatch(getInviteeSubscribers(1));
  }, []);
  const handlePageChange = page => {
    dispatch(getInviteeSubscribers(page));
    setPageNum(page);
  };
  const onDeleteInvitee = id => {
    dispatch(deleteInvitee(id));
    dispatch(getInviteeSubscribers(pageNum));
  };
  return (
    <>
      <div>
        <div>
          {invitee && invitee.length > 0 && (
            <div className="no-of-results-in-display">
              Showing {(allInvitee.data.page - 1) * allInvitee.data.limit + 1} to{' '}
              {allInvitee.data.page * allInvitee.limit || allInvitee.data.total} of{' '}
              {allInvitee.data.total} results{' '}
            </div>
          )}
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
                <div style={{ minHeight: '69vh' }}>
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
                        <div className="action-cell" style={{ width: 40 }}>
                          <img src={bin} alt="" onClick={() => onDeleteInvitee(value._id)} />
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
                  <div style={{ textAlign: 'center', marginTop: '5vh' }}>Empty Data</div>
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
