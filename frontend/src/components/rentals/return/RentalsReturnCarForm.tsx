import { useState } from "react";
import OperationResult from "../../general/OperationResult";
import DOMAIN_NAME from "../../../utilities/domainName";
import { Link } from "react-router-dom";
import { warnings } from "../../../types/common";
import { FormPageStatus } from "../../../types/enums";
import { db_Car_basic, db_Rental } from "../../../types/db_types";



interface RentalsReturnCarFormContainerProps {
    carBasicData: db_Car_basic,
    rentalData: db_Rental,
}

const RentalsReturnCarFormContainer = (props: RentalsReturnCarFormContainerProps) => {


  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])
  const [pageState, setPageState] = useState<FormPageStatus>(FormPageStatus.FillingTheForm)

 
  const [travelDestination, setTravelDestination] = useState<string>(props.rentalData.travelDestination === null ? '' : props.rentalData.travelDestination)
  const [carMileageAfter, setCarMileageAfter] = useState<number>()



  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${DOMAIN_NAME}/rentals/return`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        
        body: JSON.stringify({rentalID: props.rentalData.id, carID: props.rentalData.carID, carMileageAfter: carMileageAfter, dateTo: new Date(), travelDestination: travelDestination}),
      });

      if (response.ok) {
        setPageState(FormPageStatus.FormWasSentCorrectly);
      } else {
        const responseJSON = await response.json();
        if(responseJSON.status === 'fail') {
          setPageState(FormPageStatus.FailOnSendingForm);
          setWarnings(responseJSON.data);

        }
        else {
        setPageState(FormPageStatus.ErrorWithSendingForm);
        }
      }
    }
    catch (error) {
      setPageState(FormPageStatus.ErrorWithSendingForm);
    }
  };


    

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
  
          <div className='p-5 pt-0'>
          <img src={props.carBasicData.imgPath} alt="Zdjęcie samochodu" className='w-full border-2 rounded-md'/>
          <Link to={`/samochody/${props.carBasicData.id}`} target={'_self'} className="underline decoration-[0.5px] underline-offset-1 inline-block">
          <p className='text-black dark:text-white pb-2 text-lg'>{props.carBasicData.brand}&nbsp;{props.carBasicData.model}</p>
          </Link>
          </div>

          
            <div className='col-span-3'>
            
              <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
                  {pageState === FormPageStatus.FillingTheForm ?
                    <form onSubmit={submitHandler}>
                      
                      <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white">
                          Przebieg końcowy:
                        </label>
                        <input
                          required
                          type="number"
                          // min={props.rentalData.carMileageBefore}
                          placeholder={`Wpisz stan licznika na koniec podróży`}
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          value={carMileageAfter}
                          onChange={e => setCarMileageAfter(Number(e.target.value))}
                        />
                      </div>

                      <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white">
                          Cel podróży:
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
                  pageState === FormPageStatus.FormWasSentCorrectly ?
                    <OperationResult status={'success'} title={'Pomyślnie zwrócono samochód 👍'} description={'Dane z Twojej podróży zostały zapisane w bazie danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/wypozyczenia/wypozycz-samochod`}/>
                  :
                  pageState === FormPageStatus.ErrorWithSendingForm ?
                  <OperationResult status={'error'} title={'Wystąpił błąd podczas zwracania samochodu 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(FormPageStatus.FillingTheForm)}/>
                  :
                  pageState === FormPageStatus.FailOnSendingForm ?
                  <OperationResult status={'warning'} title={'Wystąpiły błędy podczas zwracania samochodu 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(FormPageStatus.FillingTheForm)}/>
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