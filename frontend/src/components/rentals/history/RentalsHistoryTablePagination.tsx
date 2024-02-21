type Pagination = {
  totalCount: number,
  totalPages: number,
  currentPage: number,
  hasPreviousPage: boolean,
  hasNextPage: boolean,
}


type RentalsHistoryTablePaginationProps = {
  pagination: Pagination,
  setCurrentPage: (pageNumber: number) => void;
}


const RentalsHistoryTablePagination = (props: RentalsHistoryTablePaginationProps) => {


    const handleClick = (pageNumber: number) => {
      props.setCurrentPage(pageNumber);
    };
  
    const renderPaginationButton = (pageNumber: number, text: string) => {
      const buttonClass = pageNumber === props.pagination.currentPage
        ? `relative block rounded bg-primary-100 px-3 py-1.5 text-md font-medium text-primary-700 transition-all duration-300 cursor-default`
        : `relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`;
  
      return (
        <li key={pageNumber}>
          <button className={buttonClass} onClick={() => handleClick(pageNumber)}>{text}</button>
        </li>
      );
    };
  
    return (
      <nav aria-label="Page navigation" className="flex justify-center select-none">
        <ul className="list-style-none flex">


          <li>
            <button
              className={props.pagination.hasPreviousPage
                ? `relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`
                : `pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
              onClick={() => handleClick(props.pagination.currentPage - 1)}
              disabled={!props.pagination.hasPreviousPage}
            >
              Poprzednia
            </button>
          </li>
  

          {props.pagination.currentPage > 1 &&
            renderPaginationButton(props.pagination.currentPage - 1, (props.pagination.currentPage - 1).toString())}
  
          {renderPaginationButton(props.pagination.currentPage, props.pagination.currentPage.toString())}
  
          {props.pagination.hasNextPage &&
            renderPaginationButton(props.pagination.currentPage + 1, (props.pagination.currentPage + 1).toString())}
  

          <li>
            <button
              className={props.pagination.hasNextPage
                ? `relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`
                : `pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-md text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
              onClick={() => handleClick(props.pagination.currentPage + 1)}
              disabled={!props.pagination.hasNextPage}
            >
              Następna
            </button>
          </li>


        </ul>
      </nav>
    );
  };
  
  export default RentalsHistoryTablePagination;