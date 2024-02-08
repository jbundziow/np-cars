import { useState } from "react";
import OperationResult from "../../general/OperationResult";
import DOMAIN_NAME from "../../../utilities/domainName";

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

interface ReportFaultFormContainerProps {
    data: dataSchema;
}

const ReportFaultFormContainer = (props: ReportFaultFormContainerProps) => {
  type warnings = {
    pl: string,
    en: string,
  } 
  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])

  const [pageState, setPageState] = useState<PageStatus>(PageStatus.FillingTheForm)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // TODO: ADD CORRECT USER, CARID ETC.!!!!!
      const response = await fetch(`${DOMAIN_NAME}/faults/report/${props.data.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify({title, description}),
      });

      if (response.ok) {
        setPageState(PageStatus.FormWasSentCorrectly);
        setTitle('');
        setDescription('');
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
                  pageState === PageStatus.FormWasSentCorrectly ?
                    <OperationResult status={'success'} title={'Usterka została zgłoszona pomyślnie 👍'} description={'Zostanie teraz rozpatrzona przez moderatora.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/usterki/status-napraw/${props.data.id}`}/>
                  :
                  pageState === PageStatus.ErrorWithSendingForm ?
                  <OperationResult status={'error'} title={'Wystąpił błąd podczas dodawania usterki 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(PageStatus.FillingTheForm)}/>
                  :
                  pageState === PageStatus.FailOnSendingForm ?
                  <OperationResult status={'warning'} title={'Wystąpiły błędy podczas dodawania usterki 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(PageStatus.FillingTheForm)}/>
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