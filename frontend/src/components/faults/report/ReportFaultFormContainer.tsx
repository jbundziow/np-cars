import { useState } from "react";
import OperationResult from "../../general/OperationResult";
import { BACKEND_URL } from "../../../utilities/domainName";
import { FormPageStatus } from "../../../types/enums";
import { warnings } from "../../../types/common";
import { db_Car_basic } from "../../../types/db_types";
import CarRowInFormImg from "../../general/CarRowInFormImg";




interface ReportFaultFormContainerProps {
    data: db_Car_basic;
}

const ReportFaultFormContainer = (props: ReportFaultFormContainerProps) => {

  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])

  const [pageState, setPageState] = useState<FormPageStatus>(FormPageStatus.FillingTheForm)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/faults/cars/${props.data.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify({title, description}),
      });

      if (response.ok) {
        setPageState(FormPageStatus.FormWasSentCorrectly);
        setTitle('');
        setDescription('');
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
  
            <CarRowInFormImg carData={props.data} />

          
            <div className='col-span-3'>
            
              <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
                  {pageState === FormPageStatus.FillingTheForm ?
                    <form onSubmit={submitHandler}>
                      <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white">
                          Tytuł usterki:
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Wpisz krótki tytuł usterki"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          value={title}
                          onChange={e => setTitle(e.target.value)}
                        />
                      </div>

                      <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white">
                          Szczegółowy opis usterki:
                        </label>
                        <textarea
                          required
                          rows={6}
                          name="desctiption"
                          placeholder="Opisz szczegółowo na czym polega problem"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                        ></textarea>
                      </div>

                      <div className='flex justify-center mb-2'>
                      <button className="flex w-90 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='submit'>
                          Dodaj nową usterkę
                        </button>
                      </div>
                    </form>
                  :
                  pageState === FormPageStatus.FormWasSentCorrectly ?
                    <OperationResult status={'success'} title={'Usterka została zgłoszona pomyślnie 👍'} description={'Zostanie teraz rozpatrzona przez moderatora.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/usterki/status-napraw/${props.data.id}`}/>
                  :
                  pageState === FormPageStatus.ErrorWithSendingForm ?
                  <OperationResult status={'error'} title={'Wystąpił błąd podczas dodawania usterki 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(FormPageStatus.FillingTheForm)}/>
                  :
                  pageState === FormPageStatus.FailOnSendingForm ?
                  <OperationResult status={'warning'} title={'Wystąpiły błędy podczas dodawania usterki 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(FormPageStatus.FillingTheForm)}/>
                  :
                  ''
                  }
              </div>
              
            </div>
         
        </div>
        
        </>
    );
  };
  
  export default ReportFaultFormContainer;