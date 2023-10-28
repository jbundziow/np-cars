
type reservationsArrType = {
  day: string,
  isBooked: boolean,
  name: string,
}

interface TwoWeeksReservationsProps {
    reservationsArr:reservationsArrType[]
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


    console.log(props.reservationsArr);
    return (
    <>
        <div className='flex flex-row gap-1 flex-wrap'>
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>czw.</div>
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>pt.</div>
            <div className="flex flex-row gap-1">
            <div className='w-0.5 h-10 bg-warning'></div>
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>sob.</div>
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>ndz.</div>
            <div className='w-0.5 h-10 bg-warning'></div>
            </div>
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>pon.</div>
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>wt.</div>
            <div className="group relative flex justify-center cursor-default">
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-danger flex justify-center items-center cursor-default'>śr.</div>
            <span className="absolute -top-13 md:-top-15 scale-0 transition-all rounded bg-gray-800 p-2 text-xs md:text-sm font-bold text-center text-white group-hover:scale-100 bg-danger w-auto">🙋🏼‍♂️ Grzegorz Brzęczyszczykiewicz</span>
            </div>
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>czw.</div>
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>pt.</div>
            <div className="flex flex-row gap-1">
            <div className='w-0.5 h-10 bg-warning'></div>
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>sob.</div>
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>ndz.</div>
            <div className='w-0.5 h-10 bg-warning'></div>
            </div>
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>pon.</div>
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>wt.</div>
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>śr.</div>
            <div className='w-8 md:w-10 h-8 md:h-10 text-xs md:text-base rounded-xl text-white bg-success flex justify-center items-center cursor-default'>czw.</div>
            
              {/* https://ahmadrosid.com/blog/react-tailwind-tooltip */}
            
        </div>
    </>
    );
  };
  
  export default TwoWeeksReservations;