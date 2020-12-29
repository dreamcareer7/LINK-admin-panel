import React from 'react';
import './add-quote.scss'

function AddQuote() {
    return (
        <div>
            <div className="breadcrumb common-title">
                <span>quotes </span>
                <span> /add quote</span>
            </div>
            <div className="add-quote-block">
                <div className="common-title mb-5">
                    Quote
                </div>
                <div className="common-input">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </div>
            </div>
            <div className="add-quote-block">
                <div className="common-title mb-5">
                    Tags
                    <span className="placeholder-font">(Separated by commas) </span>
                </div>
                <div className="common-input">
                    Business, Motivation
                </div>
            </div>
            <div className="add-quote-block author-detail">
                <div>
                    <div className="common-title">Author</div>
                    <input className="common-input" placeholder="Michelle Obama"/>
                </div>
                <div>
                    <div className="common-title">Author</div>
                    <select className="common-select">
                        <option value="All">All</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default AddQuote;
