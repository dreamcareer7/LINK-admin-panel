import React, { useEffect, useState } from 'react';
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
import Modal from '../../../commonComponents/Modal/Modal';

const ManageAdmins = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const manageAdminData = useSelector(({manageAdmin}) => manageAdmin ?? []);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [adminId, setAdminId] = useState('');
  useEffect(() => {
    dispatch(getAllAdmins());
  }, []);

  const onDelete = userId => {
    setAdminId(userId);
    setIsModelOpen(true);
  };
  const onClosePopup = () => {
    setIsModelOpen(false);
  };
  const onDeleteData = () => {
    setIsModelOpen(false);
    dispatch(deleteUser(adminId));
  };

  const onEditAdmin = userId => {
    history.push(`/settings/manageAdmin/${userId}`);
  };

  return (
    <>
      {isModelOpen && (
        <Modal
          description="Are you sure you want to delete this admin user?"
          title="Delete Admin"
          deleteData={onDeleteData}
          onClosePopup={onClosePopup}
        />
      )}
      <div className="admin-title font-400 mt-10">Logged in Admins</div>
      <div className="admin-table">
        <div className="admin-table-details heading">
          <div className="td">NAME</div>
          <div className="td">EMAIL</div>
          <div className="td">PHONE</div>
          <div className="action-cell" />
        </div>
        {manageAdminData?.length !== 0 ?
          manageAdminData?.map(value => (
            <React.Fragment key={value._id}>
              {value && value.isLoggedIn === true ? (
                <div key={value._id} className="row-container">
                  <div className="admin-table-details tr">
                    <div className="name">
                      <img src={(value && value.profilePic) || User} />
                      {value
                        ? `${value.firstName && value.firstName}  ${
                            value.lastName ? value.lastName : ''
                          }`
                        : 'No Name Available'}
                    </div>
                    <div className="td email">{value && value.email}</div>
                    <div className="td phone">{value && value.phone}</div>
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
          )) : <div className="no-admin-container">No Data Available</div>}
      </div>

      <div className="admin-title font-400 mt-10">All Admins</div>
      <div className="admin-table">
        {manageAdminData && manageAdminData?.length !== 0 &&
        <div className="heading">
          <div className="admin-table-details">
            <div>NAME</div>
            <div>EMAIL</div>
            <div>PHONE</div>
          </div>
          <div className="action-cell" />
        </div>}
        {manageAdminData?.length !== 0 ? manageAdminData?.map(val => (
            <React.Fragment key={val._id}>
              {val && !val.isLoggedIn ? (
                <div key={val._id} className="row-container">
                  <div className="admin-table-details tr">
                    <div className="name">
                      <img src={(val && val.profilePic) || User} />
                      {val && val.firstName} {val.lastName ? val.lastName : ''}
                    </div>
                    <div className="td email">{val && val.email}</div>
                    <div className="td phone">{val && val.phone}</div>
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
          )): <div className="no-admin-container">No data available</div>}
      </div>
    </>
  );
}

export default ManageAdmins;
