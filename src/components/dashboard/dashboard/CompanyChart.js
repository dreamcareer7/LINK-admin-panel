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
        backgroundColor: [
          '#d53711',
          '#F89400',
          '#62A600',
          '#00A6B4',
          '#6800B4',
          '#950c94',
          '#d64374',
          '#3364C8',
        ],
        hoverBackgroundColor: [
          '#F6A490',
          '#FFDAA2',
          '#AFFF99',
          '#89F5FF',
          '#CE89FF',
          '#EED5FF',
          '#F0BCCD',
          '#B5C7EC',
        ],
        data: chartData && chartData.data.map(e => e.total),
      },
    ],
  };

  return (
    <div style={{ padding: '80px' }}>
      {chartData !== null && chartData.data.length === 0 ? (
        'No Data Available'
      ) : (
        <Pie
          data={state}
          options={{
            legend: {
              display: true,
              position: 'left',
            },
          }}
        />
      )}
    </div>
  );
};

CompanyChart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object.isRequired,
};
export default CompanyChart;
