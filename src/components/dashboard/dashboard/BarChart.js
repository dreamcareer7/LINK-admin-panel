import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

const state = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: '#45b3e0',
      borderColor: '#45b3e0',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

const BarChart = props => {
  const { titles } = props;
  return (
    <div>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: titles,
            fontSize: 20,
          },
          legend: {
            display: false,
          },
        }}
      />
    </div>
  );
};

BarChart.propTypes = {
  titles: PropTypes.string.isRequired,
};
export default BarChart;
