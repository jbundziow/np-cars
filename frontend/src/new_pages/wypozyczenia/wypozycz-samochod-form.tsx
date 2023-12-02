import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";

import MakeARentalFormContainer from '../../components/rentals/rent/MakeARentalFormContainer';

interface Props {
    documentTitle: string;
  }

interface ApiResponse {
  status: 'success' | 'fail' | 'error',
  data?: any,
  message?: any,
}


const MakeARentalForm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const params = useParams();

    type warnings = {
      pl: string,
      en: string,
    } 
    const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])

    const [carData, setCarData] = useState<ApiResponse | null>(null);
    const [LastRentalData, setLastRentalData] = useState<ApiResponse | null>(null);
    const [LastRentalUserData, setLastRentalUserData] = useState<ApiResponse | null>(null);
    const [numberOfFutureReservations, setNumberOfFutureReservations] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    //fetch car basic data
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch(
            `${DOMAIN_NAME}/cars/${params.carid}?basicdata=true`
          );
          if (!response.ok) {
            const responseJSON = await response.json();
            if(responseJSON.status === 'fail') {
              setWarnings(responseJSON.data);
              setCarData(responseJSON);
              setError(null);
            }
            else {
              throw new Error(
                `This is an HTTP error: The status is ${response.status}`
              );
            }
          }
          else {
            let actualData = await response.json();
            setCarData(actualData);
            setError(null);


            //NEXT ENDPOINT TO FETCH
            const response2 = await fetch(
              `${DOMAIN_NAME}/reservations/fetchallofcar/${params.carid}?time=future`
            );
            if (!response2.ok) {
              const response2JSON = await response2.json();
              if(response2JSON.status === 'fail') {
                setWarnings(response2JSON.data);
                setNumberOfFutureReservations(response2JSON);
                setError(null);
              }
              else {
                throw new Error(
                  `This is an HTTP error: The status is ${response2.status}`
                );
              }
            }
            else {
              let actualData2 = await response2.json();
              setNumberOfFutureReservations(actualData2.data.reservations.length);
              setError(null);


              //NEXT ENDPOINT TO FETCH
            
              const response3 = await fetch(
                `${DOMAIN_NAME}/rentals/car/${params.carid}/last`
              );
              if (!response3.ok) {
                const response3JSON = await response3.json();
                if(response3JSON.status === 'fail') {
                  setWarnings(response3JSON.data);
                  setLastRentalData(response3JSON);
                  setError(null);
                }
                else {
                  throw new Error(
                    `This is an HTTP error: The status is ${response3.status}`
                  );
                }
              }
              else {
                let actualData3 = await response3.json();
                setLastRentalData(actualData3);
                setError(null);
                if (actualData3.data !== null) {
                  const response4 = await fetch(
                    `${DOMAIN_NAME}/users/fetchone/${actualData3.data.userID}`
                  );
                  if (!response4.ok) {
                    const response4JSON = await response4.json();
                    if(response4JSON.status === 'fail') {
                      setWarnings(response4JSON.data);
                      setLastRentalUserData(response4JSON);
                      setError(null);
                    }
                    else {
                      throw new Error(
                        `This is an HTTP error: The status is ${response4.status}`
                      );
                    }
                  }
                  else {
                    let actualData4 = await response4.json();
                    setLastRentalUserData(actualData4);
                    setError(null);
                  }
                //.*********************

              }
            }
            //.*********************


            }
            //.*********************


          }
          
        } catch(err: any) {
          setError(err.message);
          setCarData(null);
          setLastRentalData(null)
        } finally {
          setLoading(false);
          
        }  
      }
      getData()
    }, [])


    
    
    return (
      <>
      <Breadcrumb pageName="Wypożycz samochód" />
 
      {loading === true ? <Loader/> : (error === null && carData?.status==='success' && typeof numberOfFutureReservations==='number' && LastRentalData?.status==='success' && LastRentalUserData?.status==='success' && carData?.data.availabilityStatus !== 'notAvailable' && carData?.data.availabilityStatus !== 'onService' && carData?.data.availabilityStatus !== 'damaged' && carData?.data.availabilityStatus !== 'banned') ? <MakeARentalFormContainer carData={carData.data} lastRentalData={LastRentalData?.data} lastRentalUserData={LastRentalUserData?.data} numberOfFutureReservations={numberOfFutureReservations}/> : (error === null && (carData?.status==='fail' && carData?.data !== null) || LastRentalData?.status==='fail') ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={warnings} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default MakeARentalForm;
