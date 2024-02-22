import { db_Car_basic } from '../../../types/db_types';
import CarRowInTable from '../../general/CarRowInTable';
import FuelLevelBar from './FuelLevelBar';



interface RefuelingsOverviewTableRowProps {
    carData: db_Car_basic;
    lastRefueling: number;
    predictedFuelLevel: number;
  }

const RefuelingsOverviewTableRow = (props: RefuelingsOverviewTableRowProps) => {





    return (
    <>
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.carData?.id} brand={props.carData?.brand} model={props.carData?.model} imgPath={props.carData?.imgPath} linkTarget={'_self'}/>
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