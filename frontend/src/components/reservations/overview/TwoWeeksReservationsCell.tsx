

interface TwoWeeksReservationsCellProps {
  day: 'pon.' | 'wt.' | 'śr.' | 'czw.' | 'pt.' | 'sob.' | 'ndz.',
  date: Date,
  isBooked: boolean,
  name: string | null,
  }

const TwoWeeksReservationsCell = (props: TwoWeeksReservationsCellProps) => {



    return (
    <>
    {!props.isBooked || !props.name ?
    <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>{props.day}</div>
    :
    <div className="group relative flex justify-center cursor-default">
    <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-danger flex justify-center items-center cursor-default'>{props.day}</div>
    <span className="absolute -top-14 md:-top-16 right-0 scale-0 transition-all rounded bg-gray-800 p-2 text-xs md:text-sm font-bold text-center text-white group-hover:scale-100 bg-danger w-auto whitespace-nowrap">🙋🏼‍♂️ {props.name}<br/><span className='font-normal'>{props.date.toString()}</span></span>
    </div>
    } 
    </>
    );
  };
  
  export default TwoWeeksReservationsCell;