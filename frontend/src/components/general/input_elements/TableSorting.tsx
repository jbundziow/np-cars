import { useEffect, useState } from "react";


export interface SortOptions {
    sortby: string | null,
    order: string | null,
    pagesize: number | null,
}


type TableSortingProps = {
    sortOptions: {value: string, label: string}[],
    setSelectedSortOptions: Function,
    selectedSortOptions: SortOptions | null,

   
  }

const TableSorting = (props: TableSortingProps) => {
    // const sortString_params = new URLSearchParams(props.sortString);



    // const initialSortBy = props.sortOptions?.find(option => option.value === sortString_params.get('sortby') || props.sortOptions[0]);

    const [sortBy, setSortBy] = useState<string>(props.selectedSortOptions?.sortby || props.sortOptions[0]?.value || "");
    const [sortOrder, setSortOrder] = useState<string>(props.selectedSortOptions?.order || "DSC");
    const [resultsPerPage, setResultsPerPage] = useState<number>(props.selectedSortOptions?.pagesize || 8);

    useEffect(() => {
        console.log(sortBy);
        props.setSelectedSortOptions({sortBy: sortBy, order: sortOrder, pagesize: resultsPerPage})
    }, [sortBy, sortOrder, resultsPerPage])




    return (                
    <div className="flex flex-col md:flex-row justify-between gap-4 text-black dark:text-white">

        <div className="flex flex-col md:w-2/3">

            <label className="m-3 text-black dark:text-white text-xs sm:text-sm md:text-base">
                Sortuj według:
            </label>

            <div className="flex flex-col md:flex-row gap-2">
                <select
                className="md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-sm md:text-base"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                >
                    {props.sortOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

                <select
                className="md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-xs sm:text-sm md:text-base"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                >
                <option value="DSC">Malejąco</option>
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
            value={resultsPerPage.toString()}
            onChange={(e) => setResultsPerPage(+e.target.value)}
            >
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