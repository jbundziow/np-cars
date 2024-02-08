import { useState } from "react";
import OperationResult from "../../general/OperationResult";
import DOMAIN_NAME from "../../../utilities/domainName";


enum PageStatus {
  FillingTheForm,
  FormWasSentCorrectly,
  ErrorWithSendingForm,
  FailOnSendingForm
}

type basicCarDataSchema = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged',
}

type rentalDataSchema = {
    id: number,
    carID: number,
    userID: number,
    returnUserID: null,
    lastEditedByModeratorOfID: number | null,
    carMileageBefore: number,
    carMileageAfter: null,
    travelDestination: string | null,
    placeID: number | null,
    dateFrom: Date,
    dateTo: null,
    createdAt: Date,
    updatedAt: Date,
  }

interface RentalsReturnCarFormContainerProps {
    carBasicData: basicCarDataSchema,
    rentalData: rentalDataSchema,
}

const RentalsReturnCarFormContainer = (props: RentalsReturnCarFormContainerProps) => {
  type warnings = {
    pl: string,
    en: string,
  } 

  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])
  const [pageState, setPageState] = useState<PageStatus>(PageStatus.FillingTheForm)

 
  const [travelDestination, setTravelDestination] = useState<string>('')

  



  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // try {
    //   const response = await fetch(`${DOMAIN_NAME}/reservations/add`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json; charset=utf-8',
    //     },
    //     credentials: 'include',
    //     // TODO: ADD CORRECT USER!!!!!
    //     body: JSON.stringify({carID: props.data.id, userID: 12, lastEditedByModeratorOfID: null, dateFrom: value?.startDate, dateTo: value?.endDate, travelDestination}),
    //   });

    //   if (response.ok) {
    //     setPageState(PageStatus.FormWasSentCorrectly);
    //   } else {
    //     const responseJSON = await response.json();
    //     if(responseJSON.status === 'fail') {
    //       setPageState(PageStatus.FailOnSendingForm);
    //       setWarnings(responseJSON.data);

    //     }
    //     else {
    //     setPageState(PageStatus.ErrorWithSendingForm);
    //     }
    //   }
    // }
    // catch (error) {
    //   setPageState(PageStatus.ErrorWithSendingForm);
    // }
  };


    

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
  
          <div className='p-5 pt-0'>
          <img src={props.carBasicData.imgPath} alt="Zdjęcie samochodu" className='w-full border-2 rounded-md'/>
          <p className='text-black dark:text-white pb-2 text-lg'>{props.carBasicData.brand}&nbsp;{props.carBasicData.model}</p>
          </div>

          
            <div className='col-span-3'>
            
              <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
                  {pageState === PageStatus.FillingTheForm ?
                    <form onSubmit={submitHandler}>
                      

                      <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white">
                          Wpisz cel podróży:
                        </label>
                        <input
                          required
                          type="text"
                          placeholder={`np. "Marba Racula"`}
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          value={travelDestination}
                          onChange={e => setTravelDestination(e.target.value)}
                        />
                      </div>

                      <div className='flex justify-center mb-2'>
                      <button className="flex w-90 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='submit'>
                          Zwróć samochód
                        </button>
                      </div>
                    </form>
                  :
                  pageState === PageStatus.FormWasSentCorrectly ?
                    <OperationResult status={'success'} title={'Pomyślnie zwrócono samochód 👍'} description={'Dane z Twojej podróży zostały zapisane w bazie danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/wypozyczenia/wypozycz-samochod`}/>
                  :
                  pageState === PageStatus.ErrorWithSendingForm ?
                  <OperationResult status={'error'} title={'Wystąpił błąd podczas zwracania samochodu 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(PageStatus.FillingTheForm)}/>
                  :
                  pageState === PageStatus.FailOnSendingForm ?
                  <OperationResult status={'warning'} title={'Wystąpiły błędy podczas zwracania samochodu 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(PageStatus.FillingTheForm)}/>
                  :
                  ''
                  }
              </div>
              
            </div>
         
        </div>
        
        </>
    );
  };
  
  export default RentalsReturnCarFormContainer;