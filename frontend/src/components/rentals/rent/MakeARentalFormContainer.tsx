import { useState } from "react";
import OperationResult from "../../general/OperationResult";
import DOMAIN_NAME from "../../../utilities/domainName";

import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import formatDate from "../../../utilities/formatDate";

enum PageStatus {
  FillingTheForm,
  FormWasSentCorrectly,
  ErrorWithSendingForm,
  FailOnSendingForm
}

type dataSchema = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged',
}

interface MakeARentalFormContainerProps {
    data: dataSchema;
}

const MakeARentalFormContainer = (props: MakeARentalFormContainerProps) => {
  type warnings = {
    pl: string,
    en: string,
  } 

  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])
  const [pageState, setPageState] = useState<PageStatus>(PageStatus.FillingTheForm)

  const [carMileageBefore, setCarMileageBefore] = useState<number>();
  const[showTravelDestinationInput, setShowTravelDestinationInput] = useState<boolean>(false);
  

  



  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${DOMAIN_NAME}/reservations/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        // TODO: ADD CORRECT USER!!!!!
        // body: JSON.stringify({carID: props.data.id, userID: 12, lastEditedByModeratorOfID: null, dateFrom: value?.startDate, dateTo: value?.endDate, travelDestination}),
      });

      if (response.ok) {
        setPageState(PageStatus.FormWasSentCorrectly);
      } else {
        const responseJSON = await response.json();
        if(responseJSON.status === 'fail') {
          setPageState(PageStatus.FailOnSendingForm);
          setWarnings(responseJSON.data);

        }
        else {
        setPageState(PageStatus.ErrorWithSendingForm);
        }
      }
    }
    catch (error) {
      setPageState(PageStatus.ErrorWithSendingForm);
    }
  };


    

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
  
          <div className='p-5 pt-0'>
          <img src={props.data.imgPath} alt="Zdjęcie samochodu" className='w-full border-2 rounded-md'/>
          <p className='text-black dark:text-white pb-2 text-lg'>{props.data.brand}&nbsp;{props.data.model}</p>
          </div>

          
            <div className='col-span-3'>
            
              <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
                  {pageState === PageStatus.FillingTheForm ?
                    <form onSubmit={submitHandler}>
                      <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white">
                          Przebieg początkowy:
                        </label>
                        <input
                          required
                          type="number"
                          placeholder={`Wpisz przebieg samochodu przed rozpoczęciem podróży`}
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          value={carMileageBefore}
                          onChange={e => setCarMileageBefore(Number(e.target.value))}
                        />
                      </div>

                      <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                        <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                          Czy chcesz już teraz wpisać cel swojej podróży?
                        </label>
                        <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                          <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path fill="#3C50E0" d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"/></svg>
                          </span>
                          <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                          value={showTravelDestinationInput}
                          onChange={setShowTravelDestinationInput((e: HTMLInputElement) => (e.target.value)}
                          >
                            <option value={false}>Nie</option>
                            <option value={true}>Tak</option>
                          </select>
                        </div>
                      </div>

                      <div className='flex justify-center mb-2'>
                      <button className="flex w-90 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='submit'>
                          Wypożycz samochód
                        </button>
                      </div>
                    </form>
                  :
                  pageState === PageStatus.FormWasSentCorrectly ?
                    <OperationResult status={'success'} title={'Pomyślnie dokonano rezerwacji 👍'} description={'Będzie ona teraz widoczna dla innych użytkowników.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/rezerwacje/moje-rezerwacje`}/>
                  :
                  pageState === PageStatus.ErrorWithSendingForm ?
                  <OperationResult status={'error'} title={'Wystąpił błąd podczas składania rezerwacji 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(PageStatus.FillingTheForm)}/>
                  :
                  pageState === PageStatus.FailOnSendingForm ?
                  <OperationResult status={'warning'} title={'Wystąpiły błędy podczas składania rezerwacji 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(PageStatus.FillingTheForm)}/>
                  :
                  ''
                  }
              </div>
              
            </div>
         
        </div>
        
        </>
    );
  };
  
  export default MakeARentalFormContainer