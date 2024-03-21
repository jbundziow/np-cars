import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

type PieChartProps = {
  title: string,
  data: {name: string, value: number, color:string}[]
}

interface PieChartState {
  series: number[];
  options: ApexOptions
}






const PieChart = (props: PieChartProps) => {





  const [state, setState] = useState<PieChartState>({

    series:  props.data.map((item) => item.value),

    options: {
      chart: {
        type: 'donut',
      },
      colors: props.data.map((item) => item.color.slice(4, -1)),
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
    }

  });
  

  useEffect(() => {

    setState({
      series:  props.data.map((item) => +item.value),

      options: {...state.options, colors: props.data.map((item) => item.color.slice(4, -1)), labels: props.data.map((item) => item.name)}
    })
  }, [props.data]);







  const totalValues = props.data.map((item) => item.value).reduce((a, b) => a + b, 0);









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
            options={state.options ? state.options : {}}
            series={state.series ? state.series : []}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3 mt-10">
        {props.data.map((item, index) => {
          const color = props.data[index].color

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
