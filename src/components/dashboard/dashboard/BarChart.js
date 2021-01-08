import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

const BarChart = props => {
  const { titles, chartData } = props;
  const state = {
    labels: chartData && chartData.data.map(e => e._id),
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: '#4282fe',
        borderColor: '#4282fe',
        borderWidth: 2,
        data: chartData && chartData.data.map(e => e.total),
      },
    ],
  };

  return (
    <div>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: titles,
            fontSize: 30,
            fontColor:'black'
          },
          legend: {
            display: false,
            labels: {
              fontColor: 'black',
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false,
                },
                ticks: {
                  fontColor: 'black', // this here
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  drawOnChartArea: false,
                },
                ticks: {
                  fontColor: 'black', // this here
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

BarChart.propTypes = {
  titles: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object.isRequired,
};
export default BarChart;
