type CardStatProps = {
  svg: JSX.Element;
  value: string | number;
  title: string;
  showProgress: boolean;
  progressValue?: string | number;
  isProgressPositive?: boolean;
}

const CardStat = (props: CardStatProps) => {
  return (
    <div className="flex flex-col justify-between rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark-2">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {props.svg}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className="flex flex-col items-start">
          <h4 className="text-title-md font-bold text-black dark:text-white text-left whitespace-nowrap">
            {props.value}
          </h4>
          <span className="text-sm font-medium text-left">{props.title}</span>
        </div>
        {props.showProgress &&
        <span className={`flex items-center gap-1 text-sm font-medium text-meta-3 whitespace-nowrap ${props.isProgressPositive ? 'text-meta-3' : 'text-meta-5'}`}>
          {props.progressValue}
          {props.isProgressPositive ?
          <svg
            className="fill-meta-3"
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
              fill=""
            />
          </svg>
          :
          <svg
            className="fill-meta-5"
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
              fill=""
            />
          </svg>
          }
        </span>

        }
      </div>
    </div>
  );
};

export default CardStat;
