import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const PieChart = ({data}) => {
    const series = [...data.map((d) => d.count)]
    const [options, setOptions] = useState({
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [...data.map((d) => d.status)],
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
      
    });
  return (
    <div className=''>
         <ReactApexChart options={options} series={series} type="pie" width={500} />
    </div> 
  )
}

export default PieChart