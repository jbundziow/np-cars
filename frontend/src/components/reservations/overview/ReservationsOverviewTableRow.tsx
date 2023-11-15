import TwoWeeksReservations from "./TwoWeeksReservations";



type weekdaysType = 'pon.' | 'wt.' | 'śr.' | 'czw.' | 'pt.' | 'sob.' | 'ndz.';

type newTwoWeeksDataArrType = {
    day: weekdaysType,
    date: Date,
    isBooked: boolean,
    name: string | null,
}

type reservationType = {
    date: Date,
    reservation: boolean,
    userID: number | null,
    userName: string | null,
  }

interface ReservationsOverviewTableRowProps {
    carID: number;
    carBrand: string;
    carModel: string;
    carImg: string;
    twoWeeksData: reservationType[];
  }

  const dateToDayOfTheWeek = (date: Date): weekdaysType => {
    date = new Date(date);
    const dayOfTheWeek = date.getDay();
    
    const weekdays: weekdaysType[] = ['ndz.','pon.','wt.','śr.','czw.','pt.','sob.'];
    return weekdays[dayOfTheWeek];
  }

  


const ReservationsOverviewTableRow = (props: ReservationsOverviewTableRowProps) => {
    
    let newTwoWeeksData: newTwoWeeksDataArrType[] = []
    newTwoWeeksData = props.twoWeeksData.map(elem => (
        {
            day: dateToDayOfTheWeek(elem.date),
            date: elem.date,
            isBooked: elem.reservation,
            name: elem.userName,
        }
    ))

    return (
    <>
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4">
    <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
        <div className="col-span-3 flex items-center">
        <div className="flex flex-col sm:gap-4 xl:flex-row xl:items-center">
            <div className=" w-22 sm:w-32 rounded-md">
            <img 
            className="rounded-md block"
            src={props.carImg} alt="Zdjęcie samochodu" />
            </div>
            <h5 className="font-medium text-xs sm:text-base text-black dark:text-white">
            {`${props.carBrand} ${props.carModel}`}
            </h5>
        </div>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <TwoWeeksReservations twoWeeksData={newTwoWeeksData}/>
    </td>
    </tr>
    </>
    );
  };
  
  export default ReservationsOverviewTableRow;