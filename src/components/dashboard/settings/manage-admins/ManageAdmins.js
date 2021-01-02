import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { manageAdmin } from '../../../../redux/actions/manageAdminAction/ManageAdminAction';
import User from '../../../../assets/images/dummy-user.jpg';
import edit from '../../../../assets/images/pencil.png';
import bin from '../../../../assets/images/delete.png';
import './manage-admins.scss';

const ManageAdmins = () => {
  const dispatch = useDispatch();
  const manageAdminData = useSelector(state => state.manageAdmin);
  console.log('manageAdmin', manageAdminData);
  const token = localStorage.getItem('userToken');
  useEffect(() => {
    dispatch(manageAdmin(token));
  }, []);

  // const onDelete = () => {
  //   console.log('Click');
  // };

  return (
    <>
      {manageAdminData &&
        manageAdminData.map(value => (
          <React.Fragment key={value.id}>
            {value && value.isLoggedIn === true ? (
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
                      <img src={bin} alt="" />
                    </div>
                  </div>
                </div>
                <div className="admin-title mt-10">All Admins</div>
              </>
            ) : (
              <>
                <div className="admin-table">
                  <div className="tr heading">
                    <div className="admin-table-details">
                      <div className="td">NAME</div>
                      <div className="td">EMAIL</div>
                      <div className="td">PHONE</div>
                    </div>
                    <div className="action-cell" />
                  </div>
                  <div className="row-container">
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
                        <img className="mr-5" src={edit} />
                        <img src={bin} />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </React.Fragment>
        ))}
    </>
  );
};

export default ManageAdmins;
