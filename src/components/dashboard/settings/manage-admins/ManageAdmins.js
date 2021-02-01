import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getAllAdmins,
} from '../../../../redux/actions/manageAdminAction/ManageAdminAction';
import User from '../../../../assets/images/user.jpg';
import edit from '../../../../assets/images/pencil.png';
import bin from '../../../../assets/images/delete.png';
import './manage-admins.scss';

const ManageAdmins = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const manageAdminData = useSelector(state => state.manageAdmin);
  useEffect(() => {
    dispatch(getAllAdmins());
  }, []);

  const onDelete = userId => {
    dispatch(deleteUser(userId));
  };

  const onEditAdmin = userId => {
    history.push(`/settings/manageAdmin/${userId}`);
  };

  return (
    <>
      <div className="admin-title mt-10">Logged in Admins</div>
      <div className="admin-table">
        <div className="admin-table-details heading">
          <div className="td">NAME</div>
          <div className="td">EMAIL</div>
          <div className="td">PHONE</div>
          <div className="action-cell" />
        </div>
        {manageAdminData &&
          manageAdminData.map(value => (
            <React.Fragment key={value._id}>
              {value && value.isLoggedIn === true ? (
                <div key={value._id} className="row-container">
                  <div className="admin-table-details tr">
                    <div className="name">
                      <img src={(value && value.profilePic) || User} />
                      {value && value.firstName && value.firstName.length > 0
                        ? value.firstName
                        : 'No Name Available'}
                    </div>
                    <div>{value && value.email}</div>
                    <div>{value && value.phone}</div>
                    <div>
                      <img
                        className="edit-image ml-35"
                        src={edit}
                        alt=""
                        onClick={() => onEditAdmin(value._id)}
                      />
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
        <div className="heading">
          <div className="admin-table-details">
            <div>NAME</div>
            <div>EMAIL</div>
            <div>PHONE</div>
          </div>
          <div className="action-cell" />
        </div>
        {manageAdminData &&
          manageAdminData.map(val => (
            <React.Fragment key={val._id}>
              {val && !val.isLoggedIn ? (
                <div key={val._id} className="row-container">
                  <div className="admin-table-details tr">
                    <div className="name">
                      <img src={(val && val.profilePic) || User} />
                      {val && val.firstName}
                    </div>
                    <div>{val && val.email}</div>
                    <div>{val && val.phone}</div>
                    <div className="action-cell">
                      <img
                        className="edit-image mr-5"
                        src={edit}
                        onClick={() => onEditAdmin(val._id)}
                      />
                      <img className="delete-image" src={bin} onClick={() => onDelete(val._id)} />
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
