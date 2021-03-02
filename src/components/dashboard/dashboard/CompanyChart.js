import React, {useEffect} from 'react';
import './dashboard.scss';
import {Pie} from 'react-chartjs-2';
import PropTypes from 'prop-types';

const CompanyChart = props => {
    const {chartData} = props;
    const state = {
        labels: chartData && chartData.data.map(e => e._id),
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: [
                    '#3364C8',
                    '#d53711',
                    '#F89400',
                    '#62A600',
                    '#00A6B4',
                    '#6800B4',
                    '#950c94',
                    '#d64374',
                ],
                hoverBackgroundColor: [
                    '#B5C7EC',
                    '#F6A490',
                    '#FFDAA2',
                    '#AFFF99',
                    '#89F5FF',
                    '#CE89FF',
                    '#EED5FF',
                    '#F0BCCD',
                ],
                data: chartData && chartData.data.map(e => (e.total ? e.total : ''))
            },
        ],
    };

   const legendFunction = () => {
        const legendHtml = [];
        legendHtml.push('<ul>');
       if(chartData) {
         chartData.data.forEach((record, index) => {
                   legendHtml.push('<li>');
                   legendHtml.push(`<div className="chart-legend" style="background-color: ${state.datasets[0].backgroundColor[index]}">${record.total}</div>`)
                   legendHtml.push(`<label className="chart-legend-label-text">${record._id}</label>`);
                   legendHtml.push('<li>')
                 })
       }
        legendHtml.push('</ul>');
        return legendHtml.join("");
    }

    useEffect(() => {
        if (chartData && chartData.data && chartData.data.length > 0) {
            const element = document.getElementById("pie-legends");
            if (element) {
                element.innerHTML = legendFunction()
                console.log(element.innerHTML);
            }
        }
    }, [chartData])
    return (
            <>
                {chartData && chartData.data.length > 0 ? (
                        <div className="graph-container">
                            <div id="pie-legends"/>
                            <div className="graph">
                                <Pie
                                        height={null}
                                        width={null}
                                        id="myChart"
                                        data={state}
                                        options={{
                                            aspectRatio: 1,
                                            plugins: {
                                                datalabels: {
                                                    display: false,
                                                },
                                            },
                                            responsive: true,
                                            legend: false,
                                        }}
                                />
                            </div>
                        </div>
                ):(
                        <div className="no-data-style">No Data Available</div>
                )}
            </>
    );
};

CompanyChart.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    chartData: PropTypes.object.isRequired,
};
export default CompanyChart;
