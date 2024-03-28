import ModalWarning from "../../general/ModalWarning";
import { useState } from "react";
import { BACKEND_URL } from "../../../utilities/domainName";
import CarRowInTable from "../../general/CarRowInTable";
import { db_Car_basic, db_Fault } from "../../../types/db_types";
import FixedAlert, { alertOptionsObject } from "../../general/FixedAlert";
import useAuth from "../../../hooks/useAuth";
import FaultStatusSpan from "../../general/spanElements/FaultStatusSpan";
import { Link } from "react-router-dom";
import { PaginationType } from "../../../types/common";





interface MyFaultsTableRowProps {
    carData: db_Car_basic;
    faultData: db_Fault;
    index: number;
    paginationData: PaginationType,
  }

const MyFaultsTableRow = (props: MyFaultsTableRowProps) => {

    const { auth } = useAuth();

    const [faultDeleted, setFaultDeleted] = useState<boolean>(false);

    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    const [alertOptions, setAlertOptions] = useState<alertOptionsObject>({showAlert: false, color: 'danger', text: '#ERR#', dismiss_button: false, autohide: true, delay_ms: 1, key: 1});

    const deleteFault = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/faults/${props.faultData.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              credentials: 'include',
            });
            const responseJSON = await response.json();
            if(responseJSON.status === 'success') {
              setFaultDeleted(true)
              setAlertOptions(({showAlert: true, color: 'success', text: 'Pomyślnie usunięto dane dotyczące tej usterki.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
            }
            else if(responseJSON.status === 'fail') {
              setAlertOptions(({showAlert: true, color: 'danger', text: `Wystąpił błąd: ${responseJSON.data[0].pl}`, dismiss_button: true, autohide: true, delay_ms: 7000, key: Math.random()}))
            }
            else {
              setAlertOptions(({showAlert: true, color: 'danger', text: 'Wystąpił błąd podczas usuwania usterki. Spróbuj ponownie później.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
            }
            
          }
          catch (error) {
            setAlertOptions(({showAlert: true, color: 'danger', text: 'Wystąpił błąd podczas usuwania usterki. Spróbuj ponownie później.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
          }
    }

    return (
    <>
    <ModalWarning showModal={showWarningModal} setShowModal={(state: boolean) => setShowWarningModal(state)} title= {'Usuń usterkę'} bodyText={`Czy na pewno chcesz usunąć tę usterkę? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteFault() }/>
    <FixedAlert options={alertOptions}/>
    {!faultDeleted ? 
    <tr className="max-md:odd:bg-gray-2 md:hover:bg-gray-2 max-md:odd:dark:bg-meta-4 md:dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <CarRowInTable id={props.carData?.id} brand={props.carData?.brand} model={props.carData?.model} imgPath={props.carData?.imgPath} linkTarget={'_self'}/>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-sm lg:text-base'>{props.faultData.title}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs sm:text-sm lg:text-base'><FaultStatusSpan status={props.faultData.status}/></p>
        </div>
    </td>

    
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
      <div className="flex flex-row md:flex-col items-center gap-3">
        {auth.userRole !== 'admin' && props.index === 0 && props.paginationData.currentPage === 1 ?
          <div className="flex items-center space-x-3.5">
          <button
          onClick={() => setShowWarningModal(true)}
          className='inline-flex items-center justify-center rounded-full bg-danger py-1 sm:py-2 px-4 sm:px-7 text-center text-xs font-medium text-white hover:bg-opacity-80 lg:px-6 xl:px-8'
          >
          Usuń usterkę
          </button>
          </div>
        :
        null
        }
        <div className="flex items-center space-x-3.5">
          <Link
          to={`/usterki/${props.faultData.id}`}
          className='inline-flex items-center justify-center rounded-full bg-primary py-1 sm:py-2 px-4 sm:px-7 text-center text-xs font-medium text-white hover:bg-opacity-80 lg:px-6 xl:px-8'
          >
          Szczegóły
          </Link>
        </div>
      </div>
    </td>
    

    </tr>
    :
    <></>
    }
    </>
    );
  };
  
  export default MyFaultsTableRow;