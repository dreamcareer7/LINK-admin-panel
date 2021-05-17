import React, {useEffect} from 'react';
import './dashboard.scss';
import PropTypes from 'prop-types';
import {Doughnut} from 'react-chartjs-2';

const DoughnutChart = props => {
  const { chartData, type } = props;
  const subscriptionsState = {
    labels: chartData && chartData.data.map(e => e._id),
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: ['#39C3BB', '#FCAB4F', '#4282FE',  '#FD696A', '#4282FE', '#D53711'],
        hoverBackgroundColor: ['#DADBF3', '#FEE1C0', '#81ABFE',  '#FEC9C9', '#BCD2FF', '#F7B3A2'],
        data: chartData && chartData.data.map(e => (e.total ? e.total : '')),
      },
    ],
  };
  const genderState = {
    labels: chartData && chartData.data.map(e => e._id),
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: ['#FCAB4F', '#1E205D', '#39C3BB'],
        hoverBackgroundColor: ['#FEE1C0', '#696A93', '#DADBF3'],
        data: chartData && chartData.data.map(e => (e.total ? e.total : '')),
      },
    ],
  };
  const legendFunction = () => {
    const legendHtml = [];
    const state = type === 'subscriptions' ? subscriptionsState : genderState;
    legendHtml.push('<ul>');
    if(chartData) {
      chartData.data.forEach((record, index) => {
        legendHtml.push('<li>');
        legendHtml.push(`<div className="chart-legend" style="background-color: ${state.datasets[0].backgroundColor[index]}">${record.total}</div>`)
        legendHtml.push(`<label className="chart-legend-label-text">${record._id}</label>`);
        legendHtml.push('<li>')
      })
    }
    legendHtml.push('</ul>');
    return legendHtml.join("");
  }

  useEffect(() => {
    if (chartData && chartData.data && chartData.data.length > 0 && type === 'subscriptions') {
      const element = document.getElementById("subscription-legends");
      if (element) {
        element.innerHTML = legendFunction()
      }
    }
  }, [chartData])

  useEffect(() => {
    if (chartData && chartData.data && chartData.data.length > 0 && type !== 'subscriptions') {
      const element = document.getElementById("gender-legends");
      if (element) {
        element.innerHTML = legendFunction()
      }
    }
  }, [chartData])

  return (
    <>
      {chartData !== null && chartData.data.length === 0 ? (
        <div className="no-data-style">No Data Available</div>
      ) : (
              <div className="graph-container">
                {type === 'subscriptions' && <div id="subscription-legends"/>}
                {type !== 'subscriptions' && <div id="gender-legends"/>}
                <div className="graph">
        <Doughnut
                height={null}
                width={null}
                id="doughnut-chart"
          data={type === 'subscriptions' ? subscriptionsState : genderState}
          options={{
            cutoutPercentage: 65,
            aspectRatio: 1,
            plugins: {
              datalabels: {
                display: true,
                color: 'white'
              },
              labels: {
                render: 'value',
              },
            },
            legend: false
          }}
        />
                </div>
              </div>
      )}
    </>
  );
};

DoughnutChart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
export default DoughnutChart;
