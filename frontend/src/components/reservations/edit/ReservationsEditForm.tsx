import { db_Car_basic, db_Reservation, db_User } from "../../../types/db_types";
import OperationResult from "../../general/OperationResult";
import { EditFormPageStatus } from "../../../types/enums";
import { warnings } from "../../../types/common";
import { useState } from "react";
import { BACKEND_URL } from "../../../utilities/domainName";
import MultiselectInput from "../../general/input_elements/MultiselectInput";
import { Option } from "react-tailwindcss-select/dist/components/type";
import ModalWarning from "../../general/ModalWarning";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import formatDate from "../../../utilities/formatDate";
import CarRowInFormImg from "../../general/CarRowInFormImg";



interface ReservationsEditFormProps {
    reservationData: db_Reservation;
    carData: db_Car_basic;
    usersData: db_User[] | [];
}

const ReservationsEditForm = (props: ReservationsEditFormProps) => {




  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])


  const [pageState, setPageState] = useState<EditFormPageStatus>(EditFormPageStatus.FillingTheForm)




  const userOptions = props.usersData
  .map(user => ({
    value: user.id.toString(),
    label: `${user.name} ${user.surname}`
  }));



  const initialUserID: Option = userOptions.find(user => user.value === props.reservationData.userID.toString()) || {value: '', label: ''};


  const [userID, setUserID] = useState<Option>(initialUserID);
  const [dateRange, setDateRange] = useState<DateValueType>({
    startDate: formatDate(new Date(props.reservationData.dateFrom)),
    endDate: formatDate(new Date(props.reservationData.dateTo))
  });
  const [travelDestination, setTravelDestination] = useState<string>(props.reservationData.travelDestination);



  const [showWarningDeleteModal, setShowWarningDeleteModal] = useState<boolean>(false);
  const [showWarningEditModal, setShowWarningEditModal] = useState<boolean>(false);





  const handleDateRangeChange = (newRange: DateValueType) => {
    setDateRange(newRange);
  };
  
  
  
  
  

  
  
  


  const editReservation = async () => {

    const finalTravelDestination = travelDestination === '' ? null : travelDestination;
    const editedReservationData = {
      userID: Number(userID.value),
      dateFrom: dateRange?.startDate,
      dateTo: dateRange?.endDate,
      travelDestination: finalTravelDestination,
    };


    try {
      const response = await fetch(`${BACKEND_URL}/admin/reservations/${props.reservationData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify(editedReservationData),
      });
      if (response.ok) {
        setPageState(EditFormPageStatus.DataSuccessfullyEdited);

      } else {
        const responseJSON = await response.json();
        if(responseJSON.status === 'fail') {
          setPageState(EditFormPageStatus.FailOnSendingForm);
          setWarnings(responseJSON.data);
        }
        else {
        setPageState(EditFormPageStatus.ErrorWithSendingForm);
        }
      }
    }
    catch (error) {
      setPageState(EditFormPageStatus.ErrorWithSendingForm);
    }
    
  };




  
  const deleteReservation = async () => {
    try {
          const response = await fetch(`${BACKEND_URL}/reservations`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            body: JSON.stringify({reservationID: props.reservationData.id}),
          });
    
          if (response.ok) {
            setPageState(EditFormPageStatus.DataSuccessfullyDeleted);
    
          } else {
            const responseJSON = await response.json();
            if(responseJSON.status === 'fail') {
              setPageState(EditFormPageStatus.FailOnSendingForm);
              setWarnings(responseJSON.data);
            }
            else {
            setPageState(EditFormPageStatus.ErrorWithSendingForm);
            }
          }
        }
        catch (error) {
          setPageState(EditFormPageStatus.ErrorWithSendingForm);
        }
  }






    return (
        <>
        <ModalWarning showModal={showWarningDeleteModal} setShowModal={(state: boolean) => setShowWarningDeleteModal(state)} title= {'Usuń dane rezerwacji'} bodyText={`Czy na pewno chcesz usunąć ten wpis dotyczący rezerwacji? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteReservation() }/>
        <ModalWarning showModal={showWarningEditModal} setShowModal={(state: boolean) => setShowWarningEditModal(state)} title= {'Zatwierdź zmiany'} bodyText={`Czy na pewno chcesz zatwierdzić wprowadzone zmiany dla tej rezerwacji? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, zatwierdzam'} callback={ async () => await editReservation() }/>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
  
            <CarRowInFormImg carData={props.carData} />

          
            <div className='col-span-3'>
              
            
              <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
                  {pageState === EditFormPageStatus.FillingTheForm ?
                  <form className="m-0 lg:m-5">

 

                    <div className='flex justify-end'>
                      <p>ID: {props.reservationData.id}</p>
                    </div>






                    
                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                          Właściciel rezerwacji:
                      </label>
                      <MultiselectInput isSearchable={true} isMultiple={false} value={userID} setValue={(value: Option) => (setUserID(value))} options={userOptions} />
                    </div>
                    




                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Zakres dat rezerwacji:
                      </label>
                      {/* DOCS: https://react-tailwindcss-datepicker.vercel.app/install */}
                      <Datepicker
                      i18n={"pl"}
                      separator={"do"}
                      displayFormat={"DD/MM/YYYY"}
                      startWeekOn="mon"
                      value={dateRange}
                      onChange={handleDateRangeChange}
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
                        Cel podróży:
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={travelDestination}
                        onChange={e => setTravelDestination(e.target.value)}
                      />
                    </div>
                    
                      

                    

                    <div className='flex flex-col md:flex-row justify-center items-center mt-10 mb-4 mx-2 gap-5'>
                      <button className="flex w-full sm:w-10/12 md:w-3/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='button' onClick={() => {setShowWarningEditModal(true)}}>
                        Zatwierdź zmiany
                      </button>

                      <p>lub...</p>

                      <button className="flex w-full sm:w-1/2 md:w-1/4 justify-center rounded bg-danger p-3 font-medium text-gray hover:opacity-90" type='button' onClick={() => {setShowWarningDeleteModal(true)}}>
                        Usuń tę rezerwację CAŁKOWICIE
                      </button>
                    </div>
                  </form>
                  :
                  pageState === EditFormPageStatus.DataSuccessfullyEdited ?
                    <OperationResult status={'success'} title={'Dokonano edycji rezerwacji 👍'} description={'Dane zostały pomyślnie zapisane w bazie danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/rezerwacje/archiwum`}/>
                  :
                  pageState === EditFormPageStatus.DataSuccessfullyDeleted ?
                    <OperationResult status={'success'} title={'Rezerwacja usunięta 👍'} description={'Dane zostały pomyślnie usunięte z bazy danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/rezerwacje/archiwum`}/>
                  :
                  pageState === EditFormPageStatus.ErrorWithSendingForm ?
                  <OperationResult status={'error'} title={'Wystąpił błąd podczas edytowania rezerwacji 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(EditFormPageStatus.FillingTheForm)}/>
                  :
                  pageState === EditFormPageStatus.FailOnSendingForm ?
                  <OperationResult status={'warning'} title={'Wystąpiły błędy podczas edytowania rezerwacji 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(EditFormPageStatus.FillingTheForm)}/>
                  :
                  ''
                  }
              </div>
              
            </div>
         
        </div>
        
        </>
    );
  };
  
  export default ReservationsEditForm;

