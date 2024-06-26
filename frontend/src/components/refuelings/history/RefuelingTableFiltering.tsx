import { useState } from "react";
import MultiselectInput from "../../general/input_elements/MultiselectInput";
import { SelectValue , Option } from "react-tailwindcss-select/dist/components/type";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { db_Car_basic, db_User } from "../../../types/db_types";




type RefuelingTableFilteringProps = {
    allCarsBasicData: db_Car_basic[] | [],
    usersData: db_User[] | [],
    filters: string,
    setFilters: Function
    setCurrentPage: Function
}



const RefuelingTableFiltering = (props: RefuelingTableFilteringProps) => {
    let parsedFilters;
    try {
        parsedFilters = JSON.parse(decodeURIComponent(props.filters));
    } catch (error) {
        parsedFilters = null;
    }


   

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



    const [selectedCars, setSelectedCars] = useState<SelectValue>(parsedFilters?.carIDs?.map((id: number) => carOptions.find((car: Option) => Number(car.value) === id) || null).filter((car: Option | null) => car !== null));
    const [selectedUserIDs, setSelectedUserIDs] = useState<SelectValue>(parsedFilters?.userIDs?.map((id: number) => userOptions.find((user: Option) => Number(user.value) === id) || null).filter((user: Option | null) => user !== null));
    const [refuelingDatesRange, setRefuelingDatesRange] = useState<DateValueType>(parsedFilters?.refuelingDateRange_from && parsedFilters?.refuelingDateRange_to ? {startDate: new Date(parsedFilters.refuelingDateRange_from), endDate: new Date(parsedFilters.refuelingDateRange_to)} : null);
    const [carMileage_FROM, setCarMileage_FROM] = useState<number | ''>(parsedFilters?.carMileage_from || '');
    const [carMileage_TO, setCarMileage_TO] = useState<number | ''>(parsedFilters?.carMileage_to || '');
    const [numberOfLiters_FROM, setNumberOfLiters_FROM] = useState<number | ''>(parsedFilters?.numberOfLiters_from || '');
    const [numberOfLiters_TO, setNumberOfLiters_TO] = useState<number | ''>(parsedFilters?.numberOfLiters_to || '');
    const [averageConsumption_FROM, setAverageConsumption_FROM] = useState<number | ''>(parsedFilters?.averageConsumption_from || '');
    const [averageConsumption_TO, setAverageConsumption_TO] = useState<number | ''>(parsedFilters?.averageConsumption_to || '');
    const [costBrutto_FROM, setCostBrutto_FROM] = useState<number | ''>(parsedFilters?.costBrutto_from || '');
    const [costBrutto_TO, setCostBrutto_TO] = useState<number | ''>(parsedFilters?.costBrutto_to || '');
    const [costPerLiter_FROM, setCostPerLiter_FROM] = useState<number | ''>(parsedFilters?.costPerLiter_from || '');
    const [costPerLiter_TO, setCostPerLiter_TO] = useState<number | ''>(parsedFilters?.costPerLiter_to || '');
    const [isFuelCardUsed, setIsFuelCardUsed] = useState<string>(parsedFilters?.isFuelCardUsed === true ? 'true' : parsedFilters?.isFuelCardUsed === false ? 'false' : '');
    const [moneyReturned, setMoneyReturned] = useState<string>(parsedFilters?.moneyReturned === true ? 'true' : parsedFilters?.moneyReturned === false ? 'false' : '');
    const [invoiceNumber, setInvoiceNumber] = useState<string>(parsedFilters?.invoiceNumber || '');

    const [isAcknowledgedByModerator, setIsAcknowledgedByModerator] = useState<string>(parsedFilters?.isAcknowledgedByModerator === true ? 'true' : parsedFilters?.isAcknowledgedByModerator === false ? 'false' : '');
    const [selectedAcknowledgementModerator, setSelectedAcknowledgementModerator] = useState<SelectValue>(parsedFilters?.isAcknowledgedByModeratorIDs?.map((id: number) => userAdminOptions.find((user: Option) => Number(user.value) === id) || null).filter((user: Option | null) => user !== null));

    const [wasEditedByModerator, setWasEditedByModerator] = useState<string>(parsedFilters?.lastEditedByModerator === true ? 'true' : parsedFilters?.lastEditedByModerator === false ? 'false' : '');
    const [selectedEditorModerator, setSelectedEditorModerator] = useState<SelectValue>(parsedFilters?.lastEditedByModeratorIDs?.map((id: number) => userAdminOptions.find((user: Option) => Number(user.value) === id) || null).filter((user: Option | null) => user !== null));




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

        const acknowledgingModeratorIDs: number[] = [];
        if(selectedAcknowledgementModerator !== null && Array.isArray(selectedAcknowledgementModerator)) {
            selectedAcknowledgementModerator.forEach((obj: Option) => acknowledgingModeratorIDs.push(Number(obj.value)))
        }

        const editingModeratorIDs: number[] = [];
        if(selectedEditorModerator !== null && Array.isArray(selectedEditorModerator)) {
            selectedEditorModerator.forEach((obj: Option) => editingModeratorIDs.push(Number(obj.value)))
        }


        //<select>
        let isFuelCardUsedValue: undefined | boolean;
        if(isFuelCardUsed === 'false') {isFuelCardUsedValue = false}
        else if(isFuelCardUsed === 'true') {isFuelCardUsedValue = true}

        let moneyReturnedValue: undefined | boolean;
        if(moneyReturned === 'false') {moneyReturnedValue = false}
        else if(moneyReturned === 'true') {moneyReturnedValue = true}

        let isAcknowledgedByModeratorValue: undefined | boolean;
        if(isAcknowledgedByModerator === 'false') {isAcknowledgedByModeratorValue = false}
        else if(isAcknowledgedByModerator === 'true') {isAcknowledgedByModeratorValue = true}

        let wasEditedByModeratorValue: undefined | boolean;
        if(wasEditedByModerator === 'false') {wasEditedByModeratorValue = false}
        else if(wasEditedByModerator === 'true') {wasEditedByModeratorValue = true}

        const filtersObj = {
            carIDs: carIDs,
            userIDs: userIDs,
            refuelingDateRange_from: refuelingDatesRange?.startDate,
            refuelingDateRange_to: refuelingDatesRange?.endDate,
            carMileage_from: carMileage_FROM,
            carMileage_to: carMileage_TO,
            numberOfLiters_from: numberOfLiters_FROM,
            numberOfLiters_to: numberOfLiters_TO,
            averageConsumption_from: averageConsumption_FROM,
            averageConsumption_to: averageConsumption_TO,
            costBrutto_from: costBrutto_FROM,
            costBrutto_to: costBrutto_TO,
            costPerLiter_from: costPerLiter_FROM,
            costPerLiter_to: costPerLiter_TO,
            isFuelCardUsed: isFuelCardUsedValue,
            moneyReturned: moneyReturnedValue,
            invoiceNumber: invoiceNumber,
            isAcknowledgedByModerator: isAcknowledgedByModeratorValue,
            isAcknowledgedByModeratorIDs: acknowledgingModeratorIDs,
            lastEditedByModerator: wasEditedByModeratorValue,
            lastEditedByModeratorIDs: editingModeratorIDs,
        }

        const queryString: string = encodeURIComponent(JSON.stringify(filtersObj));

        props.setFilters(queryString);
        props.setCurrentPage(1);
    }



    const resetFilters = () => {
    
        setSelectedCars(null);
        setSelectedUserIDs(null);
        setRefuelingDatesRange(null);
        setCarMileage_FROM('');
        setCarMileage_TO('');
        setNumberOfLiters_FROM('');
        setNumberOfLiters_TO('');
        setAverageConsumption_FROM('');
        setAverageConsumption_TO('');
        setCostBrutto_FROM('');
        setCostBrutto_TO('');
        setCostPerLiter_FROM('');
        setCostPerLiter_TO('');
        setIsFuelCardUsed('');
        setMoneyReturned('');
        setInvoiceNumber('');
        setIsAcknowledgedByModerator('');
        setSelectedAcknowledgementModerator(null);
        setWasEditedByModerator('');
        setSelectedEditorModerator(null);

        
        
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
                    <MultiselectInput isSearchable={true} isMultiple={true} value={selectedCars} setValue={(value: SelectValue) => (setSelectedCars(value))} options={carOptions} />
                    </div>




                    <div className="mx-2 my-5 sm:mx-5">
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Kto zatankował?
                    </label>
                    <MultiselectInput isSearchable={true} isMultiple={true} value={selectedUserIDs} setValue={(value: SelectValue) => (setSelectedUserIDs(value))} options={userOptions} />
                    </div>



                    <div className='mx-2 my-5 sm:mx-5'>
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Data i godzina tankowania
                    </label>
                    <Datepicker
                        i18n={"pl"}
                        separator={"do"}
                        displayFormat={"DD/MM/YYYY"}
                        startWeekOn="mon"
                        value={refuelingDatesRange}
                        onChange={(value: DateValueType) => (setRefuelingDatesRange(value))}
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
                            Przebieg w momencie tankowania [km]:
                        </label>
                        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-10">

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Od:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={carMileage_FROM}
                                onChange={(e)=>(setCarMileage_FROM(Number(e.target.value)))}
                                onKeyDown={(e)=>{
                                    const { key } = e;
                                    if ((key === 'Backspace' || key === 'Delete') && carMileage_FROM === 0) {
                                        setCarMileage_FROM('');
                                      }
                                }}

                            />
                            </div>

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Do:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={carMileage_TO}
                                onChange={(e)=>(setCarMileage_TO(Number(e.target.value)))}
                                onKeyDown={(e)=>{
                                    const { key } = e;
                                    if ((key === 'Backspace' || key === 'Delete') && carMileage_TO === 0) {
                                        setCarMileage_TO('');
                                      }
                                }}
                            />
                            </div>

                        </div>
                    </div>




                    <div className="mx-2 my-5 sm:mx-5">
                        <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                            Ilość zatankowanego paliwa [l]:
                        </label>
                        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-10">

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Od:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={numberOfLiters_FROM}
                                onChange={(e)=>(setNumberOfLiters_FROM(Number(e.target.value)))}
                                onKeyDown={(e)=>{
                                    const { key } = e;
                                    if ((key === 'Backspace' || key === 'Delete') && carMileage_FROM === 0) {
                                        setNumberOfLiters_FROM('');
                                      }
                                }}

                            />
                            </div>

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Do:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={numberOfLiters_TO}
                                onChange={(e)=>(setNumberOfLiters_TO(Number(e.target.value)))}
                                onKeyDown={(e)=>{
                                    const { key } = e;
                                    if ((key === 'Backspace' || key === 'Delete') && numberOfLiters_TO === 0) {
                                        setNumberOfLiters_TO('');
                                      }
                                }}
                            />
                            </div>

                        </div>
                    </div>




                    <div className="mx-2 my-5 sm:mx-5">
                        <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                            Średnie spalanie [l/100km]:
                        </label>
                        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-10">

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Od:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={averageConsumption_FROM}
                                onChange={(e)=>(setAverageConsumption_FROM(Number(e.target.value)))}
                                onKeyDown={(e)=>{
                                    const { key } = e;
                                    if ((key === 'Backspace' || key === 'Delete') && averageConsumption_FROM === 0) {
                                        setAverageConsumption_FROM('');
                                      }
                                }}

                            />
                            </div>

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Do:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={averageConsumption_TO}
                                onChange={(e)=>(setAverageConsumption_TO(Number(e.target.value)))}
                                onKeyDown={(e)=>{
                                    const { key } = e;
                                    if ((key === 'Backspace' || key === 'Delete') && averageConsumption_TO === 0) {
                                        setAverageConsumption_TO('');
                                      }
                                }}
                            />
                            </div>

                        </div>
                    </div>




                    <div className="mx-2 my-5 sm:mx-5">
                        <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                            Całkowita kwota tankowania [zł brutto]:
                        </label>
                        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-10">

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Od:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={costBrutto_FROM}
                                onChange={(e)=>(setCostBrutto_FROM(Number(e.target.value)))}
                                onKeyDown={(e)=>{
                                    const { key } = e;
                                    if ((key === 'Backspace' || key === 'Delete') && costBrutto_FROM === 0) {
                                        setCostBrutto_FROM('');
                                      }
                                }}

                            />
                            </div>

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Do:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={costBrutto_TO}
                                onChange={(e)=>(setCostBrutto_TO(Number(e.target.value)))}
                                onKeyDown={(e)=>{
                                    const { key } = e;
                                    if ((key === 'Backspace' || key === 'Delete') && costBrutto_TO === 0) {
                                        setCostBrutto_TO('');
                                      }
                                }}
                            />
                            </div>

                        </div>
                    </div>





                    <div className="mx-2 my-5 sm:mx-5">
                        <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                            Cena za litr paliwa [zł brutto]:
                        </label>
                        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-10">

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Od:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={costPerLiter_FROM}
                                onChange={(e)=>(setCostPerLiter_FROM(Number(e.target.value)))}
                                onKeyDown={(e)=>{
                                    const { key } = e;
                                    if ((key === 'Backspace' || key === 'Delete') && costPerLiter_FROM === 0) {
                                        setCostPerLiter_FROM('');
                                      }
                                }}

                            />
                            </div>

                            <div className="sm:col-span-1 sm:gap-3 flex flex-row justify-center items-center">
                            <p className="w-1/5 text-black dark:text-white text-xs sm:text-base md:text-sm lg:text-base">Do:</p>
                            <input
                                type="number"
                                placeholder={`...`}
                                className="w-4/5 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 md:px-2 lg:px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base md:text-sm lg:text-base"
                                value={costPerLiter_TO}
                                onChange={(e)=>(setCostPerLiter_TO(Number(e.target.value)))}
                                onKeyDown={(e)=>{
                                    const { key } = e;
                                    if ((key === 'Backspace' || key === 'Delete') && costPerLiter_TO === 0) {
                                        setCostPerLiter_TO('');
                                      }
                                }}
                            />
                            </div>

                        </div>
                    </div>









                </div>

                <div className="col-span-2">



                <div className="mx-2 my-5 sm:mx-5">
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Czy użyto kartę paliwową?:
                    </label>
                    <div className="relative z-1 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#3C50E0" d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z"/>
                        </svg>
                        </span>
                        <select
                        className="relative z-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-13 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary sm:text-base"
                        value={isFuelCardUsed}
                        onChange={(e)=>setIsFuelCardUsed(e.target.value)}
                        >
                        <option value="" selected>Wybierz...</option>
                        <option value="true">Tak</option>
                        <option value="false">Nie</option>
                        </select>
                    </div>
                </div>



                    <div className="mx-2 my-5 sm:mx-5">
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                    Czy zwrócono koszty tankowania?:
                    </label>
                    <div className="relative z-1 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#3C50E0" d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z"/>
                        </svg>
                        </span>
                        <select
                        className="relative z-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-13 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary sm:text-base"
                        value={moneyReturned}
                        onChange={(e)=>setMoneyReturned(e.target.value)}
                        >
                        <option value="" selected>Wybierz...</option>
                        <option value="true">Tak</option>
                        <option value="false">Nie</option>
                        </select>
                    </div>
                    </div>


                

                    <div className='mx-2 my-5 sm:mx-5'>
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Numer faktury:
                    </label>
                    <input
                        type="text"
                        placeholder={`Wpisz cel podróży...`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-base"
                        value={invoiceNumber}
                        onChange={(e)=>setInvoiceNumber(e.target.value)}
                        
                    />
                    </div>



                    
                    <div className="mx-2 my-5 sm:mx-5">
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Tankowanie potwierdzone przez moderatora?:
                    </label>
                    <div className="relative z-1 bg-white dark:bg-form-input">
                        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#3C50E0" d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z"/>
                        </svg>
                        </span>
                        <select
                        className="relative z-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-13 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary sm:text-base"
                        value={isAcknowledgedByModerator}
                        onChange={(e)=>{
                            setIsAcknowledgedByModerator(e.target.value);
                            if(e.target.value === 'false' || e.target.value === '') {
                                setSelectedAcknowledgementModerator(null);
                            }
                        }}
                        >
                        <option value="" selected>Wybierz...</option>
                        <option value="true">Tak</option>
                        <option value="false">Nie</option>
                        </select>
                    </div>
                    </div>

                    
                    <div className={`mx-2 my-5 sm:mx-5 ${isAcknowledgedByModerator === 'true' ? 'visible' : 'invisible'}`}>
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Dane moderatora potwierdzającego tankowanie:
                    </label>
                    <MultiselectInput isSearchable={true} isMultiple={true} value={selectedAcknowledgementModerator} setValue={(value: SelectValue) => (setSelectedAcknowledgementModerator(value))} options={userAdminOptions} />
                    </div>








                    <div className="mx-2 my-5 sm:mx-5">
                    <label className="mb-3 block text-black dark:text-white text-sm sm:text-base">
                        Czy edytowano dane dotyczące tego tankowania przez moderatora?:
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
                                setSelectedEditorModerator(null);
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
                        Dane edytującego moderatora:
                    </label>
                    <MultiselectInput isSearchable={true} isMultiple={true} value={selectedEditorModerator} setValue={(value: SelectValue) => (setSelectedEditorModerator(value))} options={userAdminOptions} />
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