import CarRowInTable from '../../general/CarRowInTable';
import FuelLevelBar from './FuelLevelBar';


interface RefuelingStatistics {
    carID: number,
    carBrand: string,
    carModel: string,
    imgPath: string,
    lastRefuelingWasKmAgo: number | null,
    predictedFuelLevel: number | null,
  }

  interface RefuelingsOverviewTableRowProps {
    data: RefuelingStatistics
  }

const RefuelingsOverviewTableRow = (props: RefuelingsOverviewTableRowProps) => {





    return (
    <>
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.data.carID} brand={props.data.carBrand} model={props.data.carModel} imgPath={props.data.imgPath} linkTarget={'_self'}/>
    </td>
    <td className="hidden md:table-cell border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className={props.data.lastRefuelingWasKmAgo ? 'dark:text-white text-black' : ''}>{props.data.lastRefuelingWasKmAgo ? `${props.data.lastRefuelingWasKmAgo}km temu` : `brak danych`}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
      {props.data.predictedFuelLevel ? <FuelLevelBar level={props.data.predictedFuelLevel}/> : <p className="text-center">brak danych</p>}
    </td>
    </tr>
    </>
    );
  };
  
  export default RefuelingsOverviewTableRow;