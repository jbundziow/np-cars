import FuelLevelBar from './FuelLevelBar';


interface RefuelingsOverviewTableRowProps {
    carID: number;
    carBrand: string;
    carModel: string;
    carImg: string;
    lastRefueling: number;
    predictedFuelLevel: number;
  }

const RefuelingsOverviewTableRow = (props: RefuelingsOverviewTableRowProps) => {





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
    <td className="hidden md:table-cell border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p>{props.lastRefueling}km temu</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
          <FuelLevelBar level={props.predictedFuelLevel}/>
    </td>
    </tr>
    </>
    );
  };
  
  export default RefuelingsOverviewTableRow;