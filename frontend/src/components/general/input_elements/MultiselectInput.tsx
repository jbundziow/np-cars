import Select from "react-tailwindcss-select";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";


type MultiselectInputProps = {
    isSearchable: boolean,
    isMultiple: boolean
    value: SelectValue,
    setValue: Function,
    options: {value:string, label:string}[]
}

const MultiselectInput = (props: MultiselectInputProps) => {


    return (
        <Select
        primaryColor="indigo"
        isMultiple={props.isMultiple}
        isSearchable={props.isSearchable}
        placeholder={`Wybierz...`}
        searchInputPlaceholder={`Zacznij pisać...`}
        noOptionsMessage={`Brak rezultatów`}
        value={props.value}
        onChange={(value: SelectValue)=>(props.setValue(value))}
        options={props.options}


        classNames={{
            //@ts-ignore
            menuButton: ({ isDisabled }) => (
                `flex w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-1 px-1 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-base
                ${
                    isDisabled
                        ? "bg-gray-800"
                        : "bg-gray-800 hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20"
                }`
            ),
            menu: "absolute z-[9999] w-full bg-white dark:bg-form-input shadow-lg border rounded py-1 mt-1.5 text-sm sm:text-base text-gray-700",
            //@ts-ignore
            listItem: ({ isSelected }) => (
                `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                    isSelected
                        ? `text-white bg-blue-500`
                        : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                }`
            ),
            searchContainer: `relative py-1 px-2.5`,
            searchIcon: `absolute w-5 h-5 mt-2.5 pb-0.5 ml-2 text-gray-500`,
            searchBox: `w-full py-2 pl-10 text-sm sm:text-base text-gray-500 bg-gray-100 dark:bg-black border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none`,
        }}
        />
    );
}
export default MultiselectInput;













