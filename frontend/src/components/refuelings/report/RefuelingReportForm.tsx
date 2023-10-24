
interface RefuelingReportFormProps {
    carID: number;
    carFullname: string;
    carImg: string;
}

const RefuelingReportForm = (props: RefuelingReportFormProps) => {


    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
  
          <div className='p-5 pt-0'>
          <img src={props.carImg} alt="Zdjęcie samochodu" className='w-full border-2 rounded-md'/>
          <p className='text-black dark:text-white pb-2 text-lg'>{props.carFullname}</p>
          </div>

          
            <div className='col-span-3'>
            
              <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
                  <form>
                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Przebieg podczas tankowania [km]:
                      </label>
                      <input
                        required
                        type="number"
                        placeholder=""
                        min='0'
                        max='999999'
                        step='1'
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Ilość zatankowanego paliwa [litry]:
                      </label>
                      <input
                        required
                        type="number"
                        placeholder=""
                        min='0'
                        max='200'
                        step='0.01'
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className='mb-4'>
                      <label className="mb-3 block text-black dark:text-white">
                        Zapłacona kwota brutto [zł]:
                      </label>
                      <input
                        required
                        type="number"
                        placeholder=""
                        min='0'
                        max='2000'
                        step='0.01'
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    
                <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                  Czy użyto karty Orlen Mikroflota?
                </label>
                <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path fill="#3C50E0" d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"/></svg>
                  </span>
                  <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                    <option value="true">Tak</option>
                    <option value="false">Nie</option>
                  </select>
                  {/* <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2"> */}
                    {/* <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg> */}
                  {/* </span> */}
                </div>
                
              </div>


                    

                    <div className='flex justify-center mb-4'>
                    <button className="flex w-90 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='submit'>
                        Zapisz
                      </button>
                      
                    </div>
                  </form>
              </div>
              
            </div>
         
        </div>
        
        </>
    );
  };
  
  export default RefuelingReportForm;