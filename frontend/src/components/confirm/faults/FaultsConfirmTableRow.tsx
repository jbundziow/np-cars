import CarRowInTable from "../../general/CarRowInTable";
import { db_Car_basic, db_Fault, db_User } from "../../../types/db_types";
import UserSpan from "../../general/spanElements/UserSpan";
import { Link } from "react-router-dom";





interface FaultsConfirmTableRowProps {
    carData: db_Car_basic;
    faultData: db_Fault;
    userData: db_User;
  }

const FaultsConfirmTableRow = (props: FaultsConfirmTableRowProps) => {

    
   
   

    return (
    <>
    
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.carData?.id} brand={props.carData?.brand} model={props.carData?.model} imgPath={props.carData?.imgPath} linkTarget={'_self'}/>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base min-w-[200px] text-center'>{props.faultData.title}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-base'><UserSpan userObj={props.userData} nullText={'Brak danych'} linkTarget={'_self'} no_wrap={true}/></p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
        <Link
        to={`/usterki/${props.faultData.id}`}
        className='inline-flex items-center justify-center rounded-full bg-primary py-1 sm:py-2 px-4 sm:px-7 text-center text-xs sm:text-base font-medium text-white hover:bg-opacity-80 lg:px-6 xl:px-8 whitespace-nowrap'
        >
        Zmień status
        </Link>
        </div>
    </td>
    </tr>
    
    </>
    );
  };
  
  export default FaultsConfirmTableRow;