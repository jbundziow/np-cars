import { useState } from "react";
import { TECollapse } from "tw-elements-react";
import { Link } from "react-router-dom";

type faultsDataArr = {
  id: number,
  title: string,
}

interface FaultsStatusDetailsAccordionProps {
  pending: faultsDataArr[],
  accepted: faultsDataArr[],
  finished: faultsDataArr[],
  cancelled: faultsDataArr[]
}

export default function FaultsStatusDetailsAccordion(props: FaultsStatusDetailsAccordionProps): JSX.Element {
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
      <div id="accordionExample">
        <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
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
              <span className='border py-1 px-2 mr-2 text-md font-bold rounded-lg'>{props.pending.length}</span>&nbsp;Usterki oczekujące na akceptację przez moderatora
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
            <div className="flex flex-col items-start px-5 py-4 text-black dark:text-white">
              {props.pending.length > 0 ?
              props.pending.map(fault => <Link to={`/usterki/${fault.id}`} className='underline decoration-[0.5px] text-md sm:text-lg pl-0 p-1 my-1 hover:text-primary transition ease-in-out delay-100'>{fault.title}</Link>)
              :
              <p className='py-2 md:py-4'>Brak usterek do wyświetlenia. 🤔</p>
              }
            </div>
          </TECollapse>
        </div>
      </div>
      <div className="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <h2 className="mb-0" id="headingTwo">
          <button
            className={`${
                activeElement === "element2" &&
                `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
              } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-sm font-bold sm:text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
            type="button"
            onClick={() => handleClick("element2")}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <span className='border py-1 px-2 mr-2 text-md font-bold rounded-lg'>{props.accepted.length}</span>&nbsp;Usterki zaakceptowane przez moderatora
            <span
              className={`${
                activeElement === "element2"
                  ? `rotate-[-180deg] -mr-1`
                  : `rotate-0 fill-[#212529] dark:fill-white`
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
          show={activeElement === "element2"}
          className="!mt-0 !rounded-b-none !shadow-none"
        >
          <div className="flex flex-col items-start px-5 py-4 text-black dark:text-white">
            {props.accepted.length > 0 ?
            props.accepted.map(fault => <Link to={`/usterki/${fault.id}`} className='underline decoration-[0.5px] text-md sm:text-lg pl-0 p-1 my-1 hover:text-primary transition ease-in-out delay-100'>{fault.title}</Link>)
            :
            <p className='py-2 md:py-4'>Brak usterek do wyświetlenia. 🤔</p>
            }
            </div>
        </TECollapse>
      </div>
      <div className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <h2 className="accordion-header mb-0" id="headingThree">
          <button
            className={`${
                activeElement === "element3" &&
                `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
              } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-sm font-bold sm:text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
            type="button"
            onClick={() => handleClick("element3")}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <span className='border py-1 px-2 mr-2 text-md font-bold rounded-lg'>{props.finished.length}</span>&nbsp;Rozwiązane usterki
            <span
              className={`${
                activeElement === "element3"
                  ? `rotate-[-180deg] -mr-1`
                  : `rotate-0 fill-[#212529] dark:fill-white`
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
          show={activeElement === "element3"}
          className="!mt-0 !shadow-none"
        >
          <div className="flex flex-col items-start px-5 py-4 text-black dark:text-white">
              {props.finished.length > 0 ?
              props.finished.map(fault => <Link to={`/usterki/${fault.id}`} className='underline decoration-[0.5px] text-md sm:text-lg pl-0 p-1 my-1 hover:text-primary transition ease-in-out delay-100'>{fault.title}</Link>)
              :
              <p className='py-2 md:py-4'>Brak usterek do wyświetlenia. 🤔</p>
              }
            </div>
        </TECollapse>
      </div>
      
    </>
  );
}