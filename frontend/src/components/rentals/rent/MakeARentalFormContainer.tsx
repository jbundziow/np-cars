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

  const [travelDestination, setTravelDestination] = useState<string>('');
  const [value, setValue] = useState<DateValueType>({
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date())
  });

  const handleValueChange = (newValue: DateValueType) => {
    setValue(newValue);
  };

  



  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${DOMAIN_NAME}/reservations/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        // TODO: ADD CORRECT USER!!!!!
        body: JSON.stringify({carID: props.data.id, userID: 12, lastEditedByModeratorOfID: null, dateFrom: value?.startDate, dateTo: value?.endDate, travelDestination}),
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
                          Wybierz zakres dat, w którym chcesz dokonać rezerwacji:
                        </label>
                        {/* DOCS: https://react-tailwindcss-datepicker.vercel.app/install */}
                        <Datepicker
                        i18n={"pl"}
                        separator={"do"}
                        minDate={new Date()}
                        displayFormat={"DD/MM/YYYY"}
                        startWeekOn="mon"
                        value={value}
                        onChange={handleValueChange}
                        inputClassName="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 

                        showShortcuts={false}
                        showFooter={false}
                        configs={{footer: {
                          cancel: "Anuluj", 
                          apply: "Potwierdź" 
                          }
                        }}
                        />
                      </div>

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
                          Dokonaj rezerwacji
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