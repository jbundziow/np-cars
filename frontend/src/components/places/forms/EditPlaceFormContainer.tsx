import { useState } from "react";
import OperationResult from "../../general/OperationResult";
import DOMAIN_NAME from "../../../utilities/domainName";
import { warnings } from "../../../types/common";
import { EditFormPageStatus } from "../../../types/enums";
import { db_Place } from "../../../types/db_types";
import ModalWarning from "../../general/ModalWarning";
import StyledSpan from "../../general/spanElements/StyledSpan";


interface EditPlaceFormContainerProps {
    place: db_Place;
}



const EditPlaceFormContainer = (props: EditPlaceFormContainerProps) => {



  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])
  const [pageState, setPageState] = useState<EditFormPageStatus>(EditFormPageStatus.FillingTheForm)

  const [showWarningDeleteModal, setShowWarningDeleteModal] = useState<boolean>(false);
  const [showWarningEditModal, setShowWarningEditModal] = useState<boolean>(false);


    const [projectCode, setProjectCode] = useState<string>(props.place?.projectCode)
    const [placeName, setPlaceName] = useState<string>(props.place?.placeName)
    const [projectName, setProjectName] = useState<string>(props.place?.projectName)
    const [status, setStatus] = useState<string>(props.place?.status)




  




    const editProject = async () => {

        try {

        const response = await fetch(`${DOMAIN_NAME}/admin/places/${props.place.id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            
            body: JSON.stringify({projectCode, placeName, projectName, status}),
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




  const deleteProject = async () => {
    try {
          const response = await fetch(`${DOMAIN_NAME}/admin/places/${props.place.id}`, {
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
        <ModalWarning showModal={showWarningDeleteModal} setShowModal={(state: boolean) => setShowWarningDeleteModal(state)} title= {'Usuń projekt'} bodyText={`Czy na pewno chcesz usunąć całkowicie ten projekt z bazy danych? Zastanów się najpierw nad zmianą jego statusu na "Nieaktywny" lub "Zbanowany". Dzięki temu będzie on nadal widoczny w archiwalnych statystykach. Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteProject() }/>
        <ModalWarning showModal={showWarningEditModal} setShowModal={(state: boolean) => setShowWarningEditModal(state)} title= {'Zatwierdź zmiany'} bodyText={`Czy na pewno chcesz zatwierdzić wprowadzone zmiany dla tego projektu? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, zatwierdzam'} callback={ async () => await editProject() }/>

        <div className="flex flex-col items-center">





            <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white w-[100%] xl:w-[80%]">
            {pageState === EditFormPageStatus.FillingTheForm ?
                
                
                
                <form className='p-2'>





                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Kod projektu:
                    </label>
                    <input
                        required
                        type="text"
                        placeholder={`np. 214/23/GB`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={projectCode}
                        onChange={e => setProjectCode(e.target.value)}
                    />
                    </div>








                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Lokalizacja projektu:
                    </label>
                    <input
                        required
                        type="text"
                        placeholder={`np. Rono Słupsk`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={placeName}
                        onChange={e => setPlaceName(e.target.value)}
                    />
                    </div>










                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Pełna nazwa projektu:
                    </label>
                    <input
                        required
                        type="text"
                        placeholder={`np. Modyfikacja sterowania linii produkcyjnej`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={projectName}
                        onChange={e => setProjectName(e.target.value)}
                    />
                    </div>








                    <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                        <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                        Status projektu
                        </label>

                        <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#3C50E0" d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/></svg>
                        </span>
                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                        >
                            <option value="active">Aktywny</option>
                            <option value="closed">Nieaktywny</option>
                            <option value="banned">Zbanowany</option>
                        </select>
                        </div>
                    </div>

                    <div className="flex flex-col">
                      <p className="pb-3">Objaśnienia:</p>

                      <div className="flex items-center pb-2">
                        <StyledSpan color={'success'} text={'\xa0' + '\xa0' + 'Aktywny' + '\xa0' + '\xa0'}/>
                        <p className="pl-4">projekt możliwy do przypisania do wypożyczeń przez uprawnionego administratora.</p>
                      </div>


                      <div className="flex items-center pb-2">
                        <StyledSpan color={'warning'} text={'Nieaktywny'}/>
                        <p className="pl-4">projekt już zakończony i rozliczony. Wlicza się nadal do statystyk, ale nie można go przypisać do aktualnych wypożyczeń.</p>
                      </div>


                      <div className="flex items-center pb-2">
                        <StyledSpan color={'danger'} text={'Zbanowany'}/>
                        <p className="pl-4">projekt wycofany, ale nie ma potrzeby aby usuwać go całkowicie z bazy danych. Nie można go przypisać do aktualnych wypożyczeń.</p>
                      </div>

                    </div>





                    <div className='flex flex-col md:flex-row justify-center items-center mt-10 mb-4 mx-2 gap-5'>
                      <button className="flex w-full sm:w-10/12 md:w-3/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='button' onClick={() => {setShowWarningEditModal(true)}}>
                        Zatwierdź zmiany
                      </button>

                      <p>lub...</p>

                      <button className="flex w-full sm:w-1/2 md:w-1/4 justify-center rounded bg-danger p-3 font-medium text-gray hover:opacity-90" type='button' onClick={() => {setShowWarningDeleteModal(true)}}>
                        Usuń ten projekt CAŁKOWICIE
                      </button>
                    </div>
                    
                    
                    
                    
                    
                </form>
                :
                pageState === EditFormPageStatus.DataSuccessfullyEdited ?
                  <OperationResult status={'success'} title={'Dokonano edycji projektu 👍'} description={'Dane zostały pomyślnie zapisane w bazie danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/projekty/zestawienie`}/>
                :
                pageState === EditFormPageStatus.DataSuccessfullyDeleted ?
                  <OperationResult status={'success'} title={'Projekt usunięty 👍'} description={'Dane zostały pomyślnie usunięte z bazy danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/projekty/zestawienie`}/>
                :
                pageState === EditFormPageStatus.ErrorWithSendingForm ?
                <OperationResult status={'error'} title={'Wystąpił błąd podczas edytowania projektu 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(EditFormPageStatus.FillingTheForm)}/>
                :
                pageState === EditFormPageStatus.FailOnSendingForm ?
                <OperationResult status={'warning'} title={'Wystąpiły błędy podczas edytowania projektu 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(EditFormPageStatus.FillingTheForm)}/>
                :
                ''
                }
            </div>
            
        </div>
         
        
        
        </>
    );
  };
  
  export default EditPlaceFormContainer