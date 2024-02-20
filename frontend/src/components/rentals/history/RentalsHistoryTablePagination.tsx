// "pagination": {
//   "totalCount": 1,
//   "totalPages": 1,
//   "currentPage": 1,
//   "hasPreviousPage": false,
//   "hasNextPage": false
// }

type pagination = {
  totalCount: number,
  totalPages: number,
  currentPage: number,
  hasPreviousPage: boolean,
  hasNextPage: boolean,
}


type RentalsHistoryTablePaginationProps = {
  // setCurrentPage: Function
}


const RentalsHistoryTablePagination = (props: RentalsHistoryTablePaginationProps) => {




    return (
        <nav aria-label="Page navigation" className="flex justify-center">
        <ul className="list-style-none flex">


            <li>
              <button
                className="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-500 transition-all duration-300 dark:text-neutral-400"
                >Poprzednia
              </button>
            </li>


            <li>
              <button
                className="relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                >1
              </button>
            </li>


            <li>
              <button
                className="relative block rounded bg-primary-100 px-3 py-1.5 text-md font-medium text-primary-700 transition-all duration-300 cursor-default"
                >2
              </button>
            </li>


            <li>
              <button
                className="relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                >3
              </button>
            </li>


            <li>
              <button
                className="relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                >Następna
              </button>
            </li>


        </ul>
      </nav>
    );
  };
  
  export default RentalsHistoryTablePagination;