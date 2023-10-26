import TwoWeeksReservations from "./TwoWeeksReservations";



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
        
            {/* <div className='flex flex-row gap-1 flex-wrap'>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>czw.</div>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>pt.</div>
                <div className="flex flex-row gap-1">
                <div className='w-0.5 h-10 bg-warning'></div>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>sob.</div>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>ndz.</div>
                <div className='w-0.5 h-10 bg-warning'></div>
                </div>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>pon.</div>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>wt.</div>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-danger flex justify-center items-center cursor-default'>śr.</div>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>czw.</div>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>pt.</div>
                <div className="flex flex-row gap-1">
                <div className='w-0.5 h-10 bg-warning'></div>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>sob.</div>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>ndz.</div>
                <div className='w-0.5 h-10 bg-warning'></div>
                </div>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>pon.</div>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>wt.</div>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>śr.</div>
                <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>czw.</div>
            </div> */}
        <TwoWeeksReservations reservationsArr={[1,2,3]}/>
    </td>
    </tr>
    </>
    );
  };
  
  export default ReservationsOverviewTableRow;