import React from "react";
import "./LinkLoader.scss";

function LinkLoader() {
    return (
        <div className="loader-wrapper">
            <div className="ball-loader">
                <div className="ball-loader-ball ball1"/>
                <div className="ball-loader-ball ball2"/>
                <div className="ball-loader-ball ball3"/>
            </div>
        </div>
    )
}

export default LinkLoader;