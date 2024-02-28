import { useState } from "react"
import { ApiResponse } from "../../../types/common";
import { CSVLink } from "react-csv";
import fetchData from "../../../utilities/fetchData";
import DOMAIN_NAME from "../../../utilities/domainName";
import { db_Car_basic, db_Refueling, db_User } from "../../../types/db_types";
import { dateFormatter } from "../../../utilities/dateFormatter";
import { generateExcelPageState } from "../../../types/enums";


type GenerateRefuelingExcelProps = {
    filters: string,
  }
  
  
  export default function GenerateRefuelingExcel(props: GenerateRefuelingExcelProps) {




    const [transformedData, setTransformedData] = useState<db_Refueling[] | []>([])

    // @ts-ignore //failData is never used
    const [failData, setFailData] = useState<ApiResponse>();
    
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    

    const [pageState, setPageState] = useState<generateExcelPageState>(generateExcelPageState.initial);








      const getData = async () => {
        setPageState(generateExcelPageState.loading)

        const res1 = await fetchData(`${DOMAIN_NAME}/refuelings?filters=${props.filters}&pagenumber=1&pagesize=9999&sortfromoldest=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        if(res1.status==='success') {
          const res2 = await fetchData(`${DOMAIN_NAME}/cars/?basicdata=true&showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
          if(res2.status==='success') {
            const res3 = await fetchData(`${DOMAIN_NAME}/users?showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
            



                const transformedData = res1.data.map((refueling: db_Refueling) => {

                const carObject: db_Car_basic | undefined = res2.data.find((car: db_Car_basic) => car.id === refueling.carID);
                const refuelingUserObject: db_User | undefined = res3.data.find((user: db_User) => user.id === refueling.userID);
                const isAcknowledgedByModeratorUserObject: db_User | undefined = res3.data.find((user: db_User) => user.id === refueling.isAcknowledgedByModerator)
                const lastEditedByModeratorUserObject: db_User | undefined = res3.data.find((user: db_User) => user.id === refueling.lastEditedByModeratorOfID)
                  console.log(refueling.averageConsumption);
                  console.log(refueling.costPerLiter);

                return {
                  ...refueling,
                  carID: carObject ? `${carObject.brand} ${carObject.model}` : '',
                  userID: refuelingUserObject ? `${refuelingUserObject.name} ${refuelingUserObject.surname}` : '',
                  refuelingDate: dateFormatter(refueling.refuelingDate.toString()),
                  numberOfLiters: refueling.numberOfLiters.toLocaleString("pl-PL"),
                  averageConsumption: refueling.averageConsumption ? refueling.averageConsumption.toLocaleString("pl-PL") : '',
                  costBrutto: refueling.costBrutto ? refueling.costBrutto.toLocaleString("pl-PL") : '',
                  costPerLiter: refueling.costPerLiter ? refueling.costPerLiter.toLocaleString("pl-PL") : '',
                  isFuelCardUsed: refueling.isFuelCardUsed ? 'Tak' : 'Nie',
                  moneyReturned: refueling.moneyReturned === null ? 'Nie dotyczy' : refueling.moneyReturned === true ? 'Tak' : 'Nie',

                  isAcknowledgedByModerator: isAcknowledgedByModeratorUserObject ? `${isAcknowledgedByModeratorUserObject.name} ${isAcknowledgedByModeratorUserObject.surname}` : '',  

                  createdAt: dateFormatter(refueling.createdAt.toString()),
                  updatedAt: dateFormatter(refueling.updatedAt.toString()),

                  lastEditedByModeratorOfID: lastEditedByModeratorUserObject ? `${lastEditedByModeratorUserObject.name} ${lastEditedByModeratorUserObject.surname}` : '',      
                };

              });

              setTransformedData(transformedData);




              setTimeout(() => { setPageState(generateExcelPageState.ready) }, 500)
              
            
          }
        }
      
      }


      const headers = [
        {label: 'Samochód', key: 'carID'},
        {label: 'Kto zatankował?', key: 'userID'},
        {label: 'Data i godzina tankowania', key: 'refuelingDate'},
        {label: 'Przebieg w momencie tankowania [km]', key: 'carMileage'},
        {label: 'Ilość zatankowanego paliwa [l]', key: 'numberOfLiters'},
        {label: 'Średnie spalanie [l/100km]', key: 'averageConsumption'},
        {label: 'Całkowiata kwota tankowania [zł brutto]', key: 'costBrutto'},
        {label: 'Cena za litr paliwa [zł brutto]', key: 'costPerLiter'},
        {label: 'Czy użyto kartę paliwową?', key: 'isFuelCardUsed'},
        {label: 'Czy zwrócono koszty tankowania?', key: 'moneyReturned'},
        {label: 'Numer faktury', key: 'invoiceNumber'},
        {label: 'Tankowanie potwierdzone przez moderatora?', key: 'isAcknowledgedByModerator'},
        {label: 'ID', key: 'id'},
        {label: 'Utworzono w bazie danych', key: 'createdAt'},
        {label: 'Ostatnia edycja w bazie danych', key: 'updatedAt'},
        {label: 'Czy edytowano dane dotyczące tego tankowania przez moderatora?', key: 'lastEditedByModeratorOfID'},
      ]






      const csvLinkStyles  = {
        height: '100%',
        width: '100%',
        padding: '0.75rem', //=== p-3
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem'
        
      };

      const csv_SVG = <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path fill="white" d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V304H176c-35.3 0-64 28.7-64 64V512H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM200 352h16c22.1 0 40 17.9 40 40v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-8c0-8.8 7.2-16 16-16s16 7.2 16 16v8c0 22.1-17.9 40-40 40H200c-22.1 0-40-17.9-40-40V392c0-22.1 17.9-40 40-40zm133.1 0H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H333.1c-7.2 0-13.1 5.9-13.1 13.1c0 5.2 3 9.9 7.8 12l37.4 16.6c16.3 7.2 26.8 23.4 26.8 41.2c0 24.9-20.2 45.1-45.1 45.1H304c-8.8 0-16-7.2-16-16s7.2-16 16-16h42.9c7.2 0 13.1-5.9 13.1-13.1c0-5.2-3-9.9-7.8-12l-37.4-16.6c-16.3-7.2-26.8-23.4-26.8-41.2c0-24.9 20.2-45.1 45.1-45.1zm98.9 0c8.8 0 16 7.2 16 16v31.6c0 23 5.5 45.6 16 66c10.5-20.3 16-42.9 16-66V368c0-8.8 7.2-16 16-16s16 7.2 16 16v31.6c0 34.7-10.3 68.7-29.6 97.6l-5.1 7.7c-3 4.5-8 7.1-13.3 7.1s-10.3-2.7-13.3-7.1l-5.1-7.7c-19.3-28.9-29.6-62.9-29.6-97.6V368c0-8.8 7.2-16 16-16z"/></svg>







    return (
        <div className="flex justify-center sm:justify-end p-5">

          {isFail || isError ?
          <button className="flex w-[95%] sm:w-[50%] lg:w-[30%] justify-center gap-3 rounded bg-danger border border-black dark:border-white p-3 font-medium text-white hover:opacity-90" disabled>{csv_SVG}Wystąpił błąd!</button>


          :


          pageState === generateExcelPageState.initial ?
          <button className="flex w-[95%] sm:w-[50%] lg:w-[30%] justify-center gap-3 rounded bg-primary dark:bg-neutral-800 border border-black dark:border-white p-3 font-medium text-white hover:opacity-90" onClick={getData}>{csv_SVG}Eksportuj dane do Excela</button>


          :


          pageState === generateExcelPageState.ready ?
          <button className="flex w-[95%] sm:w-[50%] lg:w-[30%] justify-center gap-3 rounded bg-success border border-black dark:border-white font-medium text-white hover:opacity-90">
          <CSVLink
          style={csvLinkStyles}
          data={transformedData}
          headers={headers}
          separator={";"}
          filename={"tankowania.csv"}

          >{csv_SVG}Gotowe! Pobierz plik</CSVLink>
          </button>


          :


          pageState === generateExcelPageState.loading ?
          <button className="flex w-[95%] sm:w-[50%] lg:w-[30%] justify-center gap-3 rounded bg-warning border border-black dark:border-white p-3 font-medium text-white hover:opacity-90" disabled>
            {csv_SVG}Trwa ładowanie pliku...
            <div
            className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span>
            </div>
          </button>


          :


          null
          }
      
        </div>
        
    )
  }
