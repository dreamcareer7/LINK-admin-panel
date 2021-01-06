import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getAllAdmins,
} from '../../../../redux/actions/manageAdminAction/ManageAdminAction';
import User from '../../../../assets/images/dummy-user.jpg';
import edit from '../../../../assets/images/pencil.png';
import bin from '../../../../assets/images/delete.png';
import './manage-admins.scss';

const ManageAdmins = () => {
  const dispatch = useDispatch();
  const manageAdminData = useSelector(state => state.manageAdmin);
  const token = localStorage.getItem('userToken');
  useEffect(() => {
    dispatch(getAllAdmins(token));
  }, []);

  const onDelete = userId => {
    dispatch(deleteUser(userId));
  };

  return (
    <>
      <div className="admin-title mt-10">Logged in Admins</div>
      <div className="admin-table">
        <div className="tr heading">
          <div className="admin-table-details">
            <div className="td">NAME</div>
            <div className="td">EMAIL</div>
            <div className="td">PHONE</div>
          </div>
          <div className="action-cell" />
        </div>
        {manageAdminData &&
          manageAdminData.map(value => (
            <React.Fragment key={value._id}>
              {value && value.isLoggedIn === true ? (
                <div key={value._id} className="row-container">
                  <div className="tr">
                    <div className="admin-table-details">
                      <div className="td name">
                        <img src={User} />
                        {value && value.firstName}
                      </div>

                      <div className="td">{value && value.email}</div>
                      <div className="td">{value && value.phone}</div>
                    </div>
                    <div className="action-cell">
                      <img className="mr-5" src={edit} alt="" />
                      <img src={bin} alt="" onClick={() => onDelete(value._id)} />
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </React.Fragment>
          ))}
      </div>

      <div className="admin-title mt-10">All Admins</div>
      <div className="admin-table">
        <div className="tr heading">
          <div className="admin-table-details">
            <div className="td">NAME</div>
            <div className="td">EMAIL</div>
            <div className="td">PHONE</div>
          </div>
          <div className="action-cell" />
        </div>
        {manageAdminData &&
          manageAdminData.map(val => (
            <React.Fragment key={val._id}>
              {val && !val.isLoggedIn ? (
                <div key={val._id} className="row-container">
                  <div className="tr">
                    <div className="admin-table-details">
                      <div className="td name">
                        <img src={User} />
                        {val && val.firstName}
                      </div>
                      <div className="td">{val && val.email}</div>
                      <div className="td">{val && val.phone}</div>
                    </div>
                    <div className="action-cell">
                      <img className="mr-5" src={edit} />
                      <img src={bin} onClick={() => onDelete(val._id)} />
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </React.Fragment>
          ))}
      </div>
    </>
  );
};

export default ManageAdmins;
