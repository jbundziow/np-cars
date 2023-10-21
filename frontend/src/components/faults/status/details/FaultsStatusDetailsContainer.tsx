import FaultsStatusDetailsAccordion from "./FaultsStatusDetailsAccordion";


const FaultsStatusDetailsContainer = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">

        <div className='p-5 pt-0'>
        <img src={'https://upload.wikimedia.org/wikipedia/commons/2/2f/Mercedes_sprinter_1_v_sst.jpg'} alt="Product" className='w-full border-2 rounded-md'/>
        <p className='text-black dark:text-white pb-2 text-lg'>{'Mercedes'} {'Sprinter'}</p>
        </div>

        <div className='col-span-3'>
        <FaultsStatusDetailsAccordion/>
        </div>

      </div>
      
    );
  };
  
  export default FaultsStatusDetailsContainer;
  