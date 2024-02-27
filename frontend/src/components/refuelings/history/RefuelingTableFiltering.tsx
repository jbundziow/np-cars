import { useState } from "react";
import MultiselectInput from "../../general/input_elements/MultiselectInput";
import { SelectValue , Option } from "react-tailwindcss-select/dist/components/type";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { db_Car_basic, db_User } from "../../../types/db_types";




type RefuelingTableFilteringProps = {
    allCarsBasicData: db_Car_basic[] | [],
    usersData: db_User[] | [],
    setFilters: Function
    setCurrentPage: Function
}



const RefuelingTableFiltering = (props: RefuelingTableFilteringProps) => {

    const [selectedCars, setSelectedCars] = useState<SelectValue>(null);
    const [selectedUserIDs, setSelectedUserIDs] = useState<SelectValue>(null);
    const [refuelingDatesRange, setRefuelingDatesRange] = useState<DateValueType>(null);
    const [carMileage_FROM, setCarMileage_FROM] = useState<number | ''>('');
    const [carMileage_TO, setCarMileage_TO] = useState<number | ''>('');
    const [numberOfLiters_FROM, setNumberOfLiters_FROM] = useState<number | ''>('');
    const [numberOfLiters_TO, setNumberOfLiters_TO] = useState<number | ''>('');
    const [averageConsumption_FROM, setAverageConsumption_FROM] = useState<number | ''>('');
    const [averageConsumption_TO, setAverageConsumption_TO] = useState<number | ''>('');
    const [costBrutto_FROM, setCostBrutto_FROM] = useState<number | ''>('');
    const [costBrutto_TO, setCostBrutto_TO] = useState<number | ''>('');
    const [costPerLiter_FROM, setCostPerLiter_FROM] = useState<number | ''>('');
    const [costPerLiter_TO, setCostPerLiter_TO] = useState<number | ''>('');
    const [isFuelCardUsed, setIsFuelCardUsed] = useState<string>('');
    const [moneyReturned, setMoneyReturned] = useState<string>('');
    const [invoiceNumber, setInvoiceNumber] = useState<string>('');
    const [isAcknowledgedByModerator, setIsAcknowledgedByModerator] = useState<string>('');

    const [wasAcknowledgedByModerator, setWasAcknowledgedByModerator] = useState<string>('');
    const [selectedAcknowledgementModerator, setSelectedAcknowledgementModerator] = useState<SelectValue>(null);

    const [wasEditedByModerator, setWasEditedByModerator] = useState<string>('');
    const [selectedEditorModerator, setSelectedEditorModerator] = useState<SelectValue>(null);


    //FINISHED HERE

    const carOptions = props.allCarsBasicData.map(car => ({
        value: car.id.toString(),
        label: `${car.brand} ${car.model}`
      }));

    const userOptions = props.usersData.map(user => ({
        value: user.id.toString(),
        label: `${user.name} ${user.surname}`
    }));

    const userAdminOptions = props.usersData
        .filter(user => user.role === 'admin')
        .map(user => ({
            value: user.id.toString(),
            label: `${user.name} ${user.surname}`
        }));




    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const carIDs: number[] = [];
        if(selectedCars !== null && Array.isArray(selectedCars)) {
            selectedCars.forEach((obj: Option) => carIDs.push(Number(obj.value)))
        }

        const userIDs: number[] = [];
        if(selectedUserIDs !== null && Array.isArray(selectedUserIDs)) {
            selectedUserIDs.forEach((obj: Option) => userIDs.push(Number(obj.value)))
        }

        const adminUserIDs: number[] = [];
        if(selectedModerator !== null && Array.isArray(selectedModerator)) {
            selectedModerator.forEach((obj: Option) => adminUserIDs.push(Number(obj.value)))
        }


        //<select>
        let wasEditedByModeratorValue: undefined | boolean;
        if(wasEditedByModerator === 'false') {wasEditedByModeratorValue = false}
        else if(wasEditedByModerator === 'true') {wasEditedByModeratorValue = true}

        const filtersObj = {
            carIDs: carIDs,
            userIDs: userIDs,
            reservationDatesRange_from: reservationDatesRange?.startDate,
            reservationDatesRange_to: reservationDatesRange?.endDate,
            travelDestination: travelDestination,
            wasEditedByModerator: wasEditedByModeratorValue,
            moderatorIDs: adminUserIDs,
        }

        const queryString: string = encodeURIComponent(JSON.stringify(filtersObj));

        props.setFilters(queryString);
        props.setCurrentPage(1);
    }



    const resetFilters = () => {
    
        setSelectedCars(null);
        setSelectedUserIDs(null);
        setReservationDatesRange(null)
        setTravelDestination('');
        setWasEditedByModerator('');
        setSelectedModerator(null);
        
        props.setFilters(null);
        props.setCurrentPage(1);
    }

    return (
      <div className="rounded-lg bg-white dark:bg-neutral-800 p-2 text-black dark:text-white">
        <form onSubmit={formSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
                <div className="col-span-2">


                    <div className="mx-2 my-5 sm:mx-5">
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Samochód:
                    </label>
                    <MultiselectInput isSearchable={true} value={selectedCars} setValue={(value: SelectValue) => (setSelectedCars(value))} options={carOptions} />
                    </div>



                    <div className="mx-2 my-5 sm:mx-5">
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Właściciel rezerwacji:
                    </label>
                    <MultiselectInput isSearchable={true} value={selectedUserIDs} setValue={(value: SelectValue) => (setSelectedUserIDs(value))} options={userOptions} />
                    </div>



                    <div className='mx-2 my-5 sm:mx-5'>
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Zakres dat rezerwacji:
                    </label>
                    <Datepicker
                        i18n={"pl"}
                        separator={"do"}
                        displayFormat={"DD/MM/YYYY"}
                        startWeekOn="mon"
                        value={reservationDatesRange}
                        onChange={(value: DateValueType) => (setReservationDatesRange(value))}
                        inputClassName="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base" 

                        showShortcuts={false}
                        showFooter={false}
                        configs={{footer: {
                          cancel: "Anuluj", 
                          apply: "Potwierdź" 
                          }
                        }}
                        />
                    </div>




                </div>

                <div className="col-span-2">






                    <div className='mx-2 my-5 sm:mx-5'>
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Cel podróży:
                    </label>
                    <input
                        type="text"
                        placeholder={`Wpisz cel podróży...`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base"
                        value={travelDestination}
                        onChange={(e)=>setTravelDestination(e.target.value)}
                        
                    />
                    </div>


                    <div className="mx-2 my-5 sm:mx-5">
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Edytowane przez moderatora:
                    </label>
                    <div className="relative z-1 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#3C50E0" d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z"/>
                        </svg>
                        </span>
                        <select
                        className="relative z-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-13 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary sm:text-base"
                        value={wasEditedByModerator}
                        onChange={(e)=>{
                            setWasEditedByModerator(e.target.value);
                            if(e.target.value === 'false' || e.target.value === '') {
                                setSelectedModerator(null);
                            }
                        }}
                        >
                        <option value="" selected>Wybierz...</option>
                        <option value="true">Tak</option>
                        <option value="false">Nie</option>
                        </select>
                    </div>
                    </div>

                    
                    <div className={`mx-2 my-5 sm:mx-5 ${wasEditedByModerator === 'true' ? 'visible' : 'invisible'}`}>
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Dane moderatora:
                    </label>
                    <MultiselectInput isSearchable={true} value={selectedModerator} setValue={(value: SelectValue) => (setSelectedModerator(value))} options={userAdminOptions} />
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
  
  export default RefuelingTableFiltering;