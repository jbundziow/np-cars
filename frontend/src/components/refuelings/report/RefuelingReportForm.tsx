import { Link } from "react-router-dom";
import { db_Car_basic, db_User } from "../../../types/db_types";
import OperationResult from "../../general/OperationResult";
import { FormPageStatus } from "../../../types/enums";
import { AuthType, warnings } from "../../../types/common";
import { useState } from "react";
import DOMAIN_NAME from "../../../utilities/domainName";
import MultiselectInput from "../../general/input_elements/MultiselectInput";
import { Option } from "react-tailwindcss-select/dist/components/type";

interface RefuelingUserDataToAPI {
  carMileage: number | '';
  numberOfLiters: number | '';
  costBrutto: number | '';
  isFuelCardUsed: boolean;
  refuelingDate?: Date;
  moneyReturned?: boolean | null;
}

interface RefuelingAdminDataToAPI {
  userID: number;
  carMileage: number | '';
  numberOfLiters: number | '';
  costBrutto: number | '';
  isFuelCardUsed: boolean;
  refuelingDate?: Date;
  moneyReturned?: boolean | null;
  invoiceNumber: string | null;
  isAcknowledgedByModerator: number | null;
}

interface RefuelingReportFormProps {
    carData: db_Car_basic;
    usersData: db_User[] | undefined;
    auth: AuthType;
}

