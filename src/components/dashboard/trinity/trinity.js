import React from 'react';
import './trinity.scss'
import trinityBullet from './images/trinity-bullet.png';
import ehsImage from './images/ehs-q-issue-3-spotlight.png';
import search from './images/search.svg';

function Trinity() {
    return (
        <div className="content">
        <section className="issue-block-1">
            <div className="issue-detail-container">
                <div className="issue-detail-heading">
                    Issue 3 Dec 2020
                </div>
                <button className="common-button issue-detail-button">DOWNLOAD (PDF)</button>
                <div className="issue-detail-subheading">
                    Inside this issue:
                </div>
                <div className="issue-detail-points">
                    <img alt="trinity" src={trinityBullet}/>
                    <a href="">Using a Multimedia Approach for Environmental Reporting Consistency</a>
                </div>
                <div className="issue-detail-points">
                    <img alt="trinity" src={trinityBullet}/>
                   <a href="">5 Steps to Digitize EHS Reporting Processes</a>
                </div>
                <div className="issue-detail-points">
                    <img alt="trinity" src={trinityBullet}/>
                    <a href="">Unfinished Business: What Happens to EPA with a Change in US Presidents?</a>
                </div>
                <div className="issue-detail-points">
                    <img alt="trinity" src={trinityBullet}/>
                    <a href="">The SSM Saga Continues</a>
                </div>
                <div className="issue-detail-points">
                    <img alt="trinity" src={trinityBullet}/>
                    <a href="">Navigating Net-Zero Commitments</a>
                </div>
                <div className="issue-detail-points">
                    <img alt="trinity" src={trinityBullet}/>
                    <a href="">CSAPR Update May Reduce Ozone Season Emissions Budgets for EGUs</a>
                </div>
                <div className="issue-detail-points">
                    <img alt="trinity" src={trinityBullet}/>
                    <a href="">PHA Inconsistency Series – Part III: Mitigating the Risks</a>
                </div>
                <div className="issue-detail-points">
                    <img alt="trinity" src={trinityBullet}/>
                    <a href="">New Website - Expanded Expertise</a>
                </div>
            </div>
            <div className="issue-detail-image">
            <img src={ehsImage}/>
            </div>
        </section>
        <section className="issue-block-2">
<div className="issue-list">
    <div className="issue-item"><div></div></div>
    <div className="issue-item"><div></div></div>
    <div className="issue-item"><div></div></div>
    <div className="issue-item"><div></div></div>
    <div className="issue-item"><div></div></div>
    <div className="issue-item"><div></div></div>
    <div className="issue-item"><div></div></div>
    <div className="issue-item"><div></div></div>
</div>
            <div className="search-container">
                <div className="serach-box">
                    <input placeholder="Search here"/>
                    <img src={search}/>
                </div>
                <div className="list-magazines-title">
                    List Magazines
                </div>
                <div className="old-issues">2019 Issue</div>
                <div className="current-year-issues">
                    2020 Issues
                    <div className="current-year--issue-list">Issue 2 Aug 2020</div>
                    <div className="current-year--issue-list">Issue 2 Aug 2020</div>
                    <div className="current-year--issue-list">Issue 2 Aug 2020</div>
                    <div className="current-year--issue-list">Issue 2 Aug 2020</div>
                    <div className="current-year--issue-list">Issue 2 Aug 2020</div>
                    <div className="current-year--issue-list">Issue 2 Aug 2020</div>
                </div>
            </div>
        </section>
        </div>
    );
}

export default Trinity;
