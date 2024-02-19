import { Link } from "react-router-dom";

import { dateFormatter } from "../../../utilities/dateFormatter";
import useAuth from "../../../hooks/useAuth";

type carData = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged',
}

type faultData = {
  id: number,
  carID: number,
  userID: number,
  moderatorID: number | null,
  lastChangeAt: string | null,
  title: string,
  description: string,  
  status: 'pending' | 'accepted' | 'finished' | 'cancelled',
  resultDescription: string | null,
  repairCost: number | null,
  createdAt: string,
  updatedAt: string,
}

type usersData = {
  id: number,
  email: string,
  gender: 'male' | 'female',
  name: string,
  surname: string,
  employedAs: string,
  avatarPath: string | null,
  role: 'unconfirmed' | 'banned' | 'admin' | 'user',
}

type faultDataSchema = {
  carData: carData,
  faultData: faultData,
}

interface FaultDetailsContainerProps {
  faultAndCarData: faultDataSchema,
  usersData: usersData[] | [],
}


const FaultDetailsContainer = (props: FaultDetailsContainerProps) => {

  

  const faultStatusJSX = (status: faultData["status"]):JSX.Element => {

    let result:JSX.Element = <span>Błąd</span>;
    switch (status) {
        case 'pending':
            result = <span className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-danger cursor-default">Do akceptacji</span>
            break;
        case 'accepted':
            result = <span className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-warning cursor-default">W trakcie</span>
            break;
        case 'finished':
            result = <span className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-success cursor-default">Rozwiązana</span>
            break;
        case 'cancelled':
            result = <span className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-danger cursor-default">Odrzucona</span>
            break;
    }
    return result;
  }


  const userSpan = (user: usersData | undefined, nullText: string):JSX.Element => {
      if(user) {
          return <>{user.role === 'admin' ? <span className="rounded-lg bg-success bg-opacity-10 py-0 px-1 font-medium text-success cursor-default">Admin</span> : ''}&nbsp;<Link to={`/uzytkownicy/${user.id}`} target="_blank"><span className="underline decoration-[0.5px] underline-offset-1">{user.name} {user.surname}</span></Link></>
      }
      else {
          return <span className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 font-medium text-warning">{nullText}</span>
      }
  }


  const userObject = props.usersData.find(user => user.id === props.faultAndCarData.faultData.userID);
  const moderatorObject = props.usersData.find(user => user.id === props.faultAndCarData.faultData.moderatorID);
  const { auth } = useAuth();


    return (
      <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">

        <div className='p-5 pt-0'>
        <img src={props.faultAndCarData.carData.imgPath} alt="Zdjęcie samochodu" className='w-full border-2 rounded-md'/>
        <p className='text-black dark:text-white pb-2 text-lg'>{props.faultAndCarData.carData.brand}&nbsp;{props.faultAndCarData.carData.model}</p>
        <Link
        to={`/usterki/zglos/${props.faultAndCarData.carData.id}`}
        className={`inline-flex items-center justify-center rounded-full bg-primary py-2 px-7 text-center text-base font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8 mt-2`}
        >
        Zgłoś nową usterkę
        </Link>
        </div>

        <div className='col-span-3'>
        <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
            <h1 className="text-3xl font-bold mb-3">{props.faultAndCarData.faultData.title}</h1>
            <p className="mb-2"><h5 className="font-bold inline-block">Status:&nbsp;</h5>{faultStatusJSX(`${props.faultAndCarData.faultData.status}`)}</p>
            {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
            <p className="mb-0"><h5 className="font-bold inline-block">Usterka zgłoszona przez:&nbsp;</h5>{userSpan(userObject, `#BŁĄD`)}</p>
            <p className="mb-2"><h5 className="font-bold inline-block">Data zgłoszenia usterki:&nbsp;</h5>{dateFormatter(props.faultAndCarData.faultData.createdAt)}</p>
            {props.faultAndCarData.faultData.status !== 'pending' ?
            <>
            {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
            <p className="mb-0"><h5 className="font-bold inline-block">Usterka zaakceptowana przez moderatora:&nbsp;</h5>{props.faultAndCarData.faultData.moderatorID === null ? '-' : userSpan(moderatorObject, `#BŁĄD`)}</p>
            <p className="mb-6"><h5 className="font-bold inline-block">Data ostatniej zmiany statusu:&nbsp;</h5>{props.faultAndCarData.faultData.lastChangeAt === null ? '-' : dateFormatter(props.faultAndCarData.faultData.lastChangeAt)}</p>
            </>
            :
            null
            }
            

            <p className="mb-1"><h5 className="font-bold inline-block">Szczegółowy opis problemu:&nbsp;</h5></p>
            <div className="mb-6 border rounded-md p-2 w-full md:w-[90%] dark:bg-form-input">
            <p>{props.faultAndCarData.faultData.description}</p>
            </div>
            {props.faultAndCarData.faultData.status !== 'pending' ?
            <>
            <p className="mb-1"><h5 className="font-bold inline-block">Komentarz moderatora:&nbsp;</h5></p>
            <div className="mb-1 border rounded-md p-2 w-full md:w-[90%] dark:bg-form-input">
            {props.faultAndCarData.faultData.resultDescription ? <p>{props.faultAndCarData.faultData.resultDescription}</p> : <p className='text-danger'>Brak komentarza.</p>}
            </div>
            {props.faultAndCarData.faultData.status === 'finished' &&  auth.userRole === 'admin' && props.faultAndCarData.faultData.repairCost ?
            <p className="mt-4 mb-1"><h5 className="font-bold inline-block">Koszt naprawy:&nbsp;</h5>{props.faultAndCarData.faultData.repairCost} zł [netto]</p>
            :
            null
            }
            </>
            :
            null
            }
        </div>
        </div>
      </div>
      </>
    );
  };
  
  export default FaultDetailsContainer;
  