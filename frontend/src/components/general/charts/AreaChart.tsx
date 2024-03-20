import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface AreaChartProps {
  title: string,
  categories: string[],
  data_passengerCar: number[],
  data_bus: number[],
}

interface AreaChartState {
  series: {
    name: string;
    data: number[];
  }[];
}

const AreaChart = (props: AreaChartProps) => {





  const [state, setState] = useState<AreaChartState>({
    series: [
      {
        name: 'Samochody osobowe [km]',
        data: props.data_passengerCar,
      },

      {
        name: 'Samochody dostawcze [km]',
        data: props.data_bus,
      },
    ],
  });

  //handle props.data change and update chart
  useEffect(() => {
    setState({
      series: [
        {
          name: 'Samochody osobowe [km]',
          data: props.data_passengerCar,
        },
  
        {
          name: 'Samochody dostawcze [km]',
          data: props.data_bus,
        },
      ]
  })
  }, [props.data_passengerCar, props.data_bus]);
  //









  const options: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
  
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: props.categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      // min: 0,
      // max: 100,
    },
  };








  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark-2 sm:px-7.5 h-full">

        <div className="mb-3 xl:mb-12 justify-between gap-4 sm:flex">
          <div>
            <h5 className="text-xl font-semibold text-black dark:text-white">
              {props.title}
            </h5>
          </div>
          <div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-5">
          <div className="flex sm:w-1/2 sm:justify-center">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div>
              <p className="font-semibold text-primary">Samochody osobowe</p>
            </div>
          </div>
          <div className="flex sm:w-1/2 sm:justify-center">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div>
              <p className="font-semibold text-secondary">Samochody dostawcze</p>
            </div>
          </div>
        </div>


      <div>
        <div id="AreaChart" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series ? state.series : []}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default AreaChart;
