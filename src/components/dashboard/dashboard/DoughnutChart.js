import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = props => {
  const { chartData, type } = props;
  const subscriptionsState = {
    labels: chartData && chartData.data.map(e => e._id),
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: ['#FCAB4F', '#4282FE', '#39C3BB', '#FD696A', '#4282FE', '#D53711'],
        hoverBackgroundColor: ['#FEE1C0', '#81ABFE', '#DADBF3', '#FEC9C9', '#BCD2FF', '#F7B3A2'],
        data: chartData && chartData.data.map(e => e.total),
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
        data: chartData && chartData.data.map(e => e.total),
      },
    ],
  };
  return (
    <div>
      {chartData !== null && chartData.data.length === 0 ? (
        'No Data Available'
      ) : (
        <Doughnut
            data={type === 'subscriptions' ? subscriptionsState : genderState}
          options={{
            plugins: {
              labels: {
                render: 'value',
              },
            },
            // animation: {
            //   onComplete: e => {
            //     const chartInstance = e.chart;
            //     const { ctx } = chartInstance;
            //     console.log(e.chart);
            //     ctx.font = Chart.helpers.fontString(
            //       Chart.defaults.global.defaultFontSize,
            //       Chart.defaults.global.defaultFontStyle,
            //       Chart.defaults.global.defaultFontFamily,
            //     );
            //     ctx.textAlign = 'center';
            //     ctx.textBaseline = 'bottom';

            //     state.datasets.forEach((dataset, i) => {
            //       const meta = chartInstance.controller.getDatasetMeta(i);
            //       meta.data.forEach((bar, index) => {
            //         if (dataset.data[index] > 0) {
            //           const data = dataset.data[index];
            //           ctx.fillText(`${data}`, bar._model.x, bar._model.y);
            //         }
            //       });
            //     });
            //   },
            // },
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

DoughnutChart.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};
export default DoughnutChart;
