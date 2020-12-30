import React from 'react';
import './manage-admins.scss'
import User from '../../../../assets/images/dummy-user.jpg'
import edit from "../../../../assets/images/pencil.png";
import bin from "../../../../assets/images/delete.png";

function ManageAdmins() {
    return (
        <div>
            <div className="admin-title">Logged in Admins</div>
            <div className="admin-table">
                <div className="tr heading">
                    <div className="admin-table-details">
                        <div className="td">NAME</div>
                        <div className="td">EMAIL</div>
                        <div className="td">PHONE</div>
                    </div>
                    <div className="action-cell"></div>
                </div>
                <div className="tr">
                    <div className="admin-table-details">
                        <div className="td name">
                            <img src={User}/>
                            Michelle Obama
                        </div>
                        <div className="td">michelle@abcmedia.com</div>
                        <div className="td">(+61)545-589-9977</div>
                    </div>
                    <div className="action-cell">
                        <img className="mr-5" src={edit}/>
                        <img src={bin}/>
                    </div>
                </div>
            </div>

            <div className="admin-title mt-10">All Admins</div>
            <div className="admin-table">
                <div className="tr heading">
                    <div className="admin-table-details">
                        <div className="td">NAME</div>
                        <div className="td">EMAIL</div>
                        <div className="td">PHONE</div>
                    </div>
                    <div className="action-cell"></div>
                </div>
                <div className="row-container">
                    <div className="tr">
                        <div className="admin-table-details">
                            <div className="td name">
                                <img src={User}/>
                                Michelle Obama
                            </div>
                            <div className="td">michelle@abcmedia.com</div>
                            <div className="td">(+61)545-589-9977</div>
                        </div>
                        <div className="action-cell">
                            <img className="mr-5" src={edit}/>
                            <img src={bin}/>
                        </div>
                    </div>
                    <div className="tr">
                        <div className="admin-table-details">
                            <div className="td name">
                                <img src={User}/>
                                Michelle Obama
                            </div>
                            <div className="td">michelle@abcmedia.com</div>
                            <div className="td">(+61)545-589-9977</div>
                        </div>
                        <div className="action-cell">
                            <img className="mr-5" src={edit}/>
                            <img src={bin}/>
                        </div>
                    </div>
                    <div className="tr">
                        <div className="admin-table-details">
                            <div className="td name">
                                <img src={User}/>
                                Michelle Obama
                            </div>
                            <div className="td">michelle@abcmedia.com</div>
                            <div className="td">(+61)545-589-9977</div>
                        </div>
                        <div className="action-cell">
                            <img className="mr-5" src={edit}/>
                            <img src={bin}/>
                        </div>
                    </div>
                    <div className="tr">
                        <div className="admin-table-details">
                            <div className="td name">
                                <img src={User}/>
                                Michelle Obama
                            </div>
                            <div className="td">michelle@abcmedia.com</div>
                            <div className="td">(+61)545-589-9977</div>
                        </div>
                        <div className="action-cell">
                            <img className="mr-5" src={edit}/>
                            <img src={bin}/>
                        </div>
                    </div>
                    <div className="tr">
                        <div className="admin-table-details">
                            <div className="td name">
                                <img src={User}/>
                                Michelle Obama
                            </div>
                            <div className="td">michelle@abcmedia.com</div>
                            <div className="td">(+61)545-589-9977</div>
                        </div>
                        <div className="action-cell">
                            <img className="mr-5" src={edit}/>
                            <img src={bin}/>
                        </div>
                    </div>
                    <div className="tr">
                        <div className="admin-table-details">
                            <div className="td name">
                                <img src={User}/>
                                Michelle Obama
                            </div>
                            <div className="td">michelle@abcmedia.com</div>
                            <div className="td">(+61)545-589-9977</div>
                        </div>
                        <div className="action-cell">
                            <img className="mr-5" src={edit}/>
                            <img src={bin}/>
                        </div>
                    </div>
                    <div className="tr">
                        <div className="admin-table-details">
                            <div className="td name">
                                <img src={User}/>
                                Michelle Obama
                            </div>
                            <div className="td">michelle@abcmedia.com</div>
                            <div className="td">(+61)545-589-9977</div>
                        </div>
                        <div className="action-cell">
                            <img className="mr-5" src={edit}/>
                            <img src={bin}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageAdmins;
