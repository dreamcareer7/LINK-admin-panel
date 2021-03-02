import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
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
import { errorNotification } from '../../../constants/Toast';

const indusryOptions = {
  plugins: {
    datalabels: {
      display: false,
      color: 'white'
    },
    labels: {
      render: 'value',
    },
  },
  tooltips: { enabled: false },
  hover: { mode: null, animationDuration: 0 },
  maintainAspectRatio: false,
  responsive: true,
  title: {
    display: true,
    text: '',
  },
  legend: {
    display: false,
    labels: {
      fontColor: 'black',
    },
  },
  gridLines: { zeroLineColor: 'transparent' },
  scales: {
    xAxes: [
      {
        barThickness: 80,
        barPercentage: 0.35,
        gridLines: {
          drawOnChartArea: false,
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontColor: '#212152', // this here
          fontWeight: '600',
        },
        scaleLabel: {
          display: true,
          labelString: 'Industries',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontColor: '#212152', // this here
          fontWeight: '600',
          beginAtZero: true,
        },
        scaleLabel: {
          display: true,
          labelString: 'Users',
        },
      },
    ],
  },
};
const dealOptions = {
  ...indusryOptions,
  scales: {
    xAxes: [
      {
        barThickness: 80,
        barPercentage: 0.35,
        gridLines: {
          drawOnChartArea: false,
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontColor: '#212152', // this here
          fontWeight: '600',
          /*  callback: value => {
            const [first, second] = value.split('-');
            return `$${first} - $${second}`;
          }, */
        },
        scaleLabel: {
          display: true,
          labelString: 'Deal values',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontColor: '#212152', // this here
          fontWeight: '600',
          beginAtZero: true,
        },
        scaleLabel: {
          display: true,
          labelString: 'Opportunities',
        },
      },
    ],
  },
};
const opportunityOptions = {
  ...indusryOptions,
  scales: {
    xAxes: [
      {
        barThickness: 80,
        barPercentage: 0.35,
        gridLines: {
          drawOnChartArea: false,
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontColor: '#212152', // this here
          fontWeight: '600',
        },
        scaleLabel: {
          display: true,
          labelString: 'Stages',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontColor: '#212152', // this here
          fontWeight: '600',
          beginAtZero: true,
        },
        scaleLabel: {
          display: true,
          labelString: 'Opportunities',
        },
      },
    ],
  },
};

const Dashboard = () => {
  const chartData = useSelector(state => state.dashboardReducer);
  const [subscription, setSubscrptionType] = useState('MONTHLY');
  const [fromDate, setFromDate] = useState(moment().subtract(30, 'days').toDate());
  const [endDate, setEndDate] = useState(moment().toDate());
  const prevStartDate = useRef(null);
  const prevEndDate = useRef(null);
  const dispatch = useDispatch();

  const onChange = e => {
    setSubscrptionType(e.target.value);
  };

  const onChangeFromInput = datePass => {
    const date = datePass;
    if (moment(date).isAfter(endDate)) {
      errorNotification('From date should be less than to date');
    } else {
      setFromDate(date);
    }
  };

  const onChangeToInput = datePass => {
    const date = datePass;
    if (moment(date).isBefore(fromDate)) {
      errorNotification('To date should be greater than from date');
    } else {
      setEndDate(date);
    }
  };
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);
  useEffect(() => {
    setFromDate(moment().subtract(30, 'days').toDate());
    setEndDate(moment().toDate());
  }, []);

  useEffect(() => {
    // setPreviusDate();
    // setToday();
    const data = {
      startDate: fromDate,
      endDate,
      selectedPlan: subscription,
    };

    const companyData = {
      selectedPlan: subscription,
      startDate: fromDate,
      endDate,
    };
    if (data.endDate && data.startDate && companyData.selectedPlan) {
      dispatch(dealChartData(data));
      dispatch(companySizeChartData(companyData));
      dispatch(genderChartData(companyData));
      dispatch(opportunityChartData(data));
      dispatch(subscriptionChartData(data));
      dispatch(industriesChartData(companyData));
    }
  }, [subscription, endDate, fromDate]);

  return (
    <>
      <div className="action-container">
        <div className="filters">
          <div className="filter">
            <div className="filter-label">Date Range</div>
            <div className="filter-action filter-dashboard-action">
              <DatePicker
                className="mr-10"
                placeholderText="From"
                dateFormat="dd/MM/yyyy"
                selected={fromDate}
                onChange={onChangeFromInput}
                onFocus={() => {
                  prevStartDate.current = fromDate;
                  setFromDate('');
                }}
                onBlur={() => {
                  setFromDate(prevStartDate.current);
                }}
              />
              <DatePicker
                placeholderText="To"
                dateFormat="dd/MM/yyyy"
                selected={endDate}
                onChange={onChangeToInput}
                onFocus={() => {
                  prevEndDate.current = endDate;
                  setEndDate('');
                }}
                onBlur={() => {
                  setEndDate(prevEndDate.current);
                }}
              />
            </div>
          </div>
          <div className="filter">
            <div className="filter-label ml-8">Subscription Type</div>
            <div
              className="filter-action filter-dashboard-action mt-10"
              onChange={e => onChange(e)}
            >
              <input
                type="radio"
                id="free-trial"
                name="subscription"
                defaultChecked={subscription === 'FREE_TRIAL'}
                value="FREE_TRIAL"
              />
              <label htmlFor="free-trial" className="radio-button mr-20">
                Free Trial
              </label>
              <input
                type="radio"
                id="monthly"
                name="subscription"
                defaultChecked={subscription === 'MONTHLY'}
                value="MONTHLY"
              />
              <label htmlFor="monthly" className="radio-button mr-20">
                Monthly
              </label>
              <input
                type="radio"
                id="yearly"
                name="subscription"
                defaultChecked={subscription === 'YEARLY'}
                value="YEARLY"
              />
              <label htmlFor="yearly" className="radio-button">
                Yearly
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40 ">
        <div className="row">
          <div className="column">
            <div className="card">
              <div className="common-title chart-title">Subscriptions</div>
              <DoughnutChart
                type="subscriptions"
                chartData={chartData && chartData.subscriptionValue && chartData.subscriptionValue}
              />
            </div>
          </div>

          <div className="column">
            <div className="card">
              <div className="common-title chart-title">Company Size</div>
              <CompanyChart
                chartData={chartData && chartData.companyValue && chartData.companyValue}
              />
            </div>
          </div>

          <div className="column ">
            <div className="card">
              <div className="common-title chart-title">Gender</div>
              <DoughnutChart
                type="gender"
                chartData={chartData && chartData.genderValue && chartData.genderValue}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <div className="row">
          <div className="column-100">
            <div className="card bar">
              <div className="common-bar-chart-title">Top 10 Industries</div>
              <BarChart
                options={indusryOptions}
                temp="indus"
                chartData={chartData && chartData.industriesValue && chartData.industriesValue}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40">
        <div className="row">
          <div className="column-100">
            <div className="card bar">
              <div className="common-bar-chart-title">Deal Values</div>
              <BarChart
                options={dealOptions}
                temp="deal"
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
              <div className="common-bar-chart-title">Opportunity Stages</div>
              <BarChart
                options={opportunityOptions}
                temp="opportunity"
                chartData={chartData && chartData.dealValue && chartData.opportunityValue}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