const RefuelingReportForm = (props: RefuelingReportFormProps) => {



  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])

  const [pageState, setPageState] = useState<FormPageStatus>(FormPageStatus.FillingTheForm)

  //admin
  const [isAnotherUserDoneRefueling, setIsAnotherUserDoneRefueling] = useState<boolean>(false);
  const [selectedUserID, setSelectedUserID] = useState<Option>({value: '', label: ''});

  const [invoiceNumber, setInvoiceNumber] = useState<string>('');

  const [isConfirmedByAdmin, SetIsConfirmedByAdmin] = useState<boolean>(false);
  //end admin


  const [selectOtherDate, setSelectOtherDate] = useState<boolean>(false);
  const [refuelingDate, setRefuelingDate] = useState<Date>(new Date());
  const [carMileage, setCarMileage] = useState<number | ''>('');
  const [numberOfLiters, setNumberOfLiters] = useState<number | ''>('');
  const [costBrutto, setCostBrutto] = useState<number | ''>('');
  const [isFuelCardUsed, setIsFuelCardUsed] = useState<boolean>(true);
  const [moneyReturned, setMoneyReturned] = useState<boolean>(false);

  let userOptions: {value: string, label: string}[] | [] = [];
  if(props.usersData) {
  userOptions = props.usersData
  .filter(user => user.id !== Number(props.auth.userID))
  .map(user => ({
    value: user.id.toString(),
    label: `${user.name} ${user.surname}`
  }));
  }


  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(props.auth.userRole === 'admin') {
      await adminSubmitForm();
    }
    else {
      await userSubmitForm();
    }
    
  };


  const userSubmitForm = async () => {
    const submittedRefuelingData: RefuelingUserDataToAPI = {
      refuelingDate: new Date(),
      carMileage: carMileage,
      numberOfLiters: numberOfLiters,
      costBrutto: costBrutto,
      isFuelCardUsed: isFuelCardUsed,
      moneyReturned: null,
    };
    if (selectOtherDate) {submittedRefuelingData.refuelingDate = refuelingDate}
    if (!isFuelCardUsed) {submittedRefuelingData.moneyReturned = moneyReturned}
    

    try {
      const response = await fetch(`${DOMAIN_NAME}/refuelings/${props.carData.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify(submittedRefuelingData),
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


  const adminSubmitForm = async () => {
    const submittedRefuelingData: RefuelingAdminDataToAPI = {
      userID: Number(props.auth.userID),
      refuelingDate: new Date(),
      carMileage: carMileage,
      numberOfLiters: numberOfLiters,
      costBrutto: costBrutto,
      isFuelCardUsed: isFuelCardUsed,
      moneyReturned: null,
      invoiceNumber: invoiceNumber,
      isAcknowledgedByModerator: null,
    };
    if(selectedUserID.value !== '') {submittedRefuelingData.userID = Number(selectedUserID.value)}
    if (selectOtherDate) {submittedRefuelingData.refuelingDate = refuelingDate}
    if (!isFuelCardUsed) {submittedRefuelingData.moneyReturned = moneyReturned}
    if(invoiceNumber === '') {submittedRefuelingData.invoiceNumber = null}
    if(isConfirmedByAdmin) {submittedRefuelingData.isAcknowledgedByModerator = Number(props.auth.userID)}
    

    try {
      const response = await fetch(`${DOMAIN_NAME}/admin/refuelings/${props.carData.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify(submittedRefuelingData),
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
                  <form className="m-0 lg:m-5" onSubmit={submitHandler}>

 


                    {props.auth.userRole === 'admin' ?
                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                      Kto dokonał tankowania?
                    </label>
                    <div className="relative z-1 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#3C50E0" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                        </span>
                        <select
                        className="relative z-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-13 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary sm:text-base"
                        value={isAnotherUserDoneRefueling.toString()}
                        onChange={(e)=>{
                          setIsAnotherUserDoneRefueling(e.target.value === 'true');
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




                    {isAnotherUserDoneRefueling ?
                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                          Kto zatankował?
                      </label>
                      <MultiselectInput isSearchable={true} isMultiple={false} value={selectedUserID} setValue={(value: Option) => (setSelectedUserID(value))} options={userOptions} />
                    </div>
                    :
                    null
                    }
                    






                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                      Kiedy tankowano?
                    </label>
                    <div className="relative z-1 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="#3C50E0" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                        </span>
                        <select
                        className="relative z-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-13 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary sm:text-base"
                        value={selectOtherDate.toString()}
                        onChange={(e)=>setSelectOtherDate(e.target.value === 'true')}
                        >
                        <option value="false">Przed chwilą</option>
                        <option value="true">Chcę wybrać inną datę</option>
                        </select>
                    </div>
                    </div>

                    {selectOtherDate ?
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
                    :
                    null
                    }




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
                        Czy należy zwrócić Ci koszty tankowania?
                      </label>
                      <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path fill="#3C50E0" d="M112 112c0 35.3-28.7 64-64 64V336c35.3 0 64 28.7 64 64H464c0-35.3 28.7-64 64-64V176c-35.3 0-64-28.7-64-64H112zM0 128C0 92.7 28.7 64 64 64H512c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM176 256a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zm80-48c0 8.8 7.2 16 16 16v64h-8c-8.8 0-16 7.2-16 16s7.2 16 16 16h24 24c8.8 0 16-7.2 16-16s-7.2-16-16-16h-8V208c0-8.8-7.2-16-16-16H272c-8.8 0-16 7.2-16 16z"/></svg>
                        </span>
                        <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        value={moneyReturned.toString()}
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


                      {props.auth.userRole === 'admin' ?
                        <div className='mb-5'>
                        <label className="mb-3 block text-black dark:text-white">
                          Numer faktury (pole nieobowiązkowe):
                        </label>
                        <input
                          type="text"
                          value={invoiceNumber}
                          onChange={(e)=>setInvoiceNumber(e.target.value)}
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        </div>
                      :
                      null
                      }

                      {props.auth.userRole === 'admin' ?
                      <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                        <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                          Czy chcesz, aby dodając to tankowanie jednocześnie potwierdzić je jako administrator?
                        </label>

                        <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
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

                    

                    <div className='flex justify-center mb-4'>
                    <button className="flex w-90 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='submit'>
                        Zapisz
                      </button>
                      
                    </div>
                  </form>
                  :
                  pageState === FormPageStatus.FormWasSentCorrectly ?
                    <OperationResult status={'success'} title={'Dodano tankowanie 👍'} description={'Dane zostały pomyślnie zapisane w bazie danych. Dziękujemy!'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/tankowania/moje-tankowania`}/>
                  :
                  pageState === FormPageStatus.ErrorWithSendingForm ?
                  <OperationResult status={'error'} title={'Wystąpił błąd podczas dodawania tankowania 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(FormPageStatus.FillingTheForm)}/>
                  :
                  pageState === FormPageStatus.FailOnSendingForm ?
                  <OperationResult status={'warning'} title={'Wystąpiły błędy podczas dodawania tankowania 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(FormPageStatus.FillingTheForm)}/>
                  :
                  ''
                  }
              </div>
              
            </div>
         
        </div>
        
        </>
    );
  };
  
  export default RefuelingReportForm;

