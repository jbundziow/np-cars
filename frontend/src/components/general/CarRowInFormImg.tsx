import { Link } from 'react-router-dom'
import UnknownCarImg from '../../images/cars/unknown_car_1280_720.png'
import { useState } from 'react';
import ImgLoader from '../../common/Loader/ImgLoader';
import { BACKEND_IMG_URL } from '../../utilities/domainName';
import { db_Car_basic } from '../../types/db_types';

type CarRowInFormImgProps = {
    carData: db_Car_basic;
  }
  
  
  export default function CarRowInFormImg(props: CarRowInFormImgProps) {

    const [imgLoaded, setImgLoaded] = useState(false);


    return (
        <div className='p-5 pt-0'>

        {imgLoaded ? null : (
            <ImgLoader/>
        )}
        <img
        src={`${BACKEND_IMG_URL}${props.carData.imgPath}` || UnknownCarImg}
        style={imgLoaded ? {} : { display: 'none' }}
        onLoad={() => setImgLoaded(true)}
        alt="Zdjęcie samochodu"
        className='w-full border-2 rounded-md'
        />

        <Link to={`/samochody/${props.carData.id}`} target={'_self'} className="underline decoration-[0.5px] underline-offset-1 inline-block">
        <p className='text-black dark:text-white pb-2 text-lg'>{props.carData.brand}&nbsp;{props.carData.model}</p>
        </Link>
        </div>
    )
  }