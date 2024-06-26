import formatDate from "../../../utilities/formatDate";
import CarRowInTable from "../../general/CarRowInTable";
import { db_Car } from "../../../types/db_types";
import { countDaysLeft } from "../../../utilities/countDaysLeft";





interface InsurancesTableRowProps {
    carData: db_Car,
  }

const InsurancesTableRow = (props: InsurancesTableRowProps) => {

   
    const daysLeft: number | '#ERR' = countDaysLeft(new Date(props.carData.nextInsuranceDate));


    return (
    <>
    <tr className="max-md:odd:bg-gray-2 md:hover:bg-gray-2 max-md:odd:dark:bg-meta-4 md:dark:hover:bg-meta-4">


    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.carData.id} brand={props.carData.brand} model={props.carData.model} imgPath={props.carData.imgPath} linkTarget={'_self'}/>
    </td>


    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'>{formatDate(new Date(props.carData.nextInsuranceDate))}</p>
        </div>
    </td>


    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        {daysLeft !== '#ERR' ?
            <p className={`inline-flex rounded-md py-1 px-2 sm:py-2 sm:px-4 text-xs sm:text-base font-bold text-white cursor-default ${daysLeft <= 3 ? 'bg-danger' : daysLeft <= 14 ? 'bg-warning' : 'bg-success'}`}>{daysLeft}</p>
        :
            <p className="inline-flex rounded-md py-1 px-2 sm:py-2 sm:px-4 text-xs sm:text-base font-bold text-white cursor-default bg-danger">#ERR</p>
        }

        </div>
    </td>



    </tr>
    </>
    );
  };
  
  export default InsurancesTableRow;

