import { Link } from "react-router-dom";

interface FaultDetailsContainerProps {
  id: number;
  carID: number;
  carFullname: string;
  carImg: string;
  userID: number;
  userFullname: string;
  moderatorID: number;
  moderatorFullname: string;
  createdAt: string;
  lastChangeAt: string;
  title: string;
  description: string;  
  status: 'pending' | 'accepted' | 'finished' | 'cancelled';
  resultDesctiption: string;
  repairCost: number;
}

const FaultDetailsContainer = (props: FaultDetailsContainerProps) => {
  

  const faultStatusJSX = (status: FaultDetailsContainerProps["status"]):JSX.Element => {

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
            result = <span className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-danger cursor-default">Anulowana</span>
            break;
    }
    return result;
  }


    return (
      <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">

        <div className='p-5 pt-0'>
        <img src={props.carImg} alt="Zdjęcie samochodu" className='w-full border-2 rounded-md'/>
        <p className='text-black dark:text-white pb-2 text-lg'>{props.carFullname}</p>
        <Link
        to={`#`}
        className={`inline-flex items-center justify-center rounded-full bg-primary py-2 px-7 text-center text-base font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8 mt-2`}
        >
        Zgłoś nową usterkę
        </Link>
        </div>

        <div className='col-span-3'>
        <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
            <h1 className="text-3xl font-bold mb-3">{props.title}</h1>
            <p className="mb-2"><h5 className="font-bold inline-block">Status:&nbsp;</h5>{faultStatusJSX(`${props.status}`)}</p>
            <p className="mb-0"><h5 className="font-bold inline-block">Usterka zgłoszona przez:&nbsp;</h5>{props.userFullname}</p>
            <p className="mb-2"><h5 className="font-bold inline-block">Data zgłoszenia usterki:&nbsp;</h5>{props.createdAt}</p>
            <p className="mb-0"><h5 className="font-bold inline-block">Usterka zaakceptowana przez moderatora:&nbsp;</h5>{props.moderatorFullname}</p>
            <p className="mb-6"><h5 className="font-bold inline-block">Data ostatniej zmiany statusu:&nbsp;</h5>{props.lastChangeAt}</p>

            <p className="mb-1"><h5 className="font-bold inline-block">Szczegółowy opis problemu:&nbsp;</h5></p>
            <div className="mb-6 border rounded-md p-2 w-[100%] md:w-[70%] dark:bg-graydark">
            <p>{props.description}</p>
            </div>

            <p className="mb-1"><h5 className="font-bold inline-block">Komentarz moderatora:&nbsp;</h5></p>
            <div className="mb-1 border rounded-md p-2 w-[100%] md:w-[70%]">
            <p>{props.resultDesctiption}</p>
            </div>
        </div>
        </div>
      </div>
      </>
    );
  };
  
  export default FaultDetailsContainer;
  