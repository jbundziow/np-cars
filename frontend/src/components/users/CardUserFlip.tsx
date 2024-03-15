import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db_User } from '../../types/db_types';
import DOMAIN_NAME from '../../utilities/domainName';
import { AuthType } from '../../types/common';
import UserMale from '../../images/user/unknownUserMale.jpg';
import UserFemale from '../../images/user/unknownUserFemale.jpg';
import ImgLoader from '../../common/Loader/ImgLoader';


// Rest of the code...

type CardUserButton = {
  text: string;
  link: string;
}

interface CardUserFlipProps {
  userData: db_User;
  primaryButton: CardUserButton;
  secondaryButton: CardUserButton;
  auth: AuthType;
}

const CardUserFlip = (props: CardUserFlipProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handlePrimaryButtonClick = () => {
    setShowSuccessMessage(true);
  };


  const [containerHeight, setContainerHeight] = useState('auto');
  useEffect(() => {
    // Calculate the height dynamically based on the content
    const updateContainerHeight = () => {
    const contentFrontCardHeight = document.getElementById('content-front-card')?.offsetHeight || 0;
    const contentBackCardHeight = document.getElementById('content-back-card')?.offsetHeight || 0;
    const finalHeight = Math.max(contentFrontCardHeight, contentBackCardHeight);
    setContainerHeight(`${finalHeight}px`);
    }

    updateContainerHeight();

    const handleResize = () => {
      updateContainerHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showSuccessMessage, imgLoaded]);



  return (
    <div   style={{ height: containerHeight }}>
    <div className="card-flip-container">
      <div className={`card-flip ${showSuccessMessage ? 'flipped' : ''}`}>
        <div className="card-front">
          <div id="content-front-card" className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className='flex justify-center'>
            {imgLoaded ? null : (
              <ImgLoader/>
            )}
            <img
              src={props.userData.avatarPath !== null ? `${DOMAIN_NAME}${props.userData.avatarPath}` : props.userData.gender === 'female' ? UserFemale : UserMale}
              style={imgLoaded ? {} : { display: 'none' }}
              onLoad={() => setImgLoaded(true)}
              alt="Avatar użytkownika"
              className='w-full border-2 rounded-full'
            />
          </div>
          <div className='flex justify-center py-2'>
            {props.userData.role === 'admin' ? <span className="bg-success p-1 rounded-lg text-xs text-white cursor-default">Admin</span> : props.userData.role === 'banned' ? <span className="bg-danger p-1 rounded-lg text-xs text-white cursor-default">Zbanowany</span> : props.userData.role === 'unconfirmed' ? <span className="bg-gray p-1 rounded-lg text-xs text-black cursor-default">Niepotwierdzony</span> : <span className='h-6'></span>}
          </div>
          <p className='text-black dark:text-white text-center whitespace-nowrap'>{`${props.userData.name} ${props.userData.surname}`}</p>
          <p className='text-black dark:text-white text-center text-xs py-2 whitespace-nowrap'>{`${props.userData.employedAs}`}</p>
          <div className='flex flex-col md:flex-row justify-center items-center gap-5 mt-3'>
            <button
              className="flex w-full md:w-1/2 justify-center rounded bg-primary p-2 font-medium text-gray hover:opacity-90"
              onClick={handlePrimaryButtonClick}
            >
              {props.primaryButton.text}
            </button>
            {props.auth.userRole === 'admin' ?
              <Link
                className="flex w-full md:w-1/2 justify-center rounded bg-danger p-2 font-medium text-gray hover:opacity-90"
                to={props.secondaryButton.link}
              >
                {props.secondaryButton.text}
              </Link>
              : null
            }
          </div>
          </div>
        </div>
        <div className="card-back">
        <div id="content-back-card" className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          {showSuccessMessage && <div className="text-green-500 text-center mt-3">Success Message</div>}
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CardUserFlip;
