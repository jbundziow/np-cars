
interface FaultsStatusCardCounterProps {
    amount: number,
    text: string
}

const FaultsStatusCardCounter = (props: FaultsStatusCardCounterProps) => {
    return (
        <>
        <div className='flex flex-col items-center bg-bodydark1 dark:bg-black p-2 rounded-md'>
          <p className='text-2xl xl:text-3xl font-bold text-black dark:text-white'>{props.amount}</p>
          <p className='text-xs xl:text-sm break-all text-black dark:text-inherit'>{props.text}</p>
        </div>
        </>
    );
  };
  
  export default FaultsStatusCardCounter;
