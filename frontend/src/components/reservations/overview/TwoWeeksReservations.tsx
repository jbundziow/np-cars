import TwoWeeksReservationsCell from "./TwoWeeksReservationsCell";

type twoWeeksDataArrType = {
  day: 'pon.' | 'wt.' | 'śr.' | 'czw.' | 'pt.' | 'sob.' | 'ndz.',
  isBooked: boolean,
  name: string,
}

interface TwoWeeksReservationsProps {
    twoWeeksData:twoWeeksDataArrType[]
  }

const TwoWeeksReservations = (props: TwoWeeksReservationsProps) => {


    // const getDaysOfNextTwoWeeks = (): string[] => {
    //     const daysOfWeek = ['ndz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'];
    //     const today = new Date().getDay(); //(0=sunday, 1=monday, ...)
      
    //     const resultArray: string[] = [];
    //     for (let i = 0; i < 14; i++) {
    //       const day = daysOfWeek[(today + i) % 7];
    //       resultArray.push(day);
    //     }
      
    //     return resultArray;
    //   }

    //   const daysOfWeek = getDaysOfNextTwoWeeks();
    //   console.log(daysOfWeek);


   
    return (
    <>
        <div className='flex flex-row gap-1 flex-wrap'>
            {props.twoWeeksData.map(item => {
              if(item.day === 'sob.') {
                return <div className="flex flex-row gap-1">
                       <div className='w-0.5 h-10 bg-warning'></div>
                       <TwoWeeksReservationsCell day={item.day} isBooked={item.isBooked} name={item.name}/>
                       </div>
              }
              else if(item.day === 'ndz.') {
                return <div className="flex flex-row gap-1">
                       <TwoWeeksReservationsCell day={item.day} isBooked={item.isBooked} name={item.name}/>
                       <div className='w-0.5 h-10 bg-warning'></div>
                       </div>
              }
              else {
                return <TwoWeeksReservationsCell day={item.day} isBooked={item.isBooked} name={item.name}/>
              }
            })}
            
        </div>
    </>
    );
  };
  
  export default TwoWeeksReservations;