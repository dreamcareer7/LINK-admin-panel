import React from 'react';
import PropTypes from 'prop-types';
import { Bar, Chart } from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-labels';

const BarChart = props => {
  const { chartData, temp, options } = props;
  const state = {
    labels: chartData && chartData.data.map(e => e._id),
    datasets: [
      {
        backgroundColor: '#4282fe',
        borderColor: '#4282fe',
        borderWidth: 2,
        spanGaps: true,
        fill: true,
        data: chartData && chartData.data.map(e => e.total),
      },
    ],
  };
  return (
    <>
      {chartData !== null && chartData.data.length === 0 ? (
        <div className="no-data-available-container">No Data Available</div>
      ) : (
        <div className="container">
          <Bar
            data={state}
            options={{
              animation: {
                onComplete: e => {
                  const chartInstance = e.chart;
                  const { ctx } = chartInstance;
                  ctx.fillStyle = '#212152';
                  ctx.font = Chart.helpers.fontString(
                    Chart.defaults.global.defaultFontSize,
                    Chart.defaults.global.defaultFontFamily
                  );
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'bottom';

                state.datasets.forEach((dataset, i) => {
                  const meta = chartInstance.controller.getDatasetMeta(i);
                  meta.data.forEach((bar, index) => {
                    if (dataset.data[index] > 0) {
                      const data = dataset.data[index];
                      if (temp === 'indus') {
                        ctx.fillText(`${data} User`, bar._model.x, bar._model.y);
                      } else {
                        ctx.fillText(`${data} Opportunities`, bar._model.x, bar._model.y);
                      }
                    }
                  });
                });
              },
            },
            scales: {
              xAxes: [
                {
                  barThickness: temp === 'indus' ? 50 : 80,
                  barPercentage: 0.35,
                  gridLines: {
                    drawOnChartArea: false,
                    zeroLineColor: 'transparent',
                  },
                  ticks: {
                    fontColor: '#212152', // this here
                    fontWeight: '600',
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
                    labelString: 'users',
                  },
                },
              ],
            },
            ...options,
          }}
        />
          </div>
      )}
    </>
  );
};

BarChart.propTypes = {
  temp: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.object.isRequired,
};
export default BarChart;
