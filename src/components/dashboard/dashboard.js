import React from 'react';
import './dashboard.scss';
import Sidebar from "../commonComponents/sidebar/sidebar";
import UpperHeader from "../commonComponents/upperHeader/upperHeader";

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="dashboard--left-part">
                <Sidebar/>
            </div>
            <div className="dashboard--right-part">
                <div className="dashboard--upperHeader">
                    <UpperHeader/>
                </div>

                <div className="common-area">

                </div>
            </div>
        </div>
    );
}

export default Dashboard;
