import { Link } from 'react-router-dom';

const TableThree = () => {
    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Samochód
                </th>
                <th className="hidden md:flex md:miXn-w-[150px] py-4 px-4 justify-center font-medium text-xs md:text-base text-black dark:text-white">
                  Ilość zaplanowanych rezerwacji
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                  Działania
                </th>
              </tr>
            </thead>
            <tbody>
                {/* TODO: move this to another component */}
              <tr>
                <td className="border-b border-[#eee] py-5 px-2 sm:pl-9 dark:border-strokedark xl:pl-11">
                    <div className="col-span-3 flex items-center">
                    <div className="flex flex-col sm:gap-4 xl:flex-row xl:items-center">
                        <div className=" w-22 sm:w-32 rounded-md">
                        <img 
                        className="rounded-md block"
                        src={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'} alt="Zdjęcie samochodu" />
                        </div>
                        <h5 className="font-medium text-xs sm:text-base text-black dark:text-white">
                        Renault Megane
                        </h5>
                    </div>
                    </div>
                </td>
                <td className="hidden md:table-cell border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                    <div className="flex justify-center">
                    <p className="inline-flex rounded-md bg-danger py-2 px-4 text-md text-md font-bold text-white cursor-default">1</p>
                    </div>
                </td>
                <td className=" border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                  <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-success">
                    Dostępny
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                  <Link
                    to="#"
                    className="inline-flex items-center justify-center rounded-full bg-primary py-1 sm:py-2 px-4 sm:px-7 text-center text-xs sm:text-base font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8"
                    >
                    Wypożycz
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default TableThree;
  