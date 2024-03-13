import { useState } from "react";
import OperationResult from "../../general/OperationResult";
import DOMAIN_NAME from "../../../utilities/domainName";
import { AuthType, warnings } from "../../../types/common";
import { FormPageStatus } from "../../../types/enums";
import { db_Car_basic, db_Rental, db_User } from "../../../types/db_types";
import CarRowInFormImg from "../../general/CarRowInFormImg";
import { dateFormatter } from "../../../utilities/dateFormatter";
import UserSpan from "../../general/spanElements/UserSpan";
import ModalWarning from "../../general/ModalWarning";



interface RentalsReturnCarFormContainerProps {
    carBasicData: db_Car_basic,
    rentalData: db_Rental,
    usersData: db_User[] | undefined;
    auth: AuthType;
}

const RentalsReturnCarFormContainer = (props: RentalsReturnCarFormContainerProps) => {


  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])
  const [pageState, setPageState] = useState<FormPageStatus>(FormPageStatus.FillingTheForm)
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);

 
  const [travelDestination, setTravelDestination] = useState<string>(props.rentalData.travelDestination === null ? '' : props.rentalData.travelDestination)
  const [carMileageAfter, setCarMileageAfter] = useState<number | ''>('')


  const [selectOtherDate, setSelectOtherDate] = useState<boolean>(false);
  const [rentalReturnDate, setRentalReturnDate] = useState<Date>(new Date());



  const submitHandler = async () => {
    
    const finalDateTo = selectOtherDate ? rentalReturnDate : new Date();

    try {
      const response = await fetch(`${DOMAIN_NAME}/rentals/return`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        
        body: JSON.stringify({rentalID: props.rentalData.id, carID: props.rentalData.carID, carMileageAfter: carMileageAfter, dateTo: finalDateTo, travelDestination: travelDestination}),
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



  let user;
  if(props.usersData) {
  user = props.usersData.find(user => user.id === props.rentalData.userID);
  }


    

    return (
        <>
        <ModalWarning showModal={showWarningModal} setShowModal={(state: boolean) => setShowWarningModal(state)} title= {'Zwróć auto'} bodyText={`Czy na pewno chcesz dokonać zwrotu auta z przebiegiem końcowym ${carMileageAfter} km?`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, zwróć auto'} callback={ async () => await submitHandler() }/>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
  
            <CarRowInFormImg carData={props.carBasicData} />

          
            <div className='col-span-3'>
            
              <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
                  {pageState === FormPageStatus.FillingTheForm ?
                    <form onSubmit={submitHandler}>

                    
                      <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white">
                          Podstawowe dane:
                        </label>
                        <div className="cursor-default text-sm">
                          <p>{`Właściciel wypożyczenia:`}<UserSpan userObj={user} nullText={'#ERR#'} linkTarget={'_self'} no_wrap={true}/></p>
                          <p>{`Data startu wypożyczenia: ${dateFormatter(props.rentalData.dateFrom.toString())}`}</p>
                          <p>{`Przebieg początkowy: ${props.rentalData.carMileageBefore} km`}</p>
                        </div>
                      </div>
                      
                      
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
                          onKeyDown={(e)=>{
                            const { key } = e;
                            if ((key === 'Backspace' || key === 'Delete') && carMileageAfter === 0) {
                              setCarMileageAfter('');
                              }
                          }}
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





                      <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                      Kiedy zakończono podróż?
                    </label>
                    <div className="relative z-1 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="#3C50E0" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                        </span>
                        <select
                        className="relative z-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-13 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary sm:text-base"
                        value={selectOtherDate.toString()}
                        onChange={(e)=>setSelectOtherDate(e.target.value === 'true')}
                        >
                        <option value="false">Przed chwilą</option>
                        <option value="true">Chcę wybrać datę</option>
                        </select>
                    </div>
                    </div>

                    {selectOtherDate ?
                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Data i godzina zakończenia podróży:
                      </label>
                      <input
                        required
                        type="datetime-local"
                        value={new Date(rentalReturnDate.getTime() + (60 * 60000)).toISOString().slice(0, 16)} //UTC +1 TIMEZONE (WARSAW/EUROPE)
                        onChange={(e)=>setRentalReturnDate(new Date(e.target.value))}
                        placeholder=""
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    :
                    null
                    }





                      <div className='flex justify-center mb-2'>
                      <button
                      className="flex w-90 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90 disabled:cursor-not-allowed"
                      type='button'
                      disabled={!carMileageAfter || !travelDestination ? true : false}
                      onClick={() => setShowWarningModal(true)}
                      >
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