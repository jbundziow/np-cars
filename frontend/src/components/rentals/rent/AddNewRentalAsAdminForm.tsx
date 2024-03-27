import { useState } from "react";
import OperationResult from "../../general/OperationResult";
import { BACKEND_URL } from "../../../utilities/domainName";
import { warnings } from "../../../types/common";
import { FormPageStatus } from "../../../types/enums";
import { db_Car_basic, db_Place, db_User } from "../../../types/db_types";
import MultiselectInput from "../../general/input_elements/MultiselectInput";
import { Option } from "react-tailwindcss-select/dist/components/type";
import useAuth from "../../../hooks/useAuth";
import { useSearchParams } from "react-router-dom";


interface AddNewRentalAsAdminFormProps {
    placesData: db_Place[] | [] | undefined;
    carsData: db_Car_basic[] | [] | undefined;
    usersData: db_User[] | [] | undefined;
}



const AddNewRentalAsAdminForm = (props: AddNewRentalAsAdminFormProps) => {

  //if params are in url
  const [ searchParams ] = useSearchParams();
    const carID = searchParams.get('carid');
    const carBrand = searchParams.get('carbrand');
    const carModel = searchParams.get('carmodel');
    const initialCarOption = carID && carBrand && carModel ? {value: carID, label: `${carBrand} ${carModel}`} : {value: '', label: ''};
    const initialGapStart = Number(searchParams.get('gapstart')) || '';
    const initialGapEnd = Number(searchParams.get('gapend')) || '';
    const initialAlsoReturn = initialGapStart !== '' && initialGapEnd !== '' ? true : false;


  const { auth } = useAuth();



  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])
  const [pageState, setPageState] = useState<FormPageStatus>(FormPageStatus.FillingTheForm)

    const [selectedUserID, setSelectedUserID] = useState<Option>({value: '', label: ''});
    const [selectedCarID, setSelectedCarID] = useState<Option>(initialCarOption);
    const [selectedPlaceID, setSelectedPlaceID] = useState<Option>({value: '', label: 'Brak'});
    const [travelDestination, setTravelDestination] = useState<string>('');
    const [carMileageBefore, setCarMileageBefore] = useState<number | ''>(initialGapStart);
    const [carMileageAfter, setCarMileageAfter] = useState<number | ''>(initialGapEnd);
    const [rentalStartDate, setRentalStartDate] = useState<Date>(new Date(Date.now() - 60000)); //minus 1 minute to prevent error on server side
    const [rentalReturnDate, setRentalReturnDate] = useState<Date>(new Date());
    const [isConfirmedByAdmin, SetIsConfirmedByAdmin] = useState<boolean>(false);

    const [alsoReturn, SetIsAlsoReturn] = useState<boolean>(initialAlsoReturn);



    


    
    let carsOptions: {value: string, label: string}[] | [] = [];
    if(props.carsData) {
    carsOptions = props.carsData
    .map(car => ({
        value: car.id.toString(),
        label: `${car.brand} ${car.model}`
    }));
    }


    let userOptions: {value: string, label: string}[] | [] = [];
    if(props.usersData) {
    userOptions = props.usersData
    .map(user => ({
        value: user.id.toString(),
        label: `${user.name} ${user.surname}`
    }));
    
    }

    let placeOptions: {value: string, label: string}[] | [] = [];
    if(props.placesData) {
        placeOptions = props.placesData
    .map(place => ({
        value: place.id.toString(),
        label: `${place.projectCode}`
    }));
    placeOptions.unshift({value: '', label: 'Brak'})
    }




  




    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            userID: selectedUserID.value !== '' ? Number(selectedUserID.value) : null,
            carID: selectedCarID.value !== '' ? Number(selectedCarID.value) : null,
            carMileageBefore: carMileageBefore !== '' ? Number(carMileageBefore) : null,
            travelDestination: travelDestination !== '' ? travelDestination : null,
            dateFrom: rentalStartDate,
            placeID: selectedPlaceID.value !== '' ? Number(selectedPlaceID.value) : null,
    
            //if user want to return car at the same time
            returnUserID: alsoReturn ? (selectedUserID.value !== '' ? Number(selectedUserID.value) : null) : null, //always the same as userID
            lastEditedByModeratorOfID: alsoReturn && isConfirmedByAdmin ? (Number(auth.userID)) : null,
            carMileageAfter: alsoReturn ? (carMileageAfter !== '' ? Number(carMileageAfter) : null) : null,
            dateTo: alsoReturn ? (rentalReturnDate) : null,
        }
        

        try {
        const response = await fetch(`${BACKEND_URL}/admin/rentals?alsoreturn=${alsoReturn}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            
            body: JSON.stringify(formData),
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

        <div className="flex flex-col items-center">





            <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white w-[100%] xl:w-[80%]">
                {pageState === FormPageStatus.FillingTheForm ?
                
                
                
                <form onSubmit={submitHandler} className='p-2'>






                    





                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                          Wypożyczenie dotyczy samochodu:
                      </label>
                      <MultiselectInput isSearchable={true} isMultiple={false} value={selectedCarID} setValue={(value: Option) => (setSelectedCarID(value))} options={carsOptions} />
                    </div>  














                    <div className="col-span-1 flex flex-col sm:flex-row mb-10 mt-6 sm:mb-5">
                      <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                          Czy chcesz jednocześnie dokonać zwrotu wypożyczenia?
                      </label>

                      <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input h-12">
                          <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#3C50E0" d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                          </span>
                          <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 mr-8 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                          value={alsoReturn.toString()}
                          onChange={(e)=>SetIsAlsoReturn(e.target.value === 'true')}
                          >
                          <option value="false">Nie</option>
                          <option value="true">Tak</option>
                          </select>
                      </div>
                    </div>













                    


                    <div className="flex flex-col xl:flex-row xl:gap-5">
                    
                    <div className={alsoReturn ? 'mb-5 p-4 xl:p-0 xl:px-2 xl:py-1 xl:w-[50%]' : 'mb-5 xl:w-[100%]'}>
                      <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Użytkownik dokonujący wypożyczenia:
                      </label>
                      <MultiselectInput isSearchable={true} isMultiple={false} value={selectedUserID} setValue={(value: Option) => (setSelectedUserID(value))} options={userOptions} />
                    </div>
                      


                    <div className={alsoReturn ? 'block border rounded-lg dark:bg-[#3d3d3d] bg-[#f7f7f7] p-4 xl:p-0 xl:px-2 xl:py-1 xl:w-[50%]' : 'hidden'}>
                      <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                          Użytkownik zwracający wypożyczenie:
                        </label>
                        <input
                          disabled
                          type="text"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          value={selectedUserID.label}
                        />
                      </div>
                    </div>

                    </div>

                      













                    <div className="flex flex-col xl:flex-row xl:gap-5 py-4">
                    
                    <div className={alsoReturn ? 'mb-5 p-4 xl:p-0 xl:px-2 xl:py-1 xl:w-[50%]' : 'mb-5 xl:w-[100%]'}>
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
                      


                    <div className={alsoReturn ? 'block border rounded-lg dark:bg-[#3d3d3d] bg-[#f7f7f7] p-4 xl:p-0 xl:px-2 xl:py-1 xl:w-[50%]' : 'hidden'}>
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
                    
                    <div className='mb-5 xl:px-2 xl:py-1 xl:w-[50%]'>
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
                      <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                            Przypisany numer projektu (opcjonalnie):
                        </label>
                        <MultiselectInput isSearchable={true} isMultiple={false} value={selectedPlaceID} setValue={(value: Option) => (setSelectedPlaceID(value))} options={placeOptions} />
                      </div>
                    </div>

                    </div>





















                    <div className="flex flex-col xl:flex-row xl:gap-5">
                    
                    <div className={alsoReturn ? 'mb-5 p-4 xl:p-0 xl:px-2 xl:py-1 xl:w-[50%]' : 'mb-5 xl:w-[100%]'}>
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
                    


                    <div className={alsoReturn ? 'block border rounded-lg dark:bg-[#3d3d3d] bg-[#f7f7f7] p-4 xl:p-0 xl:px-2 xl:py-1 xl:w-[50%]' : 'hidden'}>
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














                    {alsoReturn ?
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
                    :
                    null
                    }








                    


                    <div className='flex justify-center mb-2 mt-10'>
                    <button className="flex w-90 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='submit'>
                        Dodaj nowe wypożyczenie
                    </button>
                    </div>
                    
                    
                    
                    
                    
                
                </form>
                :
                pageState === FormPageStatus.FormWasSentCorrectly ?
                <OperationResult status={'success'} title={'Pomyślnie dodano nowe wypożyczenie 👍'} description={'Dane zostały zapisane w bazie danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/wypozyczenia/archiwum`}/>
                :
                pageState === FormPageStatus.ErrorWithSendingForm ?
                <OperationResult status={'error'} title={'Wystąpił błąd podczas dodawania wypożyczenia 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(FormPageStatus.FillingTheForm)}/>
                :
                pageState === FormPageStatus.FailOnSendingForm ?
                <OperationResult status={'warning'} title={'Wystąpiły błędy podczas dodawania wypożyczenia 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(FormPageStatus.FillingTheForm)}/>
                :
                ''
                }
            </div>
            
        </div>
         
        
        
        </>
    );
  };
  
  export default AddNewRentalAsAdminForm