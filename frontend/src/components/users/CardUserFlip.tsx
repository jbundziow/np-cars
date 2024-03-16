import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db_User } from '../../types/db_types';
import DOMAIN_NAME from '../../utilities/domainName';
import { AuthType } from '../../types/common';
import UserMale from '../../images/user/unknownUserMale.jpg';
import UserFemale from '../../images/user/unknownUserFemale.jpg';
import ImgLoader from '../../common/Loader/ImgLoader';

enum cardBackStatusEnum {
  loading,
  success,
  error,
}


type CardUserButton = {
  text: string;
  link: string;
}

interface CardUserFlipProps {
  userData: db_User;
  primaryButtonText: string;
  secondaryButton: CardUserButton;
  auth: AuthType;
}

const CardUserFlip = (props: CardUserFlipProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [cardBackStatus, setCardBackStatus] = useState<cardBackStatusEnum>(cardBackStatusEnum.loading);

  const handlePrimaryButtonClick = async () => {
    setCardFlipped(true);

    try {
      const response = await fetch(`${DOMAIN_NAME}/admin/users/confirm`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify({ userid: props.userData.id }),
      });

      if (response.ok) {
        setCardBackStatus(cardBackStatusEnum.success);
      } else {
        const responseJSON = await response.json();
        if(responseJSON.status === 'fail') {
          setCardBackStatus(cardBackStatusEnum.error);

        }
        else {
          setCardBackStatus(cardBackStatusEnum.error);
        }
      }
    }
    catch (error) {
      setCardBackStatus(cardBackStatusEnum.error);
    }

  };


  const [containerHeight, setContainerHeight] = useState('auto');
  useEffect(() => {
    //calculate the height dynamically based on the content
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
  }, [cardFlipped, imgLoaded]);



  return (
    <div   style={{ height: containerHeight }}>
    <div className="card-flip-container">
      <div className={`card-flip ${cardFlipped ? 'flipped' : ''}`}>


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
              {props.primaryButtonText}
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
          {cardFlipped && cardBackStatus === cardBackStatusEnum.loading &&
          <div className="flex flex-col justify-center items-center">
          <h3 className="text-black dark:text-white text-center mt-3 font-bold text-xl">Ładowanie...</h3>
            <div className='flex justify-center items-center my-3'>
                <div className="mt-0 h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
          <p className="text-black dark:text-white font-bold text-center">Pracujemy nad tym...</p>
          </div>
          }
          {cardFlipped && cardBackStatus === cardBackStatusEnum.success &&
          <div className="flex flex-col justify-center items-center">
          <h3 className="text-black dark:text-white text-center mt-3 font-bold text-xl">Sukces!</h3>
            <svg className="text-green-600 w-16 h-16 mx-auto my-3 drop-shadow-2xl animate-wiggle-once-short" xmlns="http://www.w3.org/2000/svg" height="10em" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
          <p className="text-black dark:text-white font-bold text-center">Użytkownik został potwierdzony i może już normalnie korzystać z serwisu.</p>
          </div>
          }
          {cardFlipped && cardBackStatus === cardBackStatusEnum.error &&
          <div className="flex flex-col justify-center items-center">
          <h3 className="text-black dark:text-white text-center mt-3 font-bold text-xl">Coś poszło nie tak!</h3>
            <svg className="text-danger w-16 h-16 mx-auto my-3 drop-shadow-2xl animate-wiggle-once-short" xmlns="http://www.w3.org/2000/svg" height="10em" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
          <p className="text-black dark:text-white font-bold text-center">Nie udało się potwierdzić użytkownika. Spróbuj ponownie później.</p>
          </div>
          }
        </div>
        </div>


      </div>
    </div>
    </div>
  );
};

export default CardUserFlip;
