import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const BarChart = ({data} : any) => {
    const [chartData, setChartData] = useState({
        series: [{
          data: [...data.map((d:any) => d.count)]
        }],
        options: {
          chart: {
            type: 'bar',
            height: 380
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal : true
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: [...data.map((d:any) => d.companyName)],
          },
          responsive: [{
            breakpoint: 600,
            options: {
              chart: {
                width: 320,
              },
              legend: {
                position: 'bottom',
              },
            },
          }],
        }
      });
    
      return (
        <div id="chart">
          <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </div>
      );
}

export default BarChart