import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS, useState } from "react";
import RentalsHistoryTable from "./RentalsHistoryTable";
import TableFiltering from "./TableFiltering";
import { TECollapse } from "tw-elements-react";

type carBasicData = {
    id: number,
    brand: string,
    model: string,
    imgPath: string,
    availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
  }
  
  type rentalsDataData = {
    id: number,
    carID: number,
    userID: number,
    returnUserID: number,
    lastEditedByModeratorOfID: number,
    carMileageBefore: number,
    carMileageAfter: number | null,
    distance: number | null,
    travelDestination: string | null,
    placeID: number | null,
    dateFrom: Date,
    dateTo: Date | null,
  }

type RentalsHistoryProps = {
    rentalsData: rentalsDataData[],
    allCarsBasicData: carBasicData[],
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
                    className="!mt-0 !rounded-b-none !shadow-none"
                >
                    <div>
                        <TableFiltering/>
                    </div>
                </TECollapse>
                </div>
            </div>
            <RentalsHistoryTable rentalsData={props.rentalsData} allCarsBasicData={props.allCarsBasicData}/>
        </div>
        </>
    )
  };
  
  export default RentalsHistory;