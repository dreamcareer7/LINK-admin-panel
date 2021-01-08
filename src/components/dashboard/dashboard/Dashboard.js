import React from 'react';
import BarChart from './BarChart';
import './dashboard.scss';
import DoughnutChart from './DoughnutChart';
import SubScriptionChart from './SubScriptionChart';

const Dashboard = () => {
  const onChange = e => {
    console.log('onChange', e.target.value);
  };

  // Gender Labels
  const genderLegend = {
    Male: 'Male',
    Female: 'Female',
    Other: 'Other',
  };

  // SubScription
  // const subscription = {
  //   FreeTrial: 'Free Trial',
  //   Monthly: 'Monthly',
  //   Yearly: 'Yearly',
  //   VIC: 'VIC',
  //   Paused: 'Paused',
  //   Cancelled: 'Cancelled',
  // };
  return (
    <>
      <div className="action-container">
        <div className="filters">
          <div className="filter">
            <label htmlFor="from" className="filter-label">
              Date Range
            </label>
            <div className="filter-action">
              <input name="from" type="date" placeholder="From" />
              <input name="to" type="date" placeholder="To" />
            </div>
          </div>
          <div className="filter">
            <div className="filter-label">Subscription Type:</div>
            <div className="filter-action" onChange={e => onChange(e)}>
              <input type="radio" name="subscription" value="FREETRIAL" />
              Free Trial
              <input type="radio" name="subscription" value="MONTHLY" />
              Monthly
              <input type="radio" name="subscription" value="YEARLY" />
              Yearly
              <input type="radio" name="subscription" value="PAUSED" />
              Paused
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <div className="row">
          <div className="column">
            <div className="card">
              <DoughnutChart titles="SUBSCRIPTION" />
            </div>
          </div>

          <div className="column">
            <div className="card">
              <SubScriptionChart />
            </div>
          </div>

          <div className="column">
            <div className="card">
              <DoughnutChart legend={genderLegend} titles="GENDER" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <div className="row">
          <div className="column-100">
            <div className="card bar">
              <BarChart titles="TOP 10 Industries" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <div className="row">
          <div className="column-100">
            <div className="card bar">
              <BarChart titles="Deal Values" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <div className="row">
          <div className="column-100">
            <div className="card bar">
              <BarChart titles="Opportunity Stages" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
