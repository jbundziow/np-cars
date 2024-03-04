import { dateFormatterAsObject } from "../../../utilities/dateFormatter";
import { Link } from "react-router-dom";
import UserSpan from "../../general/spanElements/UserSpan";
import StyledSpan from "../../general/spanElements/StyledSpan";
import { db_Car_basic, db_Refueling, db_User } from "../../../types/db_types";
import EditButton from "../../general/buttons/EditButton";
import DeleteButton from "../../general/buttons/DeleteButton";
import { useState } from "react";
import DOMAIN_NAME from "../../../utilities/domainName";
import ModalWarning from "../../general/ModalWarning";
import FixedAlert, { alertOptionsObject } from "../../general/FixedAlert";
import useAuth from "../../../hooks/useAuth";




interface RefuelingsHistoryTableRowProps {
    carData: db_Car_basic;
    refuelingData: db_Refueling;
    usersData: db_User[] | [],
  }

const RefuelingsHistoryTableRow = (props: RefuelingsHistoryTableRowProps) => {

    const [rowDeleted, setRowDeleted] = useState<boolean>(false);

    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    const [alertOptions, setAlertOptions] = useState<alertOptionsObject>({showAlert: false, color: 'danger', text: '#ERR#', dismiss_button: false, autohide: true, delay_ms: 1, key: 1});

    const deleteRefuelingAsAdmin = async () => {
        try {
            const response = await fetch(`${DOMAIN_NAME}/admin/refuelings/${props.refuelingData.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              credentials: 'include',
            });
            const responseJSON = await response.json();
            if(responseJSON.status === 'success') {
                setRowDeleted(true)
                setAlertOptions(({showAlert: true, color: 'success', text: 'Pomyślnie usunięto wpis dotyczący tego tankowania.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
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


    const { auth } = useAuth();

    const refuelingUserObject = props.usersData.find(user => user.id === props.refuelingData.userID);
    const isAcknowledgedByModeratorUserObject = props.usersData.find(user => user.id === props.refuelingData.isAcknowledgedByModerator)
    const lastEditedByModeratorUserObject = props.usersData.find(user => user.id === props.refuelingData.lastEditedByModeratorOfID)
    
    return (
    <>
    <ModalWarning showModal={showWarningModal} setShowModal={(state: boolean) => setShowWarningModal(state)} title= {'Usuń dane tankowania'} bodyText={`Czy na pewno chcesz usunąć ten wpis dotyczący tankowania? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteRefuelingAsAdmin() }/>
    <FixedAlert options={alertOptions}/>
    {!rowDeleted ? 
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4 text-center">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <div className="col-span-3 flex items-center">
        <div className="flex flex-col sm:gap-4 xl:flex-row xl:items-center">
            <div className=" w-22 sm:w-32 rounded-md">
            <img 
            className="rounded-md block"
            src={props.carData.imgPath} alt="Zdjęcie samochodu" />
            </div>
            <Link to={`/samochody/${[props.carData.id]}`} target="_blank" className="underline decoration-[0.5px] underline-offset-1">
            <h5 className="font-medium text-xs xl:text-sm text-black dark:text-white">
            {`${props.carData.brand} ${props.carData.model}`}
            </h5>
            </Link>
        </div>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'><UserSpan userObj={refuelingUserObject} nullText={'brak'} linkTarget={'_blank'} no_wrap={true}/></p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm text-center'>
            <span className="block">{`${dateFormatterAsObject(props.refuelingData.refuelingDate.toString()).date}`}</span>
            <span className="block">{`${dateFormatterAsObject(props.refuelingData.refuelingDate.toString()).time}`}</span>
        </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.carMileage}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.numberOfLiters}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.averageConsumption ? props.refuelingData.averageConsumption : <StyledSpan color={'warning'} text={'Brak danych'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.costBrutto ? props.refuelingData.costBrutto : <StyledSpan color={'warning'} text={'Brak danych'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.costPerLiter ? props.refuelingData.costPerLiter : <StyledSpan color={'warning'} text={'Brak danych'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.isFuelCardUsed ? <StyledSpan color={'success'} text={'Tak'}/> : <StyledSpan color={'warning'} text={'Nie'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.moneyReturned === null ? <StyledSpan color={'success'} text={'Nie dotyczy'}/> : props.refuelingData.moneyReturned === true ? <StyledSpan color={'success'} text={'Tak'}/> : <StyledSpan color={'danger'} text={'Nie'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.invoiceNumber ? props.refuelingData.invoiceNumber : <StyledSpan color={'warning'} text={'Brak danych'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'><UserSpan userObj={isAcknowledgedByModeratorUserObject} nullText={'Nie'} linkTarget={'_blank'} no_wrap={true}/></p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.refuelingData.id}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm text-center'>
            <span className="block">{`${props.refuelingData.createdAt ? `${dateFormatterAsObject(props.refuelingData.createdAt.toString()).date}` : 'brak'}`}</span>
            <span className="block">{`${props.refuelingData.createdAt ? `${dateFormatterAsObject(props.refuelingData.createdAt.toString()).time}` : ''}`}</span>
        </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm text-center'>
            <span className="block">{`${props.refuelingData.updatedAt ? `${dateFormatterAsObject(props.refuelingData.updatedAt.toString()).date}` : 'brak'}`}</span>
            <span className="block">{`${props.refuelingData.updatedAt ? `${dateFormatterAsObject(props.refuelingData.updatedAt.toString()).time}` : ''}`}</span>
        </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'><UserSpan userObj={lastEditedByModeratorUserObject} nullText={'Nie'} linkTarget={'_blank'} no_wrap={true}/></p>
        </div>
    </td>
    {auth.userRole === 'admin' ?
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-end space-x-3.5">
            <EditButton linkTo={`/tankowania/edycja/${props.refuelingData.id}`} linkTarget="_blank"/>
            <DeleteButton onClick={() => {setShowWarningModal(true)}}/>
        </div>
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
  
  export default RefuelingsHistoryTableRow;