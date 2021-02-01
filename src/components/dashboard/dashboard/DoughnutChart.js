import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = props => {
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
      {chartData !== null && chartData.data.length === 0 ? (
        'No Data Available'
      ) : (
        <Doughnut
          data={state}
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
};
export default DoughnutChart;
