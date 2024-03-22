import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';



interface BarChart2Props {
  title: string,
  categories: string[],
  label1: string,
  label2: string,
  data1: number[],
  data2: number[],
}

interface BarChart2State {
  key: number,
  series: {
    name: string;
    data: number[];
  }[],
}

const BarChart2 = (props: BarChart2Props) => {

  const options: ApexOptions = {
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
  
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '25%',
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '50%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: {
      enabled: false,
    },
  
    xaxis: {
      categories: props.categories,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
  
      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };



  const [state, setState] = useState<BarChart2State>({
    key: 0,

    series: [
      {
        name: 'Samochody osobowe [km]',
        data: props.data1,
      },

      {
        name: 'Samochody dostawcze [km]',
        data: props.data2,
      },
    ],

  });

  //handle props.data change and update chart
  useEffect(() => {
    setState({
      key: 1,
      series: [
        {
          name: props.label1,
          data: props.data1,
        },
  
        {
          name: props.label2,
          data: props.data2,
        },
      ],
  })
  }, [props.data1, props.data2]);
//





  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark-2 sm:px-7.5 h-full">

      <div>
        <h4 className="text-xl font-semibold text-black dark:text-white text-left mb-4">
          {props.title}
        </h4>
      </div>


      <div>
        <div id="BarChart2" className="-ml-5">
          <ReactApexChart
            key={state.key}
            options={options ? options : {}}
            series={state.series ? state.series : []}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart2;
