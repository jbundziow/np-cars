import { useState } from "react";
import OperationResult from "../../general/OperationResult";
import DOMAIN_NAME from "../../../utilities/domainName";
import ModalWarning from "../../general/ModalWarning";



enum PageStatus {
  FillingTheForm,
  FormWasSentCorrectly,
  ErrorWithSendingForm,
  FailOnSendingForm
}

type carDataSchema = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged',
}

type lastRentalDataSchema = {
  id: number,
  carID: number,
  userID: number,
  returnUserID: number | null,
  lastEditedByModeratorOfID: number | null,
  carMileageBefore: number,
  carMileageAfter: number | null,
  travelDestination: string | null,
  placeID: number | null,
  dateFrom: Date,
  dateTo: Date | null,
}

type lastRentalUserDataSchema = {
  id: number,
  gender: 'male' | 'female',
  name: string,
  surname: string,
  employedAs: string,
  avatarPath: string | null,
  role: 'admin' | 'user' | 'banned',
}

interface MakeARentalFormContainerProps {
  carData: carDataSchema,
  lastRentalData: lastRentalDataSchema | null,
  lastRentalUserData: lastRentalUserDataSchema | null,
  numberOfFutureReservations: number | undefined,
}

const MakeARentalFormContainer = (props: MakeARentalFormContainerProps) => {
  type warnings = {
    pl: string,
    en: string,
  } 

  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])
  const [pageState, setPageState] = useState<PageStatus>(PageStatus.FillingTheForm)

  //
  let showCarAlreadyRentedAlert: boolean = false;
  let carMileageBeforeStartValue: number | '' = '';
  if(props.lastRentalData) {
    if(props.lastRentalData.carMileageAfter !== null) {
      carMileageBeforeStartValue = props.lastRentalData.carMileageAfter;
    }
    else if(props.lastRentalUserData) {
      showCarAlreadyRentedAlert = true;
    }
  }
  const [carMileageBefore, setCarMileageBefore] = useState<number | ''>(carMileageBeforeStartValue);
  //

  const[showTravelDestinationInput, setShowTravelDestinationInput] = useState<boolean>(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShowTravelDestinationInput(e.target.value === 'true');
  };

  const [travelDestination, setTravelDestination] = useState<string>('');
  

  let showFutureReservationsAlert: boolean = false;
  if(props.numberOfFutureReservations && props.numberOfFutureReservations > 0) {
    showFutureReservationsAlert = true;
  }
  

  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);


  

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(props.lastRentalData && props.lastRentalData.carMileageAfter !== null && Number(carMileageBefore) > Number(props.lastRentalData.carMileageAfter)) {
      setShowWarningModal(true);
      //then callback from modal will execute postForm()
    }
    else {
      await postForm();
    }
  }


    const postForm = async () => {

    try {

      //set null if it is ''
      let travelDestinationSubmit = null;
      if (travelDestination !== '') {
        travelDestinationSubmit = travelDestination;
      }
      console.log(travelDestinationSubmit);

      const response = await fetch(`${DOMAIN_NAME}/rentals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        
        body: JSON.stringify({carID: props.carData.id, carMileageBefore: carMileageBefore, travelDestination: travelDestinationSubmit}),
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
        <ModalWarning showModal={showWarningModal} setShowModal={(state: boolean) => setShowWarningModal(state)} title= {'Ostrzeżenie!'} bodyText={`Wpisano większy przebieg początkowy niż przebieg końcowy z ostatniego wypożyczenia tego samochodu. Wypożyczenie przez Ciebie tego auta będzie skutować dodaniem dodatkowo jednej pustej podróży pomiędzy przebiegiem ${props.lastRentalData?.carMileageAfter}km, a ${carMileageBefore}km.`} cancelBtnText={'Anuluj'} acceptBtnText={'Wypożycz mimo to'} callback={ async () => await postForm() }/>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
          <div className='p-5 pt-0'>
          <img src={props.carData.imgPath} alt="Zdjęcie samochodu" className='w-full border-2 rounded-md'/>
          <p className='text-black dark:text-white pb-2 text-lg'>{props.carData.brand}&nbsp;{props.carData.model}</p>
          </div>

          
            <div className='col-span-3'>
            
              <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
                  {pageState === PageStatus.FillingTheForm ?
                    
                    
                    
                    <form onSubmit={submitHandler} className='p-2'>

                      <div className='mb-5'>
                      {showCarAlreadyRentedAlert ?
                      <OperationResult status={'error'} title={'UWAGA! To auto nie zostało jeszcze zwrócone przez poprzedniego użytkownika!'} description={`Po uzupełnieniu poniższych danych oraz po kliknięciu "Wypożycz samochód" JEDNOCZEŚNIE zwrócisz to auto za użytkownika ${props.lastRentalUserData?.name.toUpperCase()} ${props.lastRentalUserData?.surname.toUpperCase()} oraz dokonasz nowego wypożyczenia na swoje konto. Wpisany przez Ciebie "przebieg początkowy" będzie jednocześnie "przebiegiem końcowym" użytkownika ${props.lastRentalUserData?.name.toUpperCase()} ${props.lastRentalUserData?.surname.toUpperCase()}.`} showButton={false}/>
                      : ''}
                      {showFutureReservationsAlert ?
                      <OperationResult status={'warning'} title={'UWAGA! To auto ma już zaplanowane rezerwacje!'} warnings={[{en: '.', pl: 'Sprawdź listę rezerwacji dla tego samochodu w zakładce "Rezerwacje / Przegląd rezerwacji."'}, {en: '.', pl: 'Skontaktuj się najpierw z użytkownikiem, który dokonał rezerwacji jeśli obaj zamierzacie wypożyczyć to auto w jednym terminie.'}]} showButton={false}/>
                      : ''}
                      </div>

                      <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white">
                          Przebieg początkowy [km]:
                        </label>
                        <input
                          required
                          type="number"
                          step="1"
                          max="2000000"
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
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path fill="#3C50E0" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                          </span>
                          <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                          value={showTravelDestinationInput ? 'true' : 'false'}
                          onChange={handleSelectChange}
                          >
                            <option value="false">Nie</option>
                            <option value="true">Tak</option>
                          </select>
                        </div>
                      </div>

                      <div className={`mb-5 ${showTravelDestinationInput ? 'block' : 'hidden'}`}>
                        <label className="mb-3 block text-black dark:text-white">
                          Cel podróży:
                        </label>
                        <input
                          {...(showTravelDestinationInput ? { required: true } : {})}
                          type="text"
                          placeholder={`Wpisz nazwę miejsca, do którego jedziesz`}
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          value={travelDestination}
                          onChange={e => setTravelDestination(e.target.value)}
                        />
                      </div>

                      <div className='flex justify-center mb-2'>
                      <button className="flex w-90 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='submit'>
                          Wypożycz samochód
                        </button>
                      </div>
                      
                      
                      
                      
                    </form>
                  :
                  pageState === PageStatus.FormWasSentCorrectly ?
                    <OperationResult status={'success'} title={'Pomyślnie dokonano wypożyczenia samochodu 👍'} description={'Pamiętaj o dokonaniu zwrotu po zakończeniu podróży.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/wypozyczenia/oddaj-samochod`}/>
                  :
                  pageState === PageStatus.ErrorWithSendingForm ?
                  <OperationResult status={'error'} title={'Wystąpił błąd podczas wypożyczania samochodu 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(PageStatus.FillingTheForm)}/>
                  :
                  pageState === PageStatus.FailOnSendingForm ?
                  <OperationResult status={'warning'} title={'Wystąpiły błędy podczas wypożyczania samochodu 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(PageStatus.FillingTheForm)}/>
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