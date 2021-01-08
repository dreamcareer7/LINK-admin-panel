import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = props => {
  const { titles } = props;
  const state = {
    labels: ['Free Trial', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#501800', '#4B5000', '#175000', '#003350', '#35014F'],
        data: [65, 59, 80, 81, 56],
      },
    ],
  };
  return (
    <div>
      <Doughnut
        data={state}
        options={{
          title: {
            display: true,
            text: titles,
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'left',
          },
        }}
      />
    </div>
  );
};

DoughnutChart.propTypes = {
  titles: PropTypes.string.isRequired,
};
export default DoughnutChart;
