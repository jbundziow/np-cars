import UnknownCarImg from '../../../images/cars/unknown_car_1280_720.png';
import { Link } from "react-router-dom";
import { db_Car_basic } from '../../../types/db_types';
import { AuthType } from '../../../types/common';
import { useState } from 'react';
import ImgLoader from '../../../common/Loader/ImgLoader';
import { BACKEND_IMG_URL } from '../../../utilities/domainName';

type CardCarButton = {
  text: string;
  link: string;
}

interface CardCarProps {
  carData: db_Car_basic;
  primaryButton: CardCarButton;
  secondaryButton: CardCarButton;
  auth: AuthType;
}



const CardCar = (props: CardCarProps) => {

  const [imgLoaded, setImgLoaded] = useState(false);



    return (
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className='flex justify-center'>
        

        {imgLoaded ? null : (
          <ImgLoader/>
        )}
        <img
        src={`${BACKEND_IMG_URL}${props.carData.imgPath}` || UnknownCarImg}
        style={imgLoaded ? {} : { display: 'none' }}
        onLoad={() => setImgLoaded(true)}
        alt="Zdjęcie samochodu"
        className='w-full border-2 rounded-2xl'
        />
    

        </div>
        <div className='flex justify-center py-2'>
        {props.carData.availabilityStatus === 'available' ?
        <span className="bg-success p-1 rounded-lg text-xs text-white cursor-default">Dostępny</span> :
        props.carData.availabilityStatus === 'rented' ?
        <span className="bg-warning p-1 rounded-lg text-xs text-white cursor-default">Wypożyczony</span> :
        props.carData.availabilityStatus === 'notAvailable' ?
        <span className="bg-danger p-1 rounded-lg text-xs text-white cursor-default">Niedostępny</span> :
        props.carData.availabilityStatus === 'damaged' ?
        <span className="bg-danger p-1 rounded-lg text-xs text-white cursor-default">Uszkodzony</span> :
        props.carData.availabilityStatus === 'onService' ?
        <span className="bg-danger p-1 rounded-lg text-xs text-white cursor-default">W serwisie</span> :
        props.carData.availabilityStatus === 'banned' ?
        <span className="bg-danger p-1 rounded-lg text-xs text-white cursor-default">Zbanowany</span> :
        <span className='h-6'></span>
        }
        </div>
          <p className='text-black dark:text-white text-center whitespace-nowrap'>{`${props.carData.brand} ${props.carData.model}`}</p>

          <div className='flex flex-col md:flex-row justify-center items-center gap-5 mt-3'>
            <Link
            className="flex w-full md:w-1/2 justify-center rounded bg-primary p-2 font-medium text-gray hover:opacity-90"
            to={props.primaryButton.link}
            >
              {props.primaryButton.text}
            </Link>

            {props.auth.userRole === 'admin' ?
            <Link
            className="flex w-full md:w-1/2 justify-center rounded bg-danger p-2 font-medium text-gray hover:opacity-90"
            to={props.secondaryButton.link}
            >
              {props.secondaryButton.text}
            </Link>
            :
            null
            }

          </div>
        
      </div>
    );
  };
  
  export default CardCar;
  