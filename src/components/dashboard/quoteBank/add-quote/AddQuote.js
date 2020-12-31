import React from 'react';
import './add-quote.scss';

function AddQuote() {
  return (
    <div>
      <div className="breadcrumb common-title">
        <span>quotes </span>
        <span> /add quote</span>
      </div>
      <div className="add-quote-block">
        <div className="common-title mb-5">Quote</div>
        <textarea rows="3" className="common-input">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </textarea>
      </div>
      <div className="add-quote-block">
        <div className="common-title mb-5">
          Tags
          <span className="placeholder-font font-600"> (Separated by commas) </span>
        </div>
        <textarea rows="1" className="common-input">
          Business, Motivation
        </textarea>
      </div>
      <div className="add-quote-block author-detail">
        <div>
          <div className="common-title mb-5">Author</div>
          <input className="common-input" placeholder="Enter name" />
        </div>
        <div>
          <div className="common-title mb-5">Author</div>
          <select className="common-select">
            <option value="All">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
      <div className="quote-buttons-row">
        <button type="button" className="button success-button add-quote-button" onClick="">
          SAVE CHANGES
        </button>
        <button type="button" className="button primary-button add-quote-button" onClick="">
          DISCARD CHANGES
        </button>
        <button type="button" className="button danger-button add-quote-button" onClick="">
          DELETE CHANGES
        </button>
      </div>
    </div>
  );
}

export default AddQuote;
