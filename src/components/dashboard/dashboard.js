import React from 'react';
import './dashboard.scss';
import Sidebar from "../commonComponents/sidebar/sidebar";
import UpperHeader from "../commonComponents/upperHeader/upperHeader";
import Subscribers from "./subscribers/subscribers";
import QuoteBank from "./quoteBank/quoteBank";
import AddQuote from "./quoteBank/add-quote/add-quote";
import Settings from "./settings/settings";

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
                    <Settings/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
