import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import BarChart from './BarChart';
import './dashboard.scss';
import DoughnutChart from './DoughnutChart';
import CompanyChart from './CompanyChart';
import {
  companySizeChartData,
  dealChartData,
  genderChartData,
  industriesChartData,
  opportunityChartData,
  subscriptionChartData,
} from '../../../redux/actions/dashboardAction/DashboardAction';

const Dashboard = () => {
  const chartData = useSelector(state => state.dashboardReducer);
  const [subscription, setSubscrptionType] = useState('MONTHLY');
  const [today, setToday] = useState(moment().format('yyyy-MM-DD'));
  const [previousDate, setPreviusDate] = useState(
    moment().subtract(30, 'days').format('yyyy-MM-DD')
  );
  const dispatch = useDispatch();

  const onChange = e => {
    setSubscrptionType(e.target.value);
  };

  const onChangeFromInput = e => {
    console.log(e.target.value);
    setPreviusDate(e.target.value);
  };

  const onChangeToInput = e => {
    console.log(e.target.value);
    setToday(e.target.value);
  };

  useEffect(() => {
    // setPreviusDate();
    // setToday();
    const data = {
      startDate: previousDate,
      endDate: today,
    };

    const companyData = {
      selectedPlan: subscription,
      startDate: previousDate,
      endDate: today,
    };
    if (data.endDate && data.startDate && companyData.selectedPlan) {
      dispatch(dealChartData(data));
      dispatch(companySizeChartData(companyData));
      dispatch(genderChartData(companyData));
      dispatch(opportunityChartData(data));
      dispatch(subscriptionChartData(data));
      dispatch(industriesChartData(companyData));
    }
  }, [subscription, today, previousDate]);

  return (
    <>
      <div className="action-container">
        <div className="filters">
          <div className="filter">
            <label htmlFor="from" className="filter-label">
              Date Range
            </label>
            <div className="filter-action">
              <input
                name="from"
                onChange={e => onChangeFromInput(e)}
                value={previousDate}
                type="date"
                placeholder="From"
              />
              <input
                name="to"
                onChange={e => onChangeToInput(e)}
                value={today}
                type="date"
                placeholder="To"
              />
            </div>
          </div>
          <div className="filter">
            <div className="filter-label">Subscription Type:</div>
            <div className="filter-action" onChange={e => onChange(e)}>
              <input
                type="radio"
                name="subscription"
                checked={subscription === 'FREETRIAL'}
                value="FREETRIAL"
              />
              Free Trial
              <input
                type="radio"
                name="subscription"
                checked={subscription === 'MONTHLY'}
                value="MONTHLY"
              />
              Monthly
              <input
                type="radio"
                name="subscription"
                checked={subscription === 'YEARLY'}
                value="YEARLY"
              />
              Yearly
              <input
                type="radio"
                name="subscription"
                checked={subscription === 'PAUSED'}
                value="PAUSED"
              />
              Paused
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <div className="row">
          <div className="column">
            <div className="card">
              <DoughnutChart
                titles="SUBSCRIPTION"
                chartData={chartData && chartData.subscriptionValue && chartData.subscriptionValue}
              />
            </div>
          </div>

          <div className="column">
            <div className="card">
              <CompanyChart
                chartData={chartData && chartData.companyValue && chartData.companyValue}
              />
            </div>
          </div>

          <div className="column">
            <div className="card">
              <DoughnutChart
                chartData={chartData && chartData.genderValue && chartData.genderValue}
                titles="GENDER"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <div className="row">
          <div className="column-100">
            <div className="card bar">
              <BarChart
                chartData={chartData && chartData.industriesValue && chartData.industriesValue}
                titles="TOP 10 Industries"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <div className="row">
          <div className="column-100">
            <div className="card bar">
              <BarChart
                titles="Deal Values"
                chartData={chartData && chartData.dealValue && chartData.dealValue}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <div className="row">
          <div className="column-100">
            <div className="card bar">
              <BarChart
                chartData={chartData && chartData.opportunityValue && chartData.opportunityValue}
                titles="Opportunity Stages"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
