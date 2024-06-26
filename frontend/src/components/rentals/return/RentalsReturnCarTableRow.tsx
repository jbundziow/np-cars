import { Link } from "react-router-dom";
import CarRowInTable from "../../general/CarRowInTable";
import { db_Car_basic, db_User } from "../../../types/db_types";
import { useState } from "react";
import FixedAlert, { alertOptionsObject } from "../../general/FixedAlert";
import { BACKEND_URL } from "../../../utilities/domainName";
import ModalWarning from "../../general/ModalWarning";
import useAuth from "../../../hooks/useAuth";
import UserSpan from "../../general/spanElements/UserSpan";



interface RentalsReturnCarTableRowProps {
    carsData: db_Car_basic[] | [];
    rentalCarId: number;
    rentDate: string;
    rentalID: number;
    rentalUserID: number;
    showOwner: boolean;
    usersData: db_User[] | undefined;
  }

const RentalsReturnCarTableRow = (props: RentalsReturnCarTableRowProps) => {

    const { auth } = useAuth();

    const [rentalDeleted, setRentalDeleted] = useState<boolean>(false);

    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    const [alertOptions, setAlertOptions] = useState<alertOptionsObject>({showAlert: false, color: 'danger', text: '#ERR#', dismiss_button: false, autohide: true, delay_ms: 1, key: 1});

    const deleteRental = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}${auth.userRole === 'admin' ? '/admin' : ''}/rentals/${props.rentalID}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              credentials: 'include',
            });
            const responseJSON = await response.json();

            if(responseJSON.status === 'success') {
                setRentalDeleted(true)
                setAlertOptions(({showAlert: true, color: 'success', text: 'Pomyślnie usunięto wypożyczenie.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
            }
            else if(responseJSON.status === 'fail') {
              setAlertOptions(({showAlert: true, color: 'danger', text: `Wystąpił błąd: ${responseJSON.data[0].pl}`, dismiss_button: true, autohide: true, delay_ms: 7000, key: Math.random()}))
            }
            else {
                setAlertOptions(({showAlert: true, color: 'danger', text: 'Wystąpił błąd podczas usuwania wypożyczenia. Spróbuj ponownie później.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
            }
            
          }
          catch (error) {
            setAlertOptions(({showAlert: true, color: 'danger', text: 'Wystąpił błąd podczas usuwania wypożyczenia. Spróbuj ponownie później.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
          }
    }



    const car = props.carsData.find(car => car.id === props.rentalCarId);

    let user;
    if(props.usersData) {
    user = props.usersData.find(user => user.id === props.rentalUserID);
    }


    return (
    <>
        <ModalWarning showModal={showWarningModal} setShowModal={(state: boolean) => setShowWarningModal(state)} title= {'Usuń wypożyczenie'} bodyText={`Czy na pewno chcesz usunąć to wypożyczenie? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteRental() }/>
        <FixedAlert options={alertOptions}/>
    {!rentalDeleted ? 
        <tr className="max-md:odd:bg-gray-2 md:hover:bg-gray-2 max-md:odd:dark:bg-meta-4 md:dark:hover:bg-meta-4">
        <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
            <CarRowInTable id={car?.id} brand={car?.brand} model={car?.model} imgPath={car?.imgPath} linkTarget={'_self'}/>
        </td>
        {props.showOwner ? 
        <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
            <UserSpan userObj={user} nullText={'#ERR#'} linkTarget={'_self'} no_wrap={true}/>
        </td>
        :
        null
        }
        <td className="hidden md:table-cell border-b border-[#eee] py-5 px-2 dark:border-strokedark">
            <div className="flex justify-center">
            <p className='dark:text-white text-black'>{props.rentDate}</p>
            </div>
        </td>
        <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-end space-x-3.5">
            <Link
            to={`./${props.rentalID}`}
            className='inline-flex items-center justify-center rounded-full bg-primary py-1 sm:py-2 px-4 sm:px-7 text-center text-xs sm:text-base font-medium text-white hover:bg-opacity-80 lg:px-6 xl:px-8'
            >
            Oddaj auto
            </Link>
            <button
            onClick={()=> setShowWarningModal(true)}
            className='inline-flex items-center justify-center rounded-full bg-danger py-1 sm:py-2 px-4 sm:px-7 text-center text-xs sm:text-base font-medium text-white hover:bg-opacity-80 lg:px-6 xl:px-8'
            >
            Usuń
            </button>
            </div>
        </td>
        </tr>
    :
        <></>
    }
    </>
    );
  };
  
  export default RentalsReturnCarTableRow;