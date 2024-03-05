import { Link } from "react-router-dom";
import { db_Car_basic, db_Fault, db_User } from "../../../types/db_types";
import OperationResult from "../../general/OperationResult";
import { EditFormPageStatus } from "../../../types/enums";
import { warnings } from "../../../types/common";
import { useState } from "react";
import DOMAIN_NAME from "../../../utilities/domainName";
import MultiselectInput from "../../general/input_elements/MultiselectInput";
import { Option } from "react-tailwindcss-select/dist/components/type";
import ModalWarning from "../../general/ModalWarning";
import { dateFormatter } from "../../../utilities/dateFormatter";
import useAuth from "../../../hooks/useAuth";

type faultDataSchema = {
  carData: db_Car_basic,
  faultData: db_Fault,
}

interface FaultEditFormProps {
    faultAndCarBasicData: faultDataSchema;
    usersData: db_User[] | [];
}

const FaultEditForm = (props: FaultEditFormProps) => {

  const { auth } = useAuth();


  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])


  const [pageState, setPageState] = useState<EditFormPageStatus>(EditFormPageStatus.FillingTheForm)




  const userOptions = props.usersData
  .map(user => ({
    value: user.id.toString(),
    label: `${user.name} ${user.surname}`
  }));



  const initialUserID: Option = userOptions.find(user => user.value === props.faultAndCarBasicData.faultData.userID.toString()) || {value: '', label: ''};


  const [userID, setUserID] = useState<Option>(initialUserID);
  const [title, setTitle] = useState<string | null>(props.faultAndCarBasicData.faultData.title);
  const [description, setDescription] = useState<string | null>(props.faultAndCarBasicData.faultData.description);
  const [status, setStatus] = useState<string>(props.faultAndCarBasicData.faultData.status);
  const [resultDescription, setResultDescription] = useState<string | null>(props.faultAndCarBasicData.faultData.resultDescription);
  const [repairCost, setRepairCost] = useState<number | '' | null>(props.faultAndCarBasicData.faultData.repairCost);



  const [showWarningDeleteModal, setShowWarningDeleteModal] = useState<boolean>(false);
  const [showWarningEditModal, setShowWarningEditModal] = useState<boolean>(false);
  
  
  
  
  

  
  
  


  const editFault = async () => {

    const finalModeratorID = status === 'pending' ? null : Number(auth.userID);
    const finalResultDescription = resultDescription === '' || resultDescription === null ? null : resultDescription;
    const finalRepairCost = repairCost === '' || repairCost === null ? null : repairCost;

    const editedFaultData = {
      userID: Number(userID.value),
      moderatorID: finalModeratorID,
      lastChangeAt: new Date(),
      title: title,
      description: description,
      status: status,
      resultDescription: finalResultDescription,
      repairCost: finalRepairCost,
    };


    try {
      const response = await fetch(`${DOMAIN_NAME}/admin/faults/${props.faultAndCarBasicData.faultData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify(editedFaultData),
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






  const deleteFault = async () => {
    try {
          const response = await fetch(`${DOMAIN_NAME}/admin/faults/${props.faultAndCarBasicData.faultData.id}`, {
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
        <ModalWarning showModal={showWarningDeleteModal} setShowModal={(state: boolean) => setShowWarningDeleteModal(state)} title= {'Usuń usterkę'} bodyText={`UWAGA! W większości przypadków lepszym pomysłem jest zmiana statusu na "Anulowana". Usterka przestanie wtedy być widoczna dla innych użytkowników, a pozwoli to na zachowanie danych o niej w bazie danych. Czy mimo tego chcesz kontynuować i usunąć usterkę CAŁKOWICIE z bazy danych? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteFault() }/>
        <ModalWarning showModal={showWarningEditModal} setShowModal={(state: boolean) => setShowWarningEditModal(state)} title= {'Zatwierdź zmiany'} bodyText={`Czy na pewno chcesz zatwierdzić wprowadzone zmiany dla tej usterki? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, zatwierdzam'} callback={ async () => await editFault() }/>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
  
          <div className='p-5 pt-0'>
          <img src={props.faultAndCarBasicData.carData.imgPath} alt="Zdjęcie samochodu" className='w-full border-2 rounded-md'/>
          <Link to={`/samochody/${props.faultAndCarBasicData.carData.id}`} target={'_self'} className="underline decoration-[0.5px] underline-offset-1 inline-block">
          <p className='text-black dark:text-white pb-2 text-lg'>{props.faultAndCarBasicData.carData.brand}&nbsp;{props.faultAndCarBasicData.carData.model}</p>
          </Link>
          </div>

          
            <div className='col-span-3'>
              
            
              <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
                  {pageState === EditFormPageStatus.FillingTheForm ?
                  <form className="m-0 lg:m-5">

 

                    <div className='flex justify-end'>
                      <p>ID: {props.faultAndCarBasicData.faultData.id}</p>
                    </div>




                    
                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                          Kto jest zgłaszającym usterkę?
                      </label>
                      <MultiselectInput isSearchable={true} isMultiple={false} value={userID} setValue={(value: Option) => (setUserID(value))} options={userOptions} />
                    </div>
                    







                    <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                        <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                          Status usterki:
                        </label>

                        <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                          <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path fill="#3C50E0" d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z"/></svg>
                          </span>
                          <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 mr-8 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                          value={status}
                          onChange={(e)=>{setStatus(e.target.value)}}
                          >
                            <option value="pending">Do akceptacji</option>
                            <option value="accepted">W trakcie</option>
                            <option value="finished">Rozwiązana</option>
                            <option value="cancelled">Anulowana</option>
                          </select>
                        </div>
                      </div>
                    






                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Data zgłoszenia usterki (pole nieedytowalne):
                      </label>
                      <input
                        type="text"
                        value={dateFormatter(props.faultAndCarBasicData.faultData.createdAt.toString())}
                        disabled
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>





                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Data ostatniej edycji usterki (pole nieedytowalne):
                      </label>
                      {props.faultAndCarBasicData.faultData.lastChangeAt ?
                      <input
                        type="text"
                        value={dateFormatter(props.faultAndCarBasicData.faultData.lastChangeAt)}
                        disabled
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                      :
                      <input
                        type="text"
                        value={'brak'}
                        disabled
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                      }
                    </div>
                    



                      
                    <div className='mb-5'>
                    <label className="mb-3 block text-black dark:text-white">
                      Tytuł usterki:
                    </label>
                    <input
                      type="text"
                      required
                      value={title ? title : ''}
                      onChange={(e)=>setTitle(e.target.value)}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={description ? description : ''}
                        onChange={e => setDescription(e.target.value)}
                      ></textarea>
                    </div>






                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Komentarz moderatora (pole opcjonalne):
                      </label>
                      <textarea
                        rows={6}
                        name="resultDescription"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={resultDescription ? resultDescription : ''}
                        onChange={e => setResultDescription(e.target.value)}
                      ></textarea>
                    </div>

                    




                    <div className='mb-4'>
                      <label className="mb-3 block text-black dark:text-white">
                        Koszt naprawy netto [zł] (pole opcjonalne):
                      </label>
                      <input
                        type="number"
                        placeholder=""
                        min='0'
                        max='300000'
                        step='0.01'
                        value={repairCost === null ? '' : repairCost}
                        onChange={(e)=>setRepairCost(Number(e.target.value))}
                        onKeyDown={(e)=>{
                          const { key } = e;
                          if ((key === 'Backspace' || key === 'Delete') && repairCost === 0) {
                              setRepairCost('');
                            }
                        }}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>





                    

                    <div className='flex flex-col md:flex-row justify-center items-center mt-10 mb-4 mx-2 gap-5'>
                      <button className="flex w-full sm:w-10/12 md:w-3/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='button' onClick={() => {setShowWarningEditModal(true)}}>
                        Zatwierdź zmiany
                      </button>

                      <p>lub...</p>

                      <button className="flex w-full sm:w-1/2 md:w-1/4 justify-center rounded bg-danger p-3 font-medium text-gray hover:opacity-90" type='button' onClick={() => {setShowWarningDeleteModal(true)}}>
                        Usuń tę usterkę CAŁKOWICIE
                      </button>
                    </div>
                  </form>
                  :
                  pageState === EditFormPageStatus.DataSuccessfullyEdited ?
                    <OperationResult status={'success'} title={'Dokonano edycji usterki 👍'} description={'Dane zostały pomyślnie zapisane w bazie danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/usterki/${props.faultAndCarBasicData.faultData.id}`}/>
                  :
                  pageState === EditFormPageStatus.DataSuccessfullyDeleted ?
                    <OperationResult status={'success'} title={'Usterka usunięta 👍'} description={'Dane zostały pomyślnie usunięte z bazy danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/usterki/status-napraw/${props.faultAndCarBasicData.faultData.carID}`}/>
                  :
                  pageState === EditFormPageStatus.ErrorWithSendingForm ?
                    <OperationResult status={'error'} title={'Wystąpił błąd podczas edytowania usterki 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(EditFormPageStatus.FillingTheForm)}/>
                  :
                  pageState === EditFormPageStatus.FailOnSendingForm ?
                    <OperationResult status={'warning'} title={'Wystąpiły błędy podczas edytowania usterki 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(EditFormPageStatus.FillingTheForm)}/>
                  :
                  ''
                  }
              </div>
              
            </div>
         
        </div>
        
        </>
    );
  };
  
  export default FaultEditForm;

