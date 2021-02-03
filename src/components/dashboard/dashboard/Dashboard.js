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
import { errorNotification } from '../../../constants/Toast';

const indusryOptions = {
  plugins: {
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
          callback: value => {
            const [first, second] = value.split('-');
            return `$${first} - $${second}`;
          },
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
  const [fromDate, setFromDate] = useState(moment().subtract(30, 'days').format('yyyy-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('yyyy-MM-DD'));
  const dispatch = useDispatch();

  const onChange = e => {
    setSubscrptionType(e.target.value);
  };

  const onChangeFromInput = e => {
    const date = e.target.value;
    if (moment(date).isAfter(endDate)) {
      errorNotification('From date should be less than to date');
    } else {
      setFromDate(date);
    }
  };

  const onChangeToInput = e => {
    const date = e.target.value;
    if (moment(date).isBefore(fromDate)) {
      errorNotification('To date should be greater than from date');
    } else {
      setEndDate(date);
    }
  };

  useEffect(() => {
    // setPreviusDate();
    // setToday();
    const data = {
      startDate: fromDate,
      endDate,
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
            <div htmlFor="from" className="filter-label">
              Date Range
            </div>
            <div className="filter-action filter-dashboard-action">
              <input
                name="from"
                onChange={e => onChangeFromInput(e)}
                value={fromDate}
                type="date"
                placeholder="From"
              />
              <input
                name="to"
                onChange={e => onChangeToInput(e)}
                value={endDate}
                type="date"
                placeholder="To"
              />
            </div>
          </div>
          <div className="filter">
            <div className="filter-label ml-8">Subscription Type:</div>
            <div
              className="filter-action filter-dashboard-action mt-10"
              onChange={e => onChange(e)}
            >
              <input
                type="radio"
                name="subscription"
                defaultChecked={subscription === 'FREE_TRIAL'}
                value="FREE_TRIAL"
              />
              <span>Free Trial</span>
              <input
                type="radio"
                name="subscription"
                defaultChecked={subscription === 'MONTHLY'}
                value="MONTHLY"
              />
              <span>Monthly</span>
              <input
                type="radio"
                name="subscription"
                defaultChecked={subscription === 'YEARLY'}
                value="YEARLY"
              />
              <span>Yearly</span>
              <input
                type="radio"
                name="subscription"
                defaultChecked={subscription === 'PAUSED'}
                value="PAUSED"
              />
              <span>Paused</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-40 ">
        <div className="row">
          <div className="column" style={{ width: '33.33%' }}>
            <div className="card">
              <div className="common-title chart-title">Subscription</div>
              <DoughnutChart
                chartData={chartData && chartData.subscriptionValue && chartData.subscriptionValue}
              />
            </div>
          </div>

          <div className="column" style={{ width: '33.33%' }}>
            <div className="card">
              <div className="common-title chart-title">Company Size</div>
              <CompanyChart
                chartData={chartData && chartData.companyValue && chartData.companyValue}
              />
            </div>
          </div>

          <div className="column" style={{ width: '33.33%' }}>
            <div className="card">
              <div className="common-title chart-title">Gender</div>
              <DoughnutChart
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
