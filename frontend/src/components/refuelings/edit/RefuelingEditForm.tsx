import { Link } from "react-router-dom";
import { db_Car_basic, db_Refueling, db_User } from "../../../types/db_types";
import OperationResult from "../../general/OperationResult";
import { EditFormPageStatus } from "../../../types/enums";
import { AuthType, warnings } from "../../../types/common";
import { useState } from "react";
import DOMAIN_NAME from "../../../utilities/domainName";
import MultiselectInput from "../../general/input_elements/MultiselectInput";
import { Option } from "react-tailwindcss-select/dist/components/type";
import ModalWarning from "../../general/ModalWarning";



interface RefuelingEditFormProps {
    refuelingData: db_Refueling;
    carData: db_Car_basic;
    usersData: db_User[] | [];
    auth: AuthType;
}

const RefuelingEditForm = (props: RefuelingEditFormProps) => {




  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])


  const [pageState, setPageState] = useState<EditFormPageStatus>(EditFormPageStatus.FillingTheForm)




  const userOptions = props.usersData
  .map(user => ({
    value: user.id.toString(),
    label: `${user.name} ${user.surname}`
  }));



  const initialUserID: Option = userOptions.find(user => user.value === props.refuelingData.userID.toString()) || {value: '', label: ''};


  const [userID, setUserID] = useState<Option>(initialUserID);
  const [refuelingDate, setRefuelingDate] = useState<Date>(new Date(props.refuelingData.refuelingDate));
  const [carMileage, setCarMileage] = useState<number | ''>(props.refuelingData.carMileage);
  const [numberOfLiters, setNumberOfLiters] = useState<number | ''>(props.refuelingData.numberOfLiters);
  const [costBrutto, setCostBrutto] = useState<number | ''>(props.refuelingData.costBrutto);
  const [isFuelCardUsed, setIsFuelCardUsed] = useState<boolean>(props.refuelingData.isFuelCardUsed);
  const [moneyReturned, setMoneyReturned] = useState<boolean | null>(props.refuelingData.moneyReturned);
  const [invoiceNumber, setInvoiceNumber] = useState<string | null>(props.refuelingData.invoiceNumber);

  const [isConfirmedByAdmin, SetIsConfirmedByAdmin] = useState<boolean>(props.refuelingData.isAcknowledgedByModerator !== null ? true : false);
  const [isAcknowledgedByModerator, setIsAcknowledgedByModerator] = useState<number | null>(props.refuelingData.isAcknowledgedByModerator);



  const [showWarningDeleteModal, setShowWarningDeleteModal] = useState<boolean>(false);
  const [showWarningEditModal, setShowWarningEditModal] = useState<boolean>(false);
  
  
  
  
  

  
  
  


  const editRefueling = async () => {

    const finalInvoiceNumber = invoiceNumber === '' ? null : invoiceNumber;
    const finalMoneyReturned = isFuelCardUsed ? null : moneyReturned;
    const editedRefuelingData = {
      userID: Number(userID.value),
      refuelingDate: refuelingDate,
      carMileage: carMileage,
      numberOfLiters: numberOfLiters,
      costBrutto: costBrutto,
      isFuelCardUsed: isFuelCardUsed,
      moneyReturned: finalMoneyReturned,
      invoiceNumber: finalInvoiceNumber,
      isAcknowledgedByModerator: isAcknowledgedByModerator,
    };


    try {
      const response = await fetch(`${DOMAIN_NAME}/admin/refuelings/${props.refuelingData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify(editedRefuelingData),
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

  const deleteRefueling = async () => {
    try {
          const response = await fetch(`${DOMAIN_NAME}/admin/refuelings/${props.refuelingData.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
          });
    
          if (response.ok) {
            console.log('ok');
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
        <ModalWarning showModal={showWarningDeleteModal} setShowModal={(state: boolean) => setShowWarningDeleteModal(state)} title= {'Usuń dane tankowania'} bodyText={`Czy na pewno chcesz usunąć ten wpis dotyczący tankowania? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteRefueling() }/>
        <ModalWarning showModal={showWarningEditModal} setShowModal={(state: boolean) => setShowWarningEditModal(state)} title= {'Zatwierdź zmiany'} bodyText={`Czy na pewno chcesz zatwierdzić wprowadzone zmiany dla tego tankowania? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, zatwierdzam'} callback={ async () => await editRefueling() }/>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
  
          <div className='p-5 pt-0'>
          <img src={props.carData.imgPath} alt="Zdjęcie samochodu" className='w-full border-2 rounded-md'/>
          <Link to={`/samochody/${props.carData.id}`} target={'_self'} className="underline decoration-[0.5px] underline-offset-1 inline-block">
          <p className='text-black dark:text-white pb-2 text-lg'>{props.carData.brand}&nbsp;{props.carData.model}</p>
          </Link>
          </div>

          
            <div className='col-span-3'>
              
            
              <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
                  {pageState === EditFormPageStatus.FillingTheForm ?
                  <form className="m-0 lg:m-5">

 

                    <div className='flex justify-end'>
                      <p>ID: {props.refuelingData.id}</p>
                    </div>




                    
                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                          Kto dokonał tankowania?
                      </label>
                      <MultiselectInput isSearchable={true} isMultiple={false} value={userID} setValue={(value: Option) => (setUserID(value))} options={userOptions} />
                    </div>
                    
                    






                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Data i godzina tankowania:
                      </label>
                      <input
                        required
                        type="datetime-local"
                        value={new Date(refuelingDate.getTime() + (60 * 60000)).toISOString().slice(0, 16)} //UTC +1 TIMEZONE (WARSAW/EUROPE)
                        onChange={(e)=>setRefuelingDate(new Date(e.target.value))}
                        placeholder=""
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    





                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Przebieg podczas tankowania [km]:
                      </label>
                      <input
                        required
                        type="number"
                        placeholder=""
                        min='0'
                        max='2000000'
                        step='1'
                        value={carMileage}
                        onChange={(e)=>setCarMileage(Number(e.target.value))}
                        onKeyDown={(e)=>{
                          const { key } = e;
                          if ((key === 'Backspace' || key === 'Delete') && carMileage === 0) {
                              setCarMileage('');
                            }
                      }}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Ilość zatankowanego paliwa [litry]:
                      </label>
                      <input
                        required
                        type="number"
                        placeholder=""
                        min='0'
                        max='2500'
                        step='0.01'
                        value={numberOfLiters}
                        onChange={(e)=>setNumberOfLiters(Number(e.target.value))}
                        onKeyDown={(e)=>{
                          const { key } = e;
                          if ((key === 'Backspace' || key === 'Delete') && numberOfLiters === 0) {
                              setNumberOfLiters('');
                            }
                      }}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className='mb-4'>
                      <label className="mb-3 block text-black dark:text-white">
                        Zapłacona kwota brutto [zł]:
                      </label>
                      <input
                        required
                        type="number"
                        placeholder=""
                        min='0'
                        max='30000'
                        step='0.01'
                        value={costBrutto}
                        onChange={(e)=>setCostBrutto(Number(e.target.value))}
                        onKeyDown={(e)=>{
                          const { key } = e;
                          if ((key === 'Backspace' || key === 'Delete') && costBrutto === 0) {
                              setCostBrutto('');
                            }
                      }}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    
                    <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                      <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                        Czy użyto karty Orlen Mikroflota?
                      </label>
                      <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path fill="#3C50E0" d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"/></svg>
                        </span>
                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        value={isFuelCardUsed.toString()}
                        onChange={(e)=>setIsFuelCardUsed(e.target.value === 'true')}
                        >
                          <option value="true">Tak</option>
                          <option value="false">Nie</option>
                        </select>
                        </div>
                      </div>


                      {!isFuelCardUsed ?
                      <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                      <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                        Czy należy zwrócić użytkownikowi koszty tankowania?
                      </label>
                      <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path fill="#3C50E0" d="M112 112c0 35.3-28.7 64-64 64V336c35.3 0 64 28.7 64 64H464c0-35.3 28.7-64 64-64V176c-35.3 0-64-28.7-64-64H112zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM176 256a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zm80-48c0 8.8 7.2 16 16 16v64h-8c-8.8 0-16 7.2-16 16s7.2 16 16 16h24 24c8.8 0 16-7.2 16-16s-7.2-16-16-16h-8V208c0-8.8-7.2-16-16-16H272c-8.8 0-16 7.2-16 16z"/></svg>
                        </span>
                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        value={moneyReturned !== null ? moneyReturned.toString() : 'false'}
                        onChange={(e)=>setMoneyReturned(e.target.value === 'true')}
                        >
                          <option value="false">Tak</option>
                          <option value="true">Nie</option>
                        </select>
                        </div>
                      </div>
                      :
                      null
                      }


                      
                        <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white">
                          Numer faktury (opcjonalnie):
                        </label>
                        <input
                          type="text"
                          value={invoiceNumber ? invoiceNumber : ''}
                          onChange={(e)=>setInvoiceNumber(e.target.value)}
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        </div>
                      

                      
                      <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                        <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                          Czy to tankowanie powinno być oznaczone jako zatwierdzone przez administratora?
                        </label>

                        <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                          <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#3C50E0" d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                          </span>
                          <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 mr-8 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                          value={isConfirmedByAdmin.toString()}
                          onChange={(e)=>{
                            SetIsConfirmedByAdmin(e.target.value === 'true');
                            if(e.target.value === 'true') {
                              setIsAcknowledgedByModerator(Number(props.auth.userID));
                            } else {
                              setIsAcknowledgedByModerator(null);
                            }
                          }}
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
                        Usuń to tankowanie CAŁKOWICIE
                      </button>
                    </div>
                  </form>
                  :
                  pageState === EditFormPageStatus.DataSuccessfullyEdited ?
                    <OperationResult status={'success'} title={'Dokonano edycji tankowania 👍'} description={'Dane zostały pomyślnie zapisane w bazie danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/tankowania/archiwum`}/>
                  :
                  pageState === EditFormPageStatus.DataSuccessfullyDeleted ?
                    <OperationResult status={'success'} title={'Tankowanie usunięte 👍'} description={'Dane zostały pomyślnie usunięte z bazy danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/tankowania/archiwum`}/>
                  :
                  pageState === EditFormPageStatus.ErrorWithSendingForm ?
                  <OperationResult status={'error'} title={'Wystąpił błąd podczas edytowania tankowania 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(EditFormPageStatus.FillingTheForm)}/>
                  :
                  pageState === EditFormPageStatus.FailOnSendingForm ?
                  <OperationResult status={'warning'} title={'Wystąpiły błędy podczas edytowania tankowania 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(EditFormPageStatus.FillingTheForm)}/>
                  :
                  ''
                  }
              </div>
              
            </div>
         
        </div>
        
        </>
    );
  };
  
  export default RefuelingEditForm;

