import { useState } from "react";




type PlacesTableFilteringProps = {
    setFilters: Function
    setCurrentPage: Function
}



const PlacesTableFiltering = (props: PlacesTableFilteringProps) => {

    const [projectCode, setProjectCode] = useState<string>('');
    const [placeName, setPlaceName] = useState<string>('');
    const [projectName, setProjectName] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    
    






    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        //<select>
        let finalStatus: string | null = status;
        if(status === '') {finalStatus = null}

        const filtersObj = {
            projectCode: projectCode,
            placeName: placeName,
            projectName: projectName,
            status: finalStatus,
        }

        const queryString: string = encodeURIComponent(JSON.stringify(filtersObj));

        props.setFilters(queryString);
        props.setCurrentPage(1);
    }



    const resetFilters = () => {
    
        setProjectCode('');
        setPlaceName('');
        setProjectName('');
        setStatus('');
        
        props.setFilters(null);
        props.setCurrentPage(1);
    }

    return (
      <div className="rounded-lg bg-white dark:bg-neutral-800 p-2 text-black dark:text-white">
        <form onSubmit={formSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
                <div className="col-span-2">


                    
                <div className='mx-2 my-5 sm:mx-5'>
                <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                    Kod projektu:
                </label>
                <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base"
                    value={projectCode}
                    onChange={(e)=>setProjectCode(e.target.value)}
                    
                />
                </div>





                <div className='mx-2 my-5 sm:mx-5'>
                <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                    Lokalizacja:
                </label>
                <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base"
                    value={placeName}
                    onChange={(e)=>setPlaceName(e.target.value)}
                    
                />
                </div>




                </div>

                <div className="col-span-2">





                <div className='mx-2 my-5 sm:mx-5'>
                <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                    Pełna nazwa:
                </label>
                <input
                    type="text"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base"
                    value={projectName}
                    onChange={(e)=>setProjectName(e.target.value)}
                    
                />
                </div>








                <div className="mx-2 my-5 sm:mx-5">
                <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                    Status:
                </label>
                <div className="relative z-1 bg-white dark:bg-form-input">
                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#3C50E0" d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z"/>
                    </svg>
                    </span>
                    <select
                    className="relative z-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-13 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary sm:text-base"
                    value={status}
                    onChange={(e)=>setStatus(e.target.value)}
                    >
                    <option value="" selected>Wybierz...</option>
                    <option value="active">Aktywny</option>
                    <option value="closed">Nieaktywny</option>
                    <option value="banned">Zbanowany</option>
                    </select>
                </div>
                </div>




                
                    
                    <div className="mx-2 mt-14 mb-5 sm:mx-5">
                    <div className='flex flex-col items-center gap-5 lg:flex-row lg:justify-around mb-2'>
                    <button
                    className="flex w-full lg:w-[30%] justify-center rounded bg-danger p-3 font-medium text-gray hover:opacity-90 sm:text-base"
                    onClick={resetFilters}
                    type='reset'
                    >
                        Reset
                    </button>
                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90 sm:text-base" type='submit'>
                        Filtruj wyniki
                    </button>
                    </div>
                    </div>


                </div>
            </div>
            
        </form>
      </div>
    );
  };
  
  export default PlacesTableFiltering;