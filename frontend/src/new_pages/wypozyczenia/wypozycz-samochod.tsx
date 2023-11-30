import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import RentalsTable from "../../components/rentals/rent/RentalsTable";

type carBasicData = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
}

interface Props {
    documentTitle: string;
  }

interface ApiResponse {
  status: 'success' | 'fail' | 'error',
  data?: any,
  message?: any,
}

const RentACar = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    type warnings = {
      pl: string,
      en: string,
    } 
    const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])

    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    //fetch car basic data
    useEffect(() => {
      const getData = async () => {
        try {
          const carDataResponse = await fetch(`${DOMAIN_NAME}/cars/?basicdata=true`);

          if (!carDataResponse.ok) {
            const responseJSON = await carDataResponse.json();
            if(responseJSON.status === 'fail') {
              setWarnings(responseJSON.data);
              setData(responseJSON);
              setError(null);
            }
            else {
              throw new Error(
                `This is an HTTP error: The status is ${carDataResponse.status}`
              );
            }
          }
          else {
            let allCarsData = await carDataResponse.json();
            //NEXT ENDPOINT TO FETCH
            const carIDsArr: number[] = [];
            allCarsData.data.forEach((carData: carBasicData) => carIDsArr.push(carData.id))
            
            for await (const [index, id] of carIDsArr.entries()) {
              const futureReservations = await fetch(`${DOMAIN_NAME}/reservations/fetchallofcar/${id}?time=future`);
              const responseJSON = await futureReservations.json();
              if(responseJSON.status === 'fail') {
                setWarnings(responseJSON.data);
                setData(responseJSON);
                setError(null);
                return;
              }
              else {
                allCarsData.data[index].numberOfFutureReservations = responseJSON.data.reservations.length;
              }
            }
            // .********************
            setData(allCarsData)
            setError(null);
          }
          
        } catch(err: any) {
          setError(err.message);
          setData(null);
        } finally {
          setLoading(false);
          
        }  
      }
      getData()
    }, [])




    return (
      <>
      <Breadcrumb pageName="Wypożycz samochód" />

      {loading === true ? <Loader/> : (error === null && data?.status==='success' && data?.data !== null) ? <RentalsTable data={data.data}/> : (error === null && data?.status==='fail' && data?.data !== null) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={warnings} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      
      </>
    );
  };
  
  export default RentACar;