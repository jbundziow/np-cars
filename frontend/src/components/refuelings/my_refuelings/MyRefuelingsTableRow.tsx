import ModalWarning from "../../general/ModalWarning";
import { useState } from "react";
import { BACKEND_URL } from "../../../utilities/domainName";
import CarRowInTable from "../../general/CarRowInTable";
import { db_Car_basic, db_Refueling } from "../../../types/db_types";
import FixedAlert, { alertOptionsObject } from "../../general/FixedAlert";
import { dateFormatterAsObject } from "../../../utilities/dateFormatter";
import StyledSpan from "../../general/spanElements/StyledSpan";
import useAuth from "../../../hooks/useAuth";





interface MyRefuelingsTableRowProps {
    carData: db_Car_basic;
    refuelingData: db_Refueling;
    index: number;
  }

const MyRefuelingsTableRow = (props: MyRefuelingsTableRowProps) => {

    const { auth } = useAuth();

    const [refuelingDeleted, setRefuelingDeleted] = useState<boolean>(false);

    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    const [alertOptions, setAlertOptions] = useState<alertOptionsObject>({showAlert: false, color: 'danger', text: '#ERR#', dismiss_button: false, autohide: true, delay_ms: 1, key: 1});

    const deleteRefueling = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/refuelings`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              credentials: 'include',
              body: JSON.stringify({refuelingID: props.refuelingData.id, carID: props.carData.id}),
            });
            const responseJSON = await response.json();
            if(responseJSON.status === 'success') {
              setRefuelingDeleted(true)
              setAlertOptions(({showAlert: true, color: 'success', text: 'Pomyślnie usunięto dane dotyczące tego tankowania.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
            }
            else if(responseJSON.status === 'fail') {
              setAlertOptions(({showAlert: true, color: 'danger', text: `Wystąpił błąd: ${responseJSON.data[0].pl}`, dismiss_button: true, autohide: true, delay_ms: 7000, key: Math.random()}))
            }
            else {
              setAlertOptions(({showAlert: true, color: 'danger', text: 'Wystąpił błąd podczas usuwania tankowania. Spróbuj ponownie później.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
            }
            
          }
          catch (error) {
            setAlertOptions(({showAlert: true, color: 'danger', text: 'Wystąpił błąd podczas usuwania tankowania. Spróbuj ponownie później.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
          }
    }

    return (
    <>
    <ModalWarning showModal={showWarningModal} setShowModal={(state: boolean) => setShowWarningModal(state)} title= {'Usuń tankowanie'} bodyText={`Czy na pewno chcesz usunąć to tankowanie? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteRefueling() }/>
    <FixedAlert options={alertOptions}/>
    {!refuelingDeleted ? 
    <tr className="max-md:odd:bg-gray-2 md:hover:bg-gray-2 max-md:odd:dark:bg-meta-4 md:dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.carData?.id} brand={props.carData?.brand} model={props.carData?.model} imgPath={props.carData?.imgPath} linkTarget={'_self'}/>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-sm lg:text-base text-center'>
            <span className="block">{`${dateFormatterAsObject(props.refuelingData.refuelingDate.toString()).date}`}</span>
            <span className="block">{`${dateFormatterAsObject(props.refuelingData.refuelingDate.toString()).time}`}</span>
        </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-sm lg:text-base'>{props.refuelingData.carMileage}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-sm lg:text-base'>{props.refuelingData.costBrutto ? props.refuelingData.costBrutto : <StyledSpan color={'warning'} text={'Brak danych'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.moneyReturned === null ? <StyledSpan color={'success'} text={'Nie dotyczy'}/> : props.refuelingData.moneyReturned === true ? <StyledSpan color={'success'} text={'Nie'}/> : <StyledSpan color={'danger'} text={'Tak'}/>}</p>
        </div>
    </td>

    {auth.userRole !== 'admin' ?
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
      {props.index === 0 ?
        <div className="flex items-center space-x-3.5">
        <button
        onClick={() => setShowWarningModal(true)}
        className='inline-flex items-center justify-center rounded-full bg-danger py-1 sm:py-2 px-4 sm:px-7 text-center text-xs font-medium text-white hover:bg-opacity-80 lg:px-6 xl:px-8'
        >
        Usuń tankowanie
        </button>
        </div>
      :
      null
      }
    </td>
    :
    null
    }

    </tr>
    :
    <></>
    }
    </>
    );
  };
  
  export default MyRefuelingsTableRow;