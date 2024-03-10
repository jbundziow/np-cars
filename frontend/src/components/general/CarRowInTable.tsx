import { Link } from 'react-router-dom'
import UnknownCarImg from '../../images/cars/unknown_car_1280_720.png'
import { useState } from 'react';
import ImgLoader from '../../common/Loader/ImgLoader';
import DOMAIN_NAME from '../../utilities/domainName';

type CarRowInTableProps = {
    id: number | undefined,
    brand: string | undefined,
    model: string | undefined,
    imgPath: string | null | undefined,
    linkTarget: '_blank' | '_self'
  }
  
  
  export default function CarRowInTable(props: CarRowInTableProps) {

    const [imgLoaded, setImgLoaded] = useState(false);


    return (
        <div className="col-span-3 flex items-center">
        <div className="flex flex-col sm:gap-4 xl:flex-row xl:items-center">
            <div className=" w-22 sm:w-32 rounded-md">

            {imgLoaded ? null : (
              <ImgLoader/>
            )}
            <img
            src={`${DOMAIN_NAME}${props.imgPath}` || UnknownCarImg}
            style={imgLoaded ? {} : { display: 'none' }}
            onLoad={() => setImgLoaded(true)}
            alt="Zdjęcie samochodu"
            className='rounded-md block'
            />
            
            </div>
            <Link to={props.id ? `/samochody/${props.id}` : `./#`} target={props.id ? props.linkTarget : '_self'} className="underline decoration-[0.5px] underline-offset-1">
            <h5 className="font-medium text-xs sm:text-base text-black dark:text-white">
            {`${props.brand || '#ERR'} ${props.model || ''}`}
            </h5>
            </Link>
        </div>
        </div>
    )
  }