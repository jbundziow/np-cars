import { useEffect, useState } from "react"
import { ApiResponse } from "../../../types/common";
import { CSVLink } from "react-csv";
import fetchData from "../../../utilities/fetchData";
import DOMAIN_NAME from "../../../utilities/domainName";
import { db_Car_basic, db_Place, db_Rental, db_User } from "../../../types/db_types";


type GenerateRentalExcelProps = {
    url: string,
  }
  
  
  export default function GenerateRentalExcel(props: GenerateRentalExcelProps) {
    // const [data1, setData1] = useState<ApiResponse>();  //rentals data from backend

    // useEffect(() => {
    //     const getData = async () => {

    //         try {
    //             const response1 = await fetch(props.url, {
    //                 method: 'GET',
    //                 credentials: 'include'
    //             });
    //             const responseJSON = await response1.json();
        
    //             if(responseJSON.status === 'success') {
    //               setData1({status: 'success', data: responseJSON});

    //               const response2 = await fetch(props.url, {
    //                 method: 'GET',
    //                 credentials: 'include'
    //               });
    //               const response2JSON = await response2.json();
    //             }
    //         }
            
    //         catch(err: any) {
    //             ;
    //             }
    //     }
    //     getData()
    //   }, [])

    const [data1, setData1] = useState<ApiResponse>();  //rentals data from backend
    const [data2, setData2] = useState<ApiResponse>();  //all cars basic data
    const [data3, setData3] = useState<ApiResponse>();  //all users data
    const [data4, setData4] = useState<ApiResponse>();  //all places data


    const [failData, setFailData] = useState<ApiResponse>();
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    

    const [loadingTable, setLoadingTable] = useState<boolean>(true); //EVERY TIME WHEN updating table
    const [loadingData, setLoadingData] = useState<boolean>(true); //ONLY first fetching data

    useEffect(() => {
      const getData = async () => {
        setLoadingTable(true)

        const res1 = await fetchData(props.url, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData1(res1);

        if(res1.status==='success') {
          const res2 = await fetchData(`${DOMAIN_NAME}/cars/?basicdata=true&showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
          setData2(res2);

          if(res2.status==='success') {
            const res3 = await fetchData(`${DOMAIN_NAME}/users?showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
            setData3(res3);

            if(res3.status==='success') {
              const res4 = await fetchData(`${DOMAIN_NAME}/places?showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
              setData4(res4);
              }
          }
        }

      setLoadingTable(false)
      setLoadingData(false)
      }
      getData()
    }, [])


      // const headers = [
      //   { label: "First Name", key: "travelDestination" },
      //   { label: "Last Name", key: "placeID" },
      //   { label: "Email", key: "email" }
      // ];
      
      // const data = [
      //   { firstname: null, lastname: "Tomi", email: "ah@smthing.co.com" },
      //   { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
      //   { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
      // ];


      const headers = [
        {label: 'Samochód', key: 'carID'},
        {label: 'Wypożyczone przez użytkownika', key: 'userID'},
        {label: 'Data wypożyczenia', key: 'dateFrom'},
        {label: 'Data zwrotu', key: 'dateTo'},
        {label: 'Przebieg początkowy [km]', key: 'carMileageBefore'},
        {label: 'Przebieg końcowy [km]', key: 'carMileageAfter'},
        {label: 'Przejechany dystans [km]', key: 'distance'},
        {label: 'Cel podróży', key: 'travelDestination'},
        {label: 'Zawrócone przez użytkownika', key: 'returnUserID'},
        {label: 'Zatwierdzone przez moderatora?', key: 'lastEditedByModeratorOfID'},
        {label: 'Przypisany numer projektu', key: 'placeID'},
        {label: 'ID', key: 'id'},
        {label: 'Utworzono w bazie danych', key: 'createdAt'},
        {label: 'Ostatnia edycja w bazie danych', key: 'updatedAt'},
      ]


let transformedData = [];
if(data1?.data && data2?.data && data3?.data && data4?.data) {
  transformedData = data1?.data.map((rental: db_Rental) => {
    const carObject: db_Car_basic | undefined = data2.data.find((car: db_Car_basic) => car.id === rental.carID);
    const rentalUserObject: db_User | undefined = data3.data.find((user: db_User) => user.id === rental.userID);
    const returnUserObject: db_User | undefined = data3.data.find((user: db_User) => user.id === rental.returnUserID);
    const acknowledgedByModeratorObject: db_User | undefined = data3.data.find((user: db_User) => user.id === rental.lastEditedByModeratorOfID)
    const placeObject: db_Place | undefined = data4.data.find((place: db_Place) => place.id === rental.placeID)

    return {
      ...rental,
      carID: carObject ? `${carObject.brand} ${carObject.model}` : 'brak', // transform carID
      userID: rentalUserObject ? `${rentalUserObject.name} ${rentalUserObject.surname}` : 'brak', // transform userID
      returnUserID: returnUserObject ? `${returnUserObject.name} ${returnUserObject.surname}` : 'brak', // transform returnUserID
      lastEditedByModeratorOfID: acknowledgedByModeratorObject ? `${acknowledgedByModeratorObject.name} ${acknowledgedByModeratorObject.surname}` : 'brak', // transform lastEditedByModeratorOfID
      placeID: placeObject ? placeObject.projectCode : 'brak', // transform placeID
      dateFrom: new Date(rental.dateFrom).toLocaleDateString(), // transform dateFrom
      // dateTo: new Date(rental.dateTo).toLocaleDateString(), // transform dateTo
      createdAt: new Date(rental.createdAt).toLocaleDateString(), // transform createdAt
      updatedAt: new Date(rental.updatedAt).toLocaleDateString(), // transform updatedAt
    };
  });
}

    return (
        <div>
        <h1>GenerateExcel</h1>
        <CSVLink data={transformedData} headers={headers} separator={";"}>
        Download me
      </CSVLink>;
        </div>
        
    )
  }
