

type TableSortingProps = {
    sortOptions: {value: string, label: string}[],

    setSortBy: Function,
    sortBy: string,
    setSortOrder: Function,
    sortOrder: string,
    setPageSize: Function,
    pageSize: number,

    setCurrentPage: (pageNumber: number) => void;
  }

const TableSorting = (props: TableSortingProps) => {





    return (                
    <div className="flex flex-col md:flex-row justify-between gap-4 text-black dark:text-white">

        <div className="flex flex-col md:w-2/3">

            <label className="m-3 text-black dark:text-white text-xs sm:text-sm md:text-base">
                Sortuj według:
            </label>

            <div className="flex flex-col md:flex-row gap-2">
                <select
                className="md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-sm md:text-base"
                value={props.sortBy || props.sortOptions[0]?.value || ""}
                onChange={(e) => {props.setSortBy(e.target.value); props.setCurrentPage(1);}}
                >
                    {props.sortOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

                <select
                className="md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-sm md:text-base"
                value={props.sortOrder || "DESC"}
                onChange={(e) => {props.setSortOrder(e.target.value); props.setCurrentPage(1);}}
                >
                <option value="DESC">Malejąco</option>
                <option value="ASC">Rosnąco</option>
                </select>

            </div>

        </div>



        <div className="flex flex-col md:items-end md:w-1/3">


            <label className="m-3 text-black dark:text-white text-xs sm:text-sm md:text-base">
                Wyników na stronie:
            </label>


            <select
            className="md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-sm md:text-base"
            value={props.pageSize.toString() || "8"}
            onChange={(e) => {props.setPageSize(+e.target.value); props.setCurrentPage(1);}}
            >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>

            </select>




        </div>

    </div>
    )
  };
  
  export default TableSorting;