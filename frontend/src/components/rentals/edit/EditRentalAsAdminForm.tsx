import { useState } from "react";
import OperationResult from "../../general/OperationResult";
import DOMAIN_NAME from "../../../utilities/domainName";
import { warnings } from "../../../types/common";
import { EditFormPageStatus } from "../../../types/enums";
import { db_Car_basic, db_Place, db_Rental, db_User } from "../../../types/db_types";
import MultiselectInput from "../../general/input_elements/MultiselectInput";
import { Option } from "react-tailwindcss-select/dist/components/type";
import ModalWarning from "../../general/ModalWarning";
import CarRowInFormImg from "../../general/CarRowInFormImg";
import useAuth from "../../../hooks/useAuth";


interface EditRentalAsAdminFormProps {
    rentalData: db_Rental;
    placesData: db_Place[] | [] | undefined;
    carsData: db_Car_basic[] | [] | undefined;
    usersData: db_User[] | [] | undefined;
}



const EditRentalAsAdminForm = (props: EditRentalAsAdminFormProps) => {
  

  const { auth } = useAuth();


  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])
  const [pageState, setPageState] = useState<EditFormPageStatus>(EditFormPageStatus.FillingTheForm)
  const [showWarningDeleteModal, setShowWarningDeleteModal] = useState<boolean>(false);
  const [showWarningEditModal, setShowWarningEditModal] = useState<boolean>(false);






  let selectedCar;
    if(props.carsData) {
    selectedCar = props.carsData.find(car => car.id === props.rentalData.carID);
    }

    
    

    let userOptions: {value: string, label: string}[] | [] = [];
    if(props.usersData) {
    userOptions = props.usersData
    .map(user => ({
        value: user.id.toString(),
        label: `${user.name} ${user.surname}`
    }));
    }
    const initialUserID: Option = userOptions.find(user => user.value === props.rentalData.userID.toString()) || {value: '', label: ''};
    const initialReturnUserID: Option = userOptions.find(user => user.value === (props.rentalData.returnUserID?.toString() || '')) || {value: '', label: ''};


    let placeOptions: {value: string, label: string}[] | [] = [];
    if(props.placesData) {
      placeOptions = props.placesData
        .map(place => ({
          value: place.id.toString(),
          label: `${place.projectCode}`
        }));
      placeOptions.unshift({value: '', label: 'Brak'})
    }
    const initialPlaceID: Option = placeOptions.find(place => place.value === (props.rentalData.placeID?.toString() || '')) || {value: '', label: 'Brak'};




    


    const [selectedUserID, setSelectedUserID] = useState<Option>(initialUserID);
    const [selectedReturnUserID, setSelectedReturnUserID] = useState<Option>(initialReturnUserID);
    const [selectedPlaceID, setSelectedPlaceID] = useState<Option>(initialPlaceID);
    const [travelDestination, setTravelDestination] = useState<string>(props.rentalData.travelDestination ? props.rentalData.travelDestination : '');
    const [carMileageBefore, setCarMileageBefore] = useState<number | ''>(props.rentalData.carMileageBefore);
    const [carMileageAfter, setCarMileageAfter] = useState<number | ''>(props.rentalData.carMileageAfter ? props.rentalData.carMileageAfter : '');
    const [rentalStartDate, setRentalStartDate] = useState<Date>(new Date(props.rentalData.dateFrom));
    const [rentalReturnDate, setRentalReturnDate] = useState<Date>(props.rentalData.dateTo ? new Date(props.rentalData.dateTo) : new Date());
    const [isConfirmedByAdmin, SetIsConfirmedByAdmin] = useState<boolean>(props.rentalData.lastEditedByModeratorOfID ? true : false);

  


    




  




    const editRental = async () => {

        const formData = {
            userID: selectedUserID.value !== '' ? Number(selectedUserID.value) : null,
            returnUserID: selectedReturnUserID.value !== '' ? Number(selectedReturnUserID.value) : null,
            dateFrom: rentalStartDate,
            dateTo: rentalReturnDate,
            carMileageBefore: carMileageBefore !== '' ? Number(carMileageBefore) : null,
            carMileageAfter: carMileageAfter !== '' ? Number(carMileageAfter) : null,
            travelDestination: travelDestination !== '' ? travelDestination : null,
            placeID: selectedPlaceID.value !== '' ? Number(selectedPlaceID.value) : null,
            lastEditedByModeratorOfID: isConfirmedByAdmin ? Number(auth.userID) : null,
        }
        
        

        try {
        const response = await fetch(`${DOMAIN_NAME}/admin/rentals/${props.rentalData.id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            
            body: JSON.stringify(formData),
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



  const deleteRental = async () => {
    try {
          const response = await fetch(`${DOMAIN_NAME}/admin/rentals/${props.rentalData.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
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
        <ModalWarning showModal={showWarningDeleteModal} setShowModal={(state: boolean) => setShowWarningDeleteModal(state)} title= {'Usuń wypożyczenie'} bodyText={`Czy na pewno chcesz usunąć to wypożyczenie? Nie można później cofnąć tej operacji. Dane zostaną bezpowrotnie utracone.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteRental() }/>
        <ModalWarning showModal={showWarningEditModal} setShowModal={(state: boolean) => setShowWarningEditModal(state)} title= {'Zatwierdź zmiany'} bodyText={`Czy na pewno chcesz zatwierdzić wprowadzone zmiany dla tego wypożyczenia? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, zatwierdzam'} callback={ async () => await editRental() }/>

        <div className="flex flex-col items-center">





            <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white w-[100%] xl:w-[80%]">
                {pageState === EditFormPageStatus.FillingTheForm ?
                <>
                
                {!props.rentalData.carMileageAfter || !props.rentalData.returnUserID|| !props.rentalData.dateTo ?
                <OperationResult status={'error'} title={'Brak możliwości edycji 🚫'} description={'Nie możesz edytować wypożyczenia, które nie zostało zakończone (zwrócone) przez poprzedniego użytkownika. Możesz jedynie usunąć to wypożyczenie i w razie potrzeby dodać je później na nowo z innymi danymi.'} showButton={true} buttonText={'Ok, przejdź do zwrotów'} buttonLinkTo={`/wypozyczenia/oddaj-samochod`}/>
                :
                <form className='p-2'>






                    





                      <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                          Wypożyczenie dotyczy samochodu:
                        </label>
                        {selectedCar ?
                        <div className="flex justify-center items-center sm:w-[30%]">
                          <CarRowInFormImg carData={selectedCar} />
                        </div>
                        :
                          <p className="sm:w-[30%] p-3 text-danger font-bold border rounded-lg">Błąd wczytywania danych samochodu.</p>
                        }
                      </div>
                      










                    


                    <div className="flex flex-col xl:flex-row xl:gap-5">
                    
                    <div className='mb-5 p-4 xl:p-0 xl:px-2 xl:py-1 xl:w-[50%]'>
                      <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Użytkownik dokonujący wypożyczenia:
                      </label>
                      <MultiselectInput isSearchable={true} isMultiple={false} value={selectedUserID} setValue={(value: Option) => (setSelectedUserID(value))} options={userOptions} />
                    </div>
                      


                    <div className='block p-4 xl:p-0 xl:px-2 xl:py-1 xl:w-[50%]'>
                      <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                          Użytkownik zwracający wypożyczenie:
                        </label>
                        <MultiselectInput isSearchable={true} isMultiple={false} value={selectedReturnUserID} setValue={(value: Option) => (setSelectedReturnUserID(value))} options={userOptions} />
                      </div>
                      
                    </div>
                    
                    </div>
                    {selectedReturnUserID.value !== selectedUserID.value ?
                    <OperationResult status={'error'} title={'Uwaga! ⚠️'} description={'Jeżeli użytkownik zwracający wypożyczenie jest inny niż użytkownik dokonujący wypożyczenia, to usunięcie danych następnego wypożyczenia może spowodować wyzerowanie danych dotyczących zwrotu tego wypożyczenia. Należy korzystać z tej funkcji ostożnie i tylko w przypadku, gdy naprawdę istnieje taka potrzeba. W większości przypadków użytkownik dokonujący wypożyczenia, dokonuje również jego zwrotu.'} showButton={false}/>
                    :
                    null
                    }

                      













                    <div className="flex flex-col xl:flex-row xl:gap-5 py-4">
                    
                    <div className='mb-5 p-4 xl:p-0 xl:px-2 xl:py-1 xl:w-[50%]'>
                      <label className="mb-3 block text-black dark:text-white">
                          Data i godzina rozpoczęcia podróży:
                        </label>
                        <input
                          required
                          type="datetime-local"
                          value={new Date(rentalStartDate.getTime() + (60 * 60000)).toISOString().slice(0, 16)} //UTC +1 TIMEZONE (WARSAW/EUROPE)
                          onChange={(e)=>setRentalStartDate(new Date(e.target.value))}
                          placeholder=""
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    </div>
                      


                    <div className='block p-4 xl:p-0 xl:px-2 xl:py-1 xl:w-[50%]'>
                      <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white">
                          Data i godzina zakończenia podróży:
                        </label>
                        <input
                          type="datetime-local"
                          value={new Date(rentalReturnDate.getTime() + (60 * 60000)).toISOString().slice(0, 16)} //UTC +1 TIMEZONE (WARSAW/EUROPE)
                          onChange={(e)=>setRentalReturnDate(new Date(e.target.value))}
                          placeholder=""
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    </div>
                    








                    <div className="flex flex-col xl:flex-row xl:gap-5 py-2">
                    
                    <div className='mb-5 p-4 xl:p-0 xl:px-2 xl:py-1 xl:w-[50%]'>
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
                      


                    <div className='block xl:px-2 xl:py-1 xl:w-[50%]'>
                      <div className='mb-5 p-4 xl:p-0'>
                        <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                            Przypisany numer projektu (opcjonalnie):
                        </label>
                        <MultiselectInput isSearchable={true} isMultiple={false} value={selectedPlaceID} setValue={(value: Option) => (setSelectedPlaceID(value))} options={placeOptions} />
                      </div>
                    </div>

                    </div>





















                    <div className="flex flex-col xl:flex-row xl:gap-5">
                    
                    <div className='mb-5 p-4 xl:p-0 xl:px-2 xl:py-1 xl:w-[50%]'>
                        <label className="mb-3 block text-black dark:text-white">
                        Przebieg początkowy [km]:
                        </label>
                        <input
                        required
                        type="number"
                        placeholder={`Wpisz stan licznika na początek podróży`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={carMileageBefore}
                        onChange={e => setCarMileageBefore(Number(e.target.value))}
                        onKeyDown={(e)=>{
                            const { key } = e;
                            if ((key === 'Backspace' || key === 'Delete') && carMileageBefore === 0) {
                            setCarMileageBefore('');
                            }
                        }}
                        />
                    </div>
                    


                    <div className='block p-4 xl:p-0 xl:px-2 xl:py-1 xl:w-[50%]'>
                        <div className='mb-5'>
                            <label className="mb-3 block text-black dark:text-white">
                            Przebieg końcowy [km]:
                            </label>
                            <input
                            type="number"
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
                    </div>

                    </div>














                    
                    <div className="col-span-1 flex flex-col sm:flex-row mb-10 mt-6 sm:mb-5">
                    <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                        Czy chcesz dodając to wypożyczenie jednocześnie potwierdzić je jako administrator?
                    </label>

                    <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input h-12">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#3C50E0" d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                        </span>
                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 mr-8 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        value={isConfirmedByAdmin.toString()}
                        onChange={(e)=>SetIsConfirmedByAdmin(e.target.value === 'true')}
                        >
                        <option value="false">Nie</option>
                        <option value="true">Tak</option>
                        </select>
                    </div>
                    </div>
                    








                    


                    
                    <div className='flex flex-col md:flex-row justify-center items-center mt-10 mb-4 mx-2 gap-5'>
                      <button className="flex w-full sm:w-10/12 md:w-3/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='button' onClick={() => {setShowWarningEditModal(true)}}>
                        Zatwierdź zmiany
                      </button>

                      <p>lub...</p>

                      <button className="flex w-full sm:w-1/2 md:w-1/4 justify-center rounded bg-danger p-3 font-medium text-gray hover:opacity-90" type='button' onClick={() => {setShowWarningDeleteModal(true)}}>
                        Usuń to wypożyczenie CAŁKOWICIE
                      </button>
                    </div>
                    
                    
                    
                    
                    
                
                </form>
                }





                </>
                :
                pageState === EditFormPageStatus.DataSuccessfullyEdited ?
                  <OperationResult status={'success'} title={'Dokonano edycji wypożyczenia 👍'} description={'Dane zostały pomyślnie zapisane w bazie danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/wypozyczenia/archiwum`}/>
                :
                pageState === EditFormPageStatus.DataSuccessfullyDeleted ?
                  <OperationResult status={'success'} title={'Wypożyczenie usunięte 👍'} description={'Dane zostały pomyślnie usunięte z bazy danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/wypozyczenia/archiwum`}/>
                :
                pageState === EditFormPageStatus.ErrorWithSendingForm ?
                <OperationResult status={'error'} title={'Wystąpił błąd podczas dodawania wypożyczenia 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(EditFormPageStatus.FillingTheForm)}/>
                :
                pageState === EditFormPageStatus.FailOnSendingForm ?
                <OperationResult status={'warning'} title={'Wystąpiły błędy podczas dodawania wypożyczenia 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(EditFormPageStatus.FillingTheForm)}/>
                :
                ''
                }
            </div>
            
        </div>
         
        
        
        </>
    );
  };
  
  export default EditRentalAsAdminForm