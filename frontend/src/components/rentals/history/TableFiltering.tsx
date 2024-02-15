import MultiselectInput from "../../general/input_elements/MultiselectInput";

type TableFilteringProps = {
  
}


const TableFiltering = (props: TableFilteringProps) => {


    return (
      <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
        <form>  
            <div className='mb-5'>
            <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                Przebieg końcowy:
            </label>
            <input
                required
                type="number"
                placeholder={`Wpisz stan licznika na koniec podróży`}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base"
                value={1}
                
            />
            </div>

            <div className='mb-5'>
            <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                Cel podróży:
            </label>
            <input
                required
                type="text"
                placeholder={`np. "Marba Racula"`}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base"
                value={'sd'}
                
            />
            </div>

            <div className="mb-5">
            <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                Multiselect:
            </label>
            <MultiselectInput/>
            
            </div>
          
            

            <div className='flex justify-center mb-2'>
            <button className="flex w-90 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90 text-xs sm:text-base" type='submit'>
                Filtruj wyniki
            </button>
            </div>
        </form>
      </div>
    );
  };
  
  export default TableFiltering;