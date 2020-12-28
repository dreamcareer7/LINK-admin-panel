import React from "react";
import "./upperHeader.scss";
import search from "../../../assets/images/search.png"
import user from "../../../assets/images/dummy-user.jpg"

function UpperHeader() {
    return (
        <div className="upper-header-block" >
            <div className="upper-header--rounded-block search-block">
                <input placeholder="Search Subscriber"/>
                <button><img src={search}/> </button>
            </div>
            <div className="upper-header--rounded-block">
                <img className="user-dp" src={user}/>
                <select className="user-settings" placeholder="Michelle Obama"></select>
            </div>
        </div>
    )
}

export default UpperHeader;
