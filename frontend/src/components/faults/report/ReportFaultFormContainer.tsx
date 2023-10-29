
type dataSchema = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged',
}

interface ReportFaultFormContainerProps {
    data: dataSchema;
}

const ReportFaultFormContainer = (props: ReportFaultFormContainerProps) => {
    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
  
          <div className='p-5 pt-0'>
          <img src={props.data.imgPath} alt="Zdjęcie samochodu" className='w-full border-2 rounded-md'/>
          <p className='text-black dark:text-white pb-2 text-lg'>{props.data.brand}&nbsp;{props.data.model}</p>
          </div>

          
            <div className='col-span-3'>
            
              <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
                  <form>
                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Tytuł usterki:
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Wpisz krótki tytuł usterki"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Szczegółowy opis usterki:
                      </label>
                      <textarea
                        required
                        rows={6}
                        placeholder="Opisz szczegółowo na czym polega problem"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      ></textarea>
                    </div>

                    <div className='flex justify-center mb-2'>
                    <button className="flex w-90 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='submit'>
                        Dodaj nową usterkę
                      </button>
                    </div>
                  </form>
              </div>
              
            </div>
         
        </div>
        
        </>
    );
  };
  
  export default ReportFaultFormContainer;