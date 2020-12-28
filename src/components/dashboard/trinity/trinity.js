import React from 'react';
import './trinity.scss'
import trinityBullet from './images/trinity-bullet.png';
import ehsImage from './images/ehs-q-issue-3-spotlight.png'
import {createStore} from 'redux'

function Trinity() {
    return (
        <div className="issue-detail-block">
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
        </div>
    );
}

export default Trinity;
