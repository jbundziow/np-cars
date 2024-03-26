import { useState } from "react";
import RentalsHistoryTable from "./RentalsHistoryTable";
import RentalTableFiltering from "./RentalTableFiltering";
import { TECollapse } from "tw-elements-react";
import { db_Car_basic, db_Place, db_Rental, db_User } from "../../../types/db_types";
import { PaginationType } from "../../../types/common";
import Loader from "../../../common/Loader";
import GenerateRentalExcel from "./GenerateRentalExcel";
import TableSorting from "../../general/input_elements/TableSorting";



type RentalsHistoryProps = {
    rentalsData: db_Rental[] | [],
    allCarsBasicData: db_Car_basic[] | [],
    usersData: db_User[] | [],
    placesData: db_Place[] | [],
    setFilters: Function,
    setCurrentPage: (pageNumber: number) => void,
    paginationData: PaginationType,
    totalDistance: number,
    loadingTable: boolean,
    filters: string,

    setSortBy: Function,
    sortBy: string,
    setSortOrder: Function,
    sortOrder: string,
    setPageSize: Function,
    pageSize: number,
  }

const RentalsHistory = (props: RentalsHistoryProps) => {


 

    const [activeElement, setActiveElement] = useState("");

    const handleClick = (value: string) => {
      if (value === activeElement) {
        setActiveElement("");
      } else {
        setActiveElement(value);
      }
    };

    

    return (
        <>
        <div className="bg-white dark:bg-boxdark">
            <div className="flex justify-center">
                <div className="w-full rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 m-2 md:m-5">
                <h2 className="mb-0" id="headingOne">
                    <button
                    className={`${
                        activeElement === "element1" &&
                        `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                    } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-sm font-bold sm:text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                    type="button"
                    onClick={() => handleClick("element1")}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    >
                    <span className='py-1 px-2 mr-2 text-md font-bold'>{'🔎'}</span>&nbsp;Filtrowanie danych
                    <span
                        className={`${
                        activeElement === "element1"
                            ? `rotate-[-180deg] -mr-1`
                            : `rotate-0 fill-[#212529]  dark:fill-white`
                        } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                        </svg>
                    </span>
                    </button>
                </h2>
                <TECollapse
                    show={activeElement === "element1"}
                    className="!mt-0 !rounded-b-none !shadow-none !overflow-visible"
                >
                    <div>
                        <RentalTableFiltering allCarsBasicData={props.allCarsBasicData} usersData={props.usersData} placesData={props.placesData} setFilters={(val: string) => props.setFilters(val)} filters={props.filters} setCurrentPage={(value: number) => props.setCurrentPage(value)}/>
                    </div>
                </TECollapse>
                </div>
            </div>
            {props.loadingTable ? <Loader/> :
            <>

            <div className="px-5 pt-6 pb-6 sm:px-7.5">
                <TableSorting sortOptions={[{value: "createdAt", label: "Data utworzenia"}, {value: "updatedAt", label: "Data ostatniej edycji"}, {value: "dateFrom", label: "Data wypożyczenia od"}, {value: "dateTo", label: "Data wypożyczenia do"}, {value: "carMileageBefore", label: "Przebieg od"}, {value: "carMileageAfter", label: "Przebieg do"}, {value: "distance", label: "Dystans"}, {value: "travelDestination", label: "Cel podróży"}, {value: "id", label: "ID wypożyczenia"}, {value: "carID", label: "ID samochodu"}, {value: "userID", label: "ID wypożyczającego"}, {value: "returnUserID", label: "ID zwracającego"},{value: "placeID", label: "ID projektu"}, {value: "lastEditedByModeratorOfID", label: "ID moderatora"}]} setSortBy={(value: string)=> props.setSortBy(value)} sortBy={props.sortBy} setSortOrder={(value: string)=> props.setSortOrder(value)} sortOrder={props.sortOrder} setPageSize={(value: number) => props.setPageSize(value)} pageSize={props.pageSize} setCurrentPage={(value: number) => props.setCurrentPage(value)}/>
            </div>

            <RentalsHistoryTable rentalsData={props.rentalsData} allCarsBasicData={props.allCarsBasicData} usersData={props.usersData} placesData={props.placesData} setCurrentPage={(value: number) => props.setCurrentPage(value)} paginationData={props.paginationData} totalDistance={props.totalDistance}/>

            <GenerateRentalExcel filters={props.filters} sortBy={props.sortBy} sortOrder={props.sortOrder}/>

            </>
            }
        </div>
        </>
    )
  };
  
  export default RentalsHistory;