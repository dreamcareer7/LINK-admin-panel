import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = props => {
  const { titles, chartData } = props;
  const state = {
    labels: chartData && chartData.data.map(e => e._id),
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#501800', '#4B5000', '#175000', '#003350', '#35014F'],
        data: chartData && chartData.data.map(e => e.total),
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
            fontColor: 'black',
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
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object.isRequired,
};
export default DoughnutChart;
