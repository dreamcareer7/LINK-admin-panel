import React from 'react';
import PropTypes from 'prop-types';
import { Bar, Chart } from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-labels';

const BarChart = props => {
  const { titles, chartData, temp } = props;
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
    <div className="container">
      {
        chartData !== null && chartData.data.length === 0
            ? "No Data Available"
            : <Bar
                data={state}
                options={{
                  plugins: {
                    labels: {
                      render: 'value',
                    },
                  },
                  tooltips: { enabled: false },
                  hover: { mode: null, animationDuration: 0 },
                  maintainAspectRatio: false,
                  responsive: true,
                  title: {
                    display: true,
                    text: titles,
                    fontSize: 30,
                    fontColor: 'black',
                    padding: 40,
                  },
                  legend: {
                    display: false,
                    labels: {
                      fontColor: 'black',
                    },
                  },
                  animation: {
                    onComplete: e => {
                      const chartInstance = e.chart;
                      const { ctx } = chartInstance;
                      ctx.font = Chart.helpers.fontString(
                          Chart.defaults.global.defaultFontSize,
                          Chart.defaults.global.defaultFontStyle,
                          Chart.defaults.global.defaultFontFamily,
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
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                }}
            />
      }
    </div>
  );
};

BarChart.propTypes = {
  titles: PropTypes.string.isRequired,
  temp: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object.isRequired,
};
export default BarChart;
