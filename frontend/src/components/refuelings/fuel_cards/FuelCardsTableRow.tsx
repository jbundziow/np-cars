import { useState } from 'react';
import { db_Car } from '../../../types/db_types';
import CarRowInTable from '../../general/CarRowInTable';



  interface FuelCardsTableRowProps {
    data: db_Car;
  }

const FuelCardsTableRow = (props: FuelCardsTableRowProps) => {

  const [showPIN, setShowPIN] = useState<boolean>(false);

  const handleButtonClick = () => {
    setShowPIN(true);
  }



    return (
    <>
    <tr className="max-md:odd:bg-gray-2 md:hover:bg-gray-2 max-md:odd:dark:bg-meta-4 md:dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.data.id} brand={props.data.brand} model={props.data.model} imgPath={props.data.imgPath} linkTarget={'_self'}/>
    </td>


    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="space-x-3.5 flex justify-center items-center">
        {!showPIN ?
          <button
          onClick={handleButtonClick}
          className='inline-flex items-center justify-center rounded-full bg-primary py-1 sm:py-2 px-4 sm:px-7 text-center text-xs sm:text-base font-medium text-white hover:bg-opacity-80 lg:px-6 xl:px-8'
          >
          Pokaż kod PIN
          </button>
        :
          <>
          {props.data.fuelCardPIN ? <p className="text-black dark:text-white sm:text-2xl text-center mb-4 tracking-widest">{props.data.fuelCardPIN}</p> : <p className="text-black dark:text-white text-xs sm:text-base text-center mb-4">Brak karty paliwowej</p>}
          </>
        }
        </div>
    </td>


    </tr>
    </>
    );
  };
  
  export default FuelCardsTableRow;