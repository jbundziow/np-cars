import { Link } from "react-router-dom";
import FaultsStatusCardCounter from "./FaultsStatusCardCounter";
import { db_Car_basic } from "../../../types/db_types";
import DOMAIN_NAME from "../../../utilities/domainName";
import ImgLoader from "../../../common/Loader/ImgLoader";
import UnknownCarImg from "../../../images/cars/unknown_car_1280_720.png";
import { useState } from "react";


type FaultsStatusCardProps = {
  carData: db_Car_basic,
  numberOfPendingFaults: number,
  numberOfFaultsInProgress: number,
  numberOfClosedFaults: number
}


const FaultsStatusCard = (props: FaultsStatusCardProps) => {

  const [imgLoaded, setImgLoaded] = useState(false);



    return (
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className='flex flex-col items-center'>
        <p className='text-black dark:text-white pb-2 text-xl font-bold'>{props.carData.brand} {props.carData.model}</p>

        {imgLoaded ? null : (
            <ImgLoader/>
        )}
        <img
        src={`${DOMAIN_NAME}${props.carData.imgPath}` || UnknownCarImg}
        style={imgLoaded ? {} : { display: 'none' }}
        onLoad={() => setImgLoaded(true)}
        alt="Zdjęcie samochodu"
        className='w-full border-2 rounded-md'
        />

        <div className='grid grid-cols-3 gap-3 py-2'>
        {/* INSERT COUTNERS THERE */}
        <FaultsStatusCardCounter amount={props.numberOfPendingFaults} text="oczekujące"/>
        <FaultsStatusCardCounter amount={props.numberOfFaultsInProgress} text="w trakcie"/>
        <FaultsStatusCardCounter amount={props.numberOfClosedFaults} text="rozwiązanych"/>
        </div>
        <Link
        to={`./${props.carData.id}`}
        className={`inline-flex items-center justify-center rounded-full bg-primary py-3 px-8 text-center font-medium text-white hover:bg-opacity-90 mt-3`}
        >
        Zobacz szczegóły
        </Link>
        </div>
          
        
      </div>
    );
  };
  
  export default FaultsStatusCard;
  