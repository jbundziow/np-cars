import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

type PieChartProps = {
  title: string,
  data: {name: string, value: number}[]
}

interface PieChartState {
  series: number[];
}



const PieChart = (props: PieChartProps) => {



  const [state] = useState<PieChartState>({
    series:  props.data.map((item) => item.value),
  });




  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    colors: ['#10B981', '#375E83', '#259AE6', '#FFA70B'],
    labels: props.data.map((item) => item.name),
    legend: {
      show: true,
      position: 'bottom',
    },
  
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };






  const totalValues = props.data.map((item) => item.value).reduce((a, b) => a + b, 0);





  let bgColors: string[] = [];
  if(options.colors) {
  bgColors = options.colors.map((color) => `bg-[${color}]`);
  }





  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark-2 sm:px-7.5 h-full">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            {props.title}
          </h5>
        </div>
        <div>
        </div>
      </div>

      <div className="mb-2">
        <div id="PieChart" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3 mt-10">
        {props.data.map((item, index) => {
          const color = bgColors[index];

          return (
          <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className={`mr-2 block h-3 w-full max-w-3 rounded-full ${color}`}></span>
            <p className="flex w-full justify-between text-xs font-medium text-black dark:text-white">
              <span>&nbsp;{item.name}&nbsp;</span>
              <span> {Number(item.value*100/totalValues).toFixed(2)}% </span>
            </p>
          </div>
        </div>
        )})}
      </div>
    </div>
  );
};

export default PieChart;
