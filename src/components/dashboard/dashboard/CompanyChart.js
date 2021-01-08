import React from 'react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const CompanyChart = props => {
  const { chartData } = props;
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
      <Pie
        data={state}
        options={{
          title: {
            display: true,
            text: 'Company Size',
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

CompanyChart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object.isRequired,
};
export default CompanyChart;
