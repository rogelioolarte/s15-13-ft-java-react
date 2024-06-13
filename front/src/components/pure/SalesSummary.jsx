import { Card, CardBody } from '@material-tailwind/react'
import Chart from 'react-apexcharts'

const chartConfig = {
  type: 'bar',
  height: 240,
  series: [
    {
      name: 'Sales',
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500]
    }
  ],
  options: {
    chart: {
      toolbar: {
        show: false
      }
    },
    title: {
      show: ''
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#2E90FA'],
    plotOptions: {
      bar: {
        columnWidth: '50%',
        borderRadius: 2
      }
    },
    xaxis: {
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      },
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400
        }
      },
      categories: [
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    yaxis: {
      labels: {
        style: {
          colors: '#616161',
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 400
        }
      }
    },
    grid: {
      show: true,
      borderColor: '#dddddd',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 5,
        right: 20
      }
    },
    fill: {
      opacity: 0.8
    },
    tooltip: {
      theme: 'dark'
    }
  }
}

export default function SalesSummary () {
  return (
    <Card>
      <CardBody className='px-2 pb-0'>
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  )
}
