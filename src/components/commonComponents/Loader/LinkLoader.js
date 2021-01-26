import React from "react";
import "./LinkLoader.scss";

function LinkLoader() {
    return (
        <div className="loader-wrapper">
            <div className="loader">
                <div className="roller"/>
                <div className="roller"/>
            </div>
            <div className="loader loader-2">
                <div className="roller"/>
                <div className="roller"/>
            </div>
            <div className="loader loader-3">
                <div className="roller"/>
                <div className="roller"/>
            </div>
        </div>
    )
}

export default LinkLoader;