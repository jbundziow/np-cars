import { useState } from "react";
import OperationResult from "../../general/OperationResult";
import { BACKEND_URL } from "../../../utilities/domainName";
import { warnings } from "../../../types/common";
import { FormPageStatus } from "../../../types/enums";






const AddNewPlaceFormContainer = () => {



  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])
  const [pageState, setPageState] = useState<FormPageStatus>(FormPageStatus.FillingTheForm)


    const [projectCode, setProjectCode] = useState<string>('')
    const [placeName, setPlaceName] = useState<string>('')
    const [projectName, setProjectName] = useState<string>('')




  




    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

        const response = await fetch(`${BACKEND_URL}/admin/places`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            
            body: JSON.stringify({projectCode, placeName, projectName}),
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








                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Status
                    </label>
                    <input
                        disabled
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-success font-extrabold"
                        value="Aktywny"
                    />
                    </div>





                    <div className='flex justify-center mb-2'>
                    <button className="flex w-90 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='submit'>
                        Dodaj nowy projekt
                    </button>
                    </div>
                    
                    
                    
                    
                    
                </form>
                :
                pageState === FormPageStatus.FormWasSentCorrectly ?
                <OperationResult status={'success'} title={'Pomyślnie dodano nowy projekt 👍'} description={'Ma on status "Aktywny" i możesz przypisać go do wypożyczeń samochodów.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/projekty/zestawienie`}/>
                :
                pageState === FormPageStatus.ErrorWithSendingForm ?
                <OperationResult status={'error'} title={'Wystąpił błąd podczas dodawania projektu 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(FormPageStatus.FillingTheForm)}/>
                :
                pageState === FormPageStatus.FailOnSendingForm ?
                <OperationResult status={'warning'} title={'Wystąpiły błędy podczas dodawania projektu 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(FormPageStatus.FillingTheForm)}/>
                :
                ''
                }
            </div>
            
        </div>
         
        
        
        </>
    );
  };
  
  export default AddNewPlaceFormContainer