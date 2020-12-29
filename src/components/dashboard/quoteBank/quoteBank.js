import React from 'react';
import './quoteBank.scss'
import edit from '../../../assets/images/pencil.png';
import bin from '../../../assets/images/delete.png'
import {createStore} from 'redux'

function QuoteBank() {
    return (
        <div>
            <div className="action-container">
                <div className="actions">
                    <div className="filters">
                        <div className="filter">
                            <div className="filter-label">
                                Status
                            </div>
                            <div className="filter-action">
                                <select>
                                    <option value="All">All</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                        </div>
                        <div className="filter">
                            <div className="filter-label">
                                Sorting
                            </div>
                            <div className="filter-action">
                                <select>
                                    <option value="Recent">Recent</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="action-buttons">
                    <div className="button success-button">ADD QUOTE</div>
                </div>
            </div>
            <div className="no-of-results-in-display">
                Showing 1-20 of 357 results
            </div>
            <table cellPadding="0" cellSpacing="0" className="quote-table">
                <tr className="tr heading">
                    <div className="td">Quote</div>
                    <div className="td">Author</div>
                    <div className="td">Tags</div>
                    <div className="td">Status</div>
                    <div className="td"></div>
                </tr>

                <div className="tr">
                    <div className="td">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </div>
                    <div className="td">
                        Neil DeGrasse Tyson Junior
                    </div>
                    <div className="td">
                        <div className="tag-container">
                            <span className="tag">Business</span>
                            <span className="tag">Motivational</span>
                            <span className="tag">Entertainment</span>
                        </div>
                    </div>
                    <div className="td">
                        <select>
                            <option value="All">All</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className="td">
                        <img className="edit" src={edit}/>
                        <img src={bin}/>
                    </div>
                </div>
            </table>
        </div>
    );
}

export default QuoteBank;
