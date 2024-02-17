import formatDate from "../../../utilities/formatDate";
// import ModalWarning from "../general/ModalWarning";
// import { useState } from "react";
// import DOMAIN_NAME from "../../utilities/domainName";

type rentalDataType = {
    id: number,
    carID: number,
    userID: number,
    returnUserID: number,
    lastEditedByModeratorOfID: number,
    carMileageBefore: number,
    carMileageAfter: number | null,
    distance: number | null,
    travelDestination: string | null,
    placeID: number | null,
    dateFrom: Date,
    dateTo: Date | null,
  }

interface RentalsHistoryTableRowProps {
    carID: number;
    carBrand: string;
    carModel: string;
    carImg: string;
    rentalData: rentalDataType;
  }

const RentalsHistoryTableRow = (props: RentalsHistoryTableRowProps) => {

    // const [reservationDeleted, setReservationDeleted] = useState<boolean>(false);

    // const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    // const deleteReservation = async () => {
    //     try {
    //         await fetch(`${DOMAIN_NAME}/reservations`, {
    //           method: 'DELETE',
    //           headers: {
    //             'Content-Type': 'application/json; charset=utf-8',
    //           },
    //           credentials: 'include',
    //           body: JSON.stringify({reservationID: props.reservationData.id}),
    //         });
    //         //TODO: update parent component
    //         setReservationDeleted(true)
    //       }
    //       catch (error) {
    //         ;
    //       }
    // }

    return (
    <>
    {/* <ModalWarning showModal={showWarningModal} setShowModal={(state: boolean) => setShowWarningModal(state)} title= {'Usuń rezerwację'} bodyText={`Czy na pewno chcesz usunąć tę rezerwację? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteReservation() }/>
    {!reservationDeleted ?  */}
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <div className="col-span-3 flex items-center">
        <div className="flex flex-col sm:gap-4 xl:flex-row xl:items-center">
            <div className=" w-22 sm:w-32 rounded-md">
            <img 
            className="rounded-md block"
            src={props.carImg} alt="Zdjęcie samochodu" />
            </div>
            <h5 className="font-medium text-xs xl:text-sm text-black dark:text-white">
            {`${props.carBrand} ${props.carModel}`}
            </h5>
        </div>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{`${formatDate(new Date(props.rentalData.dateFrom))}`}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{`${props.rentalData.dateTo ? formatDate(new Date(props.rentalData.dateTo)) : 'brak'}`}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{`${props.rentalData.carMileageBefore}`}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{`${props.rentalData.carMileageAfter}`}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{`${props.rentalData.distance}`}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.rentalData.travelDestination}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.rentalData.returnUserID}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.rentalData.lastEditedByModeratorOfID}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.rentalData.placeID}</p>
        </div>
    </td>

    </tr>
    {/* :
    <></>
    } */}
    </>
    );
  };
  
  export default RentalsHistoryTableRow;