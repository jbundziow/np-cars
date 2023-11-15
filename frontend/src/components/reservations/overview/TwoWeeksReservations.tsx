import TwoWeeksReservationsCell from "./TwoWeeksReservationsCell";

type twoWeeksDataArrType = {
  day: 'pon.' | 'wt.' | 'śr.' | 'czw.' | 'pt.' | 'sob.' | 'ndz.',
  date: Date,
  isBooked: boolean,
  name: string | null,
}

interface TwoWeeksReservationsProps {
    twoWeeksData:twoWeeksDataArrType[]
  }

const TwoWeeksReservations = (props: TwoWeeksReservationsProps) => {


    return (
    <>
        <div className='flex flex-row gap-1 flex-wrap'>
            {props.twoWeeksData.map(item => {
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