


interface ReportFaultFormContainerProps {
    carID: number;
    carFullname: string;
    carImg: string;
}

const ReportFaultFormContainer = (props: ReportFaultFormContainerProps) => {
    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
  
          <div className='p-5 pt-0'>
          <img src={props.carImg} alt="Zdjęcie samochodu" className='w-full border-2 rounded-md'/>
          <p className='text-black dark:text-white pb-2 text-lg'>{props.carFullname}</p>
          </div>
  
          <div className='col-span-3'>
          <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
             <p>Insert form here!</p>
          </div>
          </div>
        </div>
        </>
    );
  };
  
  export default ReportFaultFormContainer;