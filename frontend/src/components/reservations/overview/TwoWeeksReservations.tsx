import { reservationTypeAtSpecificDate } from "../../../types/api";
import { Polish_weekdays } from "../../../types/common";
import TwoWeeksReservationsCell from "./TwoWeeksReservationsCell";



type newReservationType = {
  day: Polish_weekdays,
  date: Date,
  isBooked: boolean,
  name: string | null,
}


interface TwoWeeksReservationsProps {
    twoWeeksData:reservationTypeAtSpecificDate[] | undefined;
  }

const TwoWeeksReservations = (props: TwoWeeksReservationsProps) => {

  const dateToDayOfTheWeek = (date: Date): Polish_weekdays => {
    date = new Date(date);
    const dayOfTheWeek = date.getDay();
    
    const weekdays: Polish_weekdays[] = ['ndz.','pon.','wt.','śr.','czw.','pt.','sob.'];
    return weekdays[dayOfTheWeek];
  }

  let newTwoWeeksData: newReservationType[] = []
  if(props.twoWeeksData) {
    newTwoWeeksData = props.twoWeeksData.map(elem => (
        {
            day: dateToDayOfTheWeek(elem.date),
            date: elem.date,
            isBooked: elem.reservation,
            name: elem.userName,
        }
    ))
  }


    return (
    <>
        <div className='flex flex-row gap-1 flex-wrap'>
            {newTwoWeeksData.map(item => {
              if(item.day === 'sob.') {
                return <div className="flex flex-row gap-1">
                       <div className='w-0.5 h-10 bg-warning'></div>
                       <TwoWeeksReservationsCell day={item.day} date={item.date} isBooked={item.isBooked} name={item.name}/>
                       </div>
              }
              else if(item.day === 'ndz.') {
                return <div className="flex flex-row gap-1">
                       <TwoWeeksReservationsCell day={item.day} date={item.date} isBooked={item.isBooked} name={item.name}/>
                       <div className='w-0.5 h-10 bg-warning'></div>
                       </div>
              }
              else {
                return <TwoWeeksReservationsCell day={item.day} date={item.date} isBooked={item.isBooked} name={item.name}/>
              }
            })}
            
        </div>
    </>
    );
  };
  
  export default TwoWeeksReservations;