import { useState } from "react";
import OperationResult from "../../general/OperationResult";
import DOMAIN_NAME from "../../../utilities/domainName";

import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';
import formatDate from "../../../utilities/formatDate";
import { Link } from "react-router-dom";
import { db_Car_basic, db_User } from "../../../types/db_types";
import { FormPageStatus } from "../../../types/enums";
import { AuthType, warnings } from "../../../types/common";
import useAuth from "../../../hooks/useAuth";
import { Option } from "react-tailwindcss-select/dist/components/type";
import MultiselectInput from "../../general/input_elements/MultiselectInput";





interface MakeAReservationFormContainerProps {
    carData: db_Car_basic;
    usersData: db_User[] | [];
    auth: AuthType;
}

const MakeAReservationFormContainer = (props: MakeAReservationFormContainerProps) => {

  const { auth } = useAuth();


  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])
  const [pageState, setPageState] = useState<FormPageStatus>(FormPageStatus.FillingTheForm)

  const [travelDestination, setTravelDestination] = useState<string>('');
  const [value, setValue] = useState<DateValueType>({
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date())
  });


   //admin
   const [isAnotherUserMakeReservation, setIsAnotherUserMakeReservation] = useState<boolean>(false);
   const [selectedUserID, setSelectedUserID] = useState<Option>({value: '', label: ''});

   let userOptions: {value: string, label: string}[] | [] = [];
   if(props.usersData) {
   userOptions = props.usersData
   .filter(user => user.id !== Number(auth.userID))
   .map(user => ({
     value: user.id.toString(),
     label: `${user.name} ${user.surname}`
   }));
   }


  const handleValueChange = (newValue: DateValueType) => {
    setValue(newValue);
  };

  


  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(auth.userRole === 'admin') {
      submitFormAsAdmin();
    }
    else {
      submitFormAsUser();
    }
    
  };

  const submitFormAsUser = async () => {
    try {
      const response = await fetch(`${DOMAIN_NAME}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify({carID: props.carData.id, lastEditedByModeratorOfID: null, dateFrom: value?.startDate, dateTo: value?.endDate, travelDestination}),
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
  }



  const submitFormAsAdmin = async () => {
    try {
      const finalUserID: number = isAnotherUserMakeReservation ? Number(selectedUserID.value) : auth.userID;
      const response = await fetch(`${DOMAIN_NAME}/admin/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify({carID: props.carData.id, userID: finalUserID, lastEditedByModeratorOfID: auth.userID, dateFrom: value?.startDate, dateTo: value?.endDate, travelDestination}),
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
  }


    

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4"> 
  
          <div className='p-5 pt-0'>
          <img src={props.carData.imgPath} alt="Zdjęcie samochodu" className='w-full border-2 rounded-md'/>
          <Link to={`/samochody/${props.carData.id}`} target={'_self'} className="underline decoration-[0.5px] underline-offset-1 inline-block">
          <p className='text-black dark:text-white pb-2 text-lg'>{props.carData.brand}&nbsp;{props.carData.model}</p>
          </Link>
          </div>

          
            <div className='col-span-3'>
            <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
              
                  {pageState === FormPageStatus.FillingTheForm ?
                    <form onSubmit={submitHandler}>


                    {auth.userRole === 'admin' ?
                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                      Kto dokonuje rezerwacji?
                    </label>
                    <div className="relative z-1 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#3C50E0" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                        </span>
                        <select
                        className="relative z-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-13 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary sm:text-base"
                        value={isAnotherUserMakeReservation.toString()}
                        onChange={(e)=>{
                          setIsAnotherUserMakeReservation(e.target.value === 'true');
                          if (e.target.value === 'false') {setSelectedUserID({value: '', label: ''})}
                        }}
                        >
                        <option value="false">Ja</option>
                        <option value="true">Inny użytkownik</option>
                        </select>
                    </div>
                    </div>
                    :
                    null
                    }




                    {isAnotherUserMakeReservation ?
                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                          Wybierz użytkownika:
                      </label>
                      <MultiselectInput isSearchable={true} isMultiple={false} value={selectedUserID} setValue={(value: Option) => (setSelectedUserID(value))} options={userOptions} />
                    </div>
                    :
                    null
                    }




                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Wybierz zakres dat, w których chcesz dokonać rezerwacji:
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
                  pageState === FormPageStatus.FormWasSentCorrectly ?
                    <OperationResult status={'success'} title={'Pomyślnie dokonano rezerwacji 👍'} description={'Będzie ona teraz widoczna dla innych użytkowników.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/rezerwacje/moje-rezerwacje`}/>
                  :
                  pageState === FormPageStatus.ErrorWithSendingForm ?
                  <OperationResult status={'error'} title={'Wystąpił błąd podczas składania rezerwacji 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(FormPageStatus.FillingTheForm)}/>
                  :
                  pageState === FormPageStatus.FailOnSendingForm ?
                  <OperationResult status={'warning'} title={'Wystąpiły błędy podczas składania rezerwacji 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(FormPageStatus.FillingTheForm)}/>
                  :
                  ''
                  }
              </div>
              
            </div>
         
        </div>
        
        </>
    );
  };
  
  export default MakeAReservationFormContainer;