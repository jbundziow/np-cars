


interface ReservationsOverviewTableRowProps {
    carID: number;
    carBrand: string;
    carModel: string;
    carImg: string;
  }

const ReservationsOverviewTableRow = (props: ReservationsOverviewTableRowProps) => {


    return (
    <>
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <div className="col-span-3 flex items-center">
        <div className="flex flex-col sm:gap-4 xl:flex-row xl:items-center">
            <div className=" w-22 sm:w-32 rounded-md">
            <img 
            className="rounded-md block"
            src={props.carImg} alt="Zdjęcie samochodu" />
            </div>
            <h5 className="font-medium text-xs sm:text-base text-black dark:text-white">
            {`${props.carBrand} ${props.carModel}`}
            </h5>
        </div>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        {/* <div className="flex items-center space-x-3.5"> */}
            <div className='flex flex-row gap-1 flex-wrap'>
                <div className='w-10 h-10 rounded-xl text-white bg-primary flex justify-center items-center'>pn.</div>
                <div className='w-10 h-10 rounded-xl gap-1 bg-primary flex justify-center items-center'>wt.</div>
                <div className='w-10 h-10 rounded-lg bg-primary flex justify-center items-center'>pn.</div>
                <div className='w-10 h-10 rounded-lg gap-1 bg-primary flex justify-center items-center'>pn.</div>
                <div className='w-10 h-10 rounded-lg bg-primary flex justify-center items-center'>pn.</div>
                <div className='w-10 h-10 rounded-lg gap-1 bg-primary flex justify-center items-center'>pn.</div>
                <div className='w-10 h-10 rounded-lg bg-primary flex justify-center items-center'>pn.</div>
                <div className='w-10 h-10 rounded-lg gap-1 bg-primary flex justify-center items-center'>pn.</div>
                <div className='w-10 h-10 rounded-lg bg-primary flex justify-center items-center'>pn.</div>
                <div className='w-10 h-10 rounded-lg gap-1 bg-primary flex justify-center items-center'>pn.</div>
                <div className='w-10 h-10 rounded-lg bg-primary flex justify-center items-center'>pn.</div>
                <div className='w-10 h-10 rounded-lg gap-1 bg-primary flex justify-center items-center'>pn.</div>
                <div className='w-10 h-10 rounded-lg bg-primary flex justify-center items-center'>pn.</div>
                <div className='w-10 h-10 rounded-lg gap-1 bg-primary flex justify-center items-center'>pn.</div>
            </div>
        {/* </div> */}
    </td>
    </tr>
    </>
    );
  };
  
  export default ReservationsOverviewTableRow;