import { useState } from "react";
import MultiselectInput from "../../general/input_elements/MultiselectInput";
import { SelectValue , Option } from "react-tailwindcss-select/dist/components/type";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import formatDate from "../../../utilities/formatDate";

type TableFilteringProps = {
  
}



const TableFiltering = (props: TableFilteringProps) => {

    const [selectedCars, setSelectedCars] = useState<SelectValue>(null);
    const [rentalDateFrom, setRentalDateFrom] = useState<DateValueType>(null);
    const [rentalDateTo, setRentalDateTo] = useState<DateValueType>(null);
    const [carMileageBefore_FROM, setCarMileageBefore_FROM] = useState<number | undefined>(undefined);
    const [carMileageBefore_TO, setCarMileageBefore_TO] = useState<number | undefined>(undefined);
    const [carMileageAfter_FROM, setCarMileageAfter_FROM] = useState<number | undefined>(undefined);
    const [carMileageAfter_TO, setCarMileageAfter_TO] = useState<number | undefined>(undefined);
    const [distance_FROM, setDistance_FROM] = useState<number | undefined>(undefined);
    const [distance_TO, setDistance_TO] = useState<number | undefined>(undefined);
    const [travelDestination, setTravelDestination] = useState<string>('');
    const [selectedReturnedByUser, setSelectedReturnedByUser] = useState<SelectValue>(null);
    const [acknowledgedByModerator, setAcknowledgedByModerator] = useState<string>('');
    const [selectedPlace, setSelectedPlace] = useState<SelectValue>(null);

    const carOptions = [
        { value: "11", label: "Citroen C4" },
        { value: "22", label: "Mercedes Sprinter"},
        { value: "33", label: "Ford Focus" }
    ];

    const userOptions = [
        { value: "1", label: "Tomasz Kit" },
        { value: "2", label: "Marlena Kulka"},
        { value: "3", label: "Andrzej Topek" }
    ];

    const placeOptions = [
        { value: "1", label: "123/23/GB" },
        { value: "2", label: "99/24"},
        { value: "3", label: "052/11" }
    ];




    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const carIDs: number[] = [];
        if(selectedCars !== null && Array.isArray(selectedCars)) {
            selectedCars.forEach((obj: Option) => carIDs.push(Number(obj.value)))
        }

        const returnUserIDs: number[] = [];
        if(selectedReturnedByUser !== null && Array.isArray(selectedReturnedByUser)) {
            selectedReturnedByUser.forEach((obj: Option) => returnUserIDs.push(Number(obj.value)))
        }

        const placeIDs: number[] = [];
        if(selectedPlace !== null && Array.isArray(selectedPlace)) {
            selectedPlace.forEach((obj: Option) => placeIDs.push(Number(obj.value)))
        }

        //<select>
        let acknowledgedByModeratorValue: undefined | boolean;
        if(acknowledgedByModerator === 'false') {acknowledgedByModeratorValue = false}
        else if(acknowledgedByModerator === 'true') {acknowledgedByModeratorValue = true}

        const filtersObj = {
            carIDs: carIDs,
            returnUserIDs: returnUserIDs,
            placeIDs: placeIDs,
            editedByModerator: acknowledgedByModeratorValue,
            carMileageBefore: {
                from: carMileageBefore_FROM,
                to: carMileageBefore_TO
            },
            carMileageAfter: {
                from: carMileageAfter_FROM,
                to: carMileageAfter_TO
            },
            distance: {
                from: distance_FROM,
                to: distance_TO
            },
            travelDestination: travelDestination,
            dateFrom: {
                from: rentalDateFrom?.startDate,
                to: rentalDateFrom?.endDate
            },
            dateTo: {
                from: rentalDateTo?.startDate,
                to: rentalDateTo?.endDate
            },



        }

        console.log(filtersObj);
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


                    <div className='mx-2 my-5 sm:mx-5'>
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Data wypożyczenia:
                    </label>
                    <Datepicker
                        i18n={"pl"}
                        separator={"do"}
                        displayFormat={"DD/MM/YYYY"}
                        startWeekOn="mon"
                        value={rentalDateFrom}
                        onChange={(value: DateValueType) => (setRentalDateFrom(value))}
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


                    <div className='mx-2 my-5 sm:mx-5'>
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Data zwrotu:
                    </label>
                    <Datepicker
                        i18n={"pl"}
                        separator={"do"}
                        displayFormat={"DD/MM/YYYY"}
                        startWeekOn="mon"
                        value={rentalDateTo}
                        onChange={(value: DateValueType) => (setRentalDateTo(value))}
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


                    <div className="mx-2 my-5 sm:mx-5">
                        <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                            Przebieg początkowy [km]:
                        </label>
                        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-10">

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Od:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={carMileageBefore_FROM}
                                onChange={(e)=>(setCarMileageBefore_FROM(Number(e.target.value)))}
                            />
                            </div>

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Do:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={carMileageBefore_TO}
                                onChange={(e)=>(setCarMileageBefore_TO(Number(e.target.value)))}
                            />
                            </div>

                        </div>
                    </div>



                    <div className="mx-2 my-5 sm:mx-5">
                        <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                            Przebieg końcowy [km]:
                        </label>
                        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-10">

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Od:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={carMileageAfter_FROM}
                                onChange={(e)=>(setCarMileageAfter_FROM(Number(e.target.value)))}
                            />
                            </div>

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Do:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={carMileageAfter_TO}
                                onChange={(e)=>(setCarMileageAfter_TO(Number(e.target.value)))}
                            />
                            </div>

                        </div>
                    </div>


                </div>

                <div className="col-span-2">


                <div className="mx-2 my-5 sm:mx-5">
                        <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                            Przejechany dystans [km]:
                        </label>
                        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-10">

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Od:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={distance_FROM}
                                onChange={(e)=>(setDistance_FROM(Number(e.target.value)))}
                            />
                            </div>

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Do:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={distance_TO}
                                onChange={(e)=>(setDistance_TO(Number(e.target.value)))}
                            />
                            </div>

                        </div>
                    </div>



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
                        Zwrócone przez użytkownika:
                    </label>
                    <MultiselectInput isSearchable={true} value={selectedReturnedByUser} setValue={(value: SelectValue) => (setSelectedReturnedByUser(value))} options={userOptions} />
                    </div>


                    <div className="mx-2 my-5 sm:mx-5">
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Zatwierdzone przez moderatora:
                    </label>
                    <div className="relative z-1 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#3C50E0" d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z"/>
                        </svg>
                        </span>
                        <select
                        className="relative z-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-13 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary sm:text-base"
                        value={acknowledgedByModerator}
                        onChange={(e)=>setAcknowledgedByModerator(e.target.value)}
                        >
                        <option value="" selected>Wybierz...</option>
                        <option value="true">Tak</option>
                        <option value="false">Nie</option>
                        </select>
                    </div>
                    </div>


                    <div className="mx-2 my-5 sm:mx-5">
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Przypisany numer projektu:
                    </label>
                    <MultiselectInput isSearchable={true} value={selectedPlace} setValue={(value: SelectValue) => (setSelectedPlace(value))} options={placeOptions} />
                    </div>
                
                    
                    <div className="mx-2 mt-14 mb-5 sm:mx-5">
                    <div className='flex justify-center mb-2'>
                    <button className="flex w-[90%] justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90 sm:text-base" type='submit'>
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
  
  export default TableFiltering;