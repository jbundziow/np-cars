import TwoWeeksReservationsCell from "./TwoWeeksReservationsCell";

type weekdaysType = 'pon.' | 'wt.' | 'śr.' | 'czw.' | 'pt.' | 'sob.' | 'ndz.';


type newReservationType = {
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

interface TwoWeeksReservationsProps {
    twoWeeksData:reservationType[]
  }

const TwoWeeksReservations = (props: TwoWeeksReservationsProps) => {

  const dateToDayOfTheWeek = (date: Date): weekdaysType => {
    date = new Date(date);
    const dayOfTheWeek = date.getDay();
    
    const weekdays: weekdaysType[] = ['ndz.','pon.','wt.','śr.','czw.','pt.','sob.'];
    return weekdays[dayOfTheWeek];
  }

  let newTwoWeeksData: newReservationType[] = []
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