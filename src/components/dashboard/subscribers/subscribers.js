import React from 'react';
import './subscribers.scss'

function Subscribers() {
    return (
        <div>
            <div className="action-container">
                <div className="filters">
                    <div className="filter">
                    <label className="filter-label">Date Range</label>
                    <div className="filter-action">
                        <input placeholder="From"/>
                        <input placeholder="To"/>
                    </div>
                    </div>
                    <div className="filter">
                        <div className="filter-label">
                            Subscription Type:
                        </div>
                        <div className="filter-action">
                            <select></select>
                        </div>
                    </div>

                    <div className="filter">
                        <div className="filter-label">
                            Sorting
                        </div>
                        <div className="filter-action">
                            <select></select>
                        </div>
                    </div>
                </div>
                <div className="action-buttons">
                    <button className="button success-button">
                        ADD SUBSCRIBER
                    </button>
                    <button className="button primary-button">
                        DOWNLOAD
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Subscribers;
