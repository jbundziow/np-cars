import { Link } from "react-router-dom";

import dateFormatter from "../../../utilities/dateFormatter";

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
  resultDesctiption: string | null,
  repairCost: number | null,
  createdAt: string,
  updatedAt: string,
}

type dataSchema = {
  carData: carData,
  faultData: faultData,
}

interface FaultDetailsContainerProps {
  data: dataSchema
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



    return (
      <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">

        <div className='p-5 pt-0'>
        <img src={props.data.carData.imgPath} alt="Zdjęcie samochodu" className='w-full border-2 rounded-md'/>
        <p className='text-black dark:text-white pb-2 text-lg'>{props.data.carData.brand}&nbsp;{props.data.carData.model}</p>
        <Link
        to={`/usterki/zglos/${props.data.carData.id}`}
        className={`inline-flex items-center justify-center rounded-full bg-primary py-2 px-7 text-center text-base font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8 mt-2`}
        >
        Zgłoś nową usterkę
        </Link>
        </div>

        <div className='col-span-3'>
        <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
            <h1 className="text-3xl font-bold mb-3">{props.data.faultData.title}</h1>
            <p className="mb-2"><h5 className="font-bold inline-block">Status:&nbsp;</h5>{faultStatusJSX(`${props.data.faultData.status}`)}</p>
            {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
            <p className="mb-0"><h5 className="font-bold inline-block">Usterka zgłoszona przez:&nbsp;</h5>@@@ TODO: FETCH USER FULLNAME @@@</p>
            <p className="mb-2"><h5 className="font-bold inline-block">Data zgłoszenia usterki:&nbsp;</h5>{dateFormatter(props.data.faultData.createdAt)}</p>
            {props.data.faultData.status !== 'pending' ?
            <>
            {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
            <p className="mb-0"><h5 className="font-bold inline-block">Usterka zaakceptowana przez moderatora:&nbsp;</h5>{props.data.faultData.moderatorID === null ? '-' : '@@@ TODO: FETCH MODERATOR FULLNAME @@@'}</p>
            <p className="mb-6"><h5 className="font-bold inline-block">Data ostatniej zmiany statusu:&nbsp;</h5>{props.data.faultData.lastChangeAt === null ? '-' : dateFormatter(props.data.faultData.lastChangeAt)}</p>
            </>
            :
            null
            }
            

            <p className="mb-1"><h5 className="font-bold inline-block">Szczegółowy opis problemu:&nbsp;</h5></p>
            <div className="mb-6 border rounded-md p-2 w-full md:w-[90%] dark:bg-form-input">
            <p>{props.data.faultData.description}</p>
            </div>
            {props.data.faultData.status !== 'pending' ?
            <>
            <p className="mb-1"><h5 className="font-bold inline-block">Komentarz moderatora:&nbsp;</h5></p>
            <div className="mb-1 border rounded-md p-2 w-full md:w-[90%] dark:bg-form-input">
            {props.data.faultData.resultDesctiption ? <p>{props.data.faultData.resultDesctiption}</p> : <p className='text-danger'>Brak komentarza.</p>}
            </div>
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
  