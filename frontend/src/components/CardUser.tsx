// import UnknownCarImg from '../images/cars/unknown_car_1280_720.png'
import UserMale from '../images/user/unknownUserMale.jpg'
import UserFemale from '../images/user/unknownUserFemale.jpg'
import { Link } from "react-router-dom";
import { db_User } from '../types/db_types';
import DOMAIN_NAME from '../utilities/domainName';
import { AuthType } from '../types/common';

type CardUserButton = {
  text: string;
  link: string;
}

interface CardUserProps {
  userData: db_User;
  primaryButton: CardUserButton;
  secondaryButton: CardUserButton;
  auth: AuthType;
}


const CardUser = (props: CardUserProps) => {
    return (
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className='flex justify-center'>
        <img
        src={props.userData.avatarPath !== null ? `${DOMAIN_NAME}${props.userData.avatarPath}` : props.userData.gender === 'female' ? UserFemale : UserMale}
        alt="Avatar użytkownika"
        className='w-full border-2 rounded-full'
        />
        </div>
        <div className='flex justify-center py-2'>
        {props.userData.role === 'admin' ? <span className="bg-success p-1 rounded-lg text-xs text-white cursor-default">Admin</span> : props.userData.role === 'banned' ? <span className="bg-danger p-1 rounded-lg text-xs text-white cursor-default">Zbanowany</span> : <span className='h-6'></span>}
        </div>
          <p className='text-black dark:text-white text-center whitespace-nowrap'>{`${props.userData.name} ${props.userData.surname}`}</p>
          <p className='text-black dark:text-white text-center text-xs py-2 whitespace-nowrap'>{`${props.userData.employedAs}`}</p>

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
  
  export default CardUser;
  