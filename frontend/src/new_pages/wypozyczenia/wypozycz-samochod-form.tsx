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
              `${DOMAIN_NAME}/rentals/car/${params.carid}/last`
            );
            if (!response2.ok) {
              const response2JSON = await response2.json();
              if(response2JSON.status === 'fail') {
                setWarnings(response2JSON.data);
                setLastRentalData(response2JSON);
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
              setLastRentalData(actualData2);
              setError(null);
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
 
      {loading === true ? <Loader/> : (error === null && carData?.status==='success' && carData?.data !== null && carData?.data.availabilityStatus !== 'notAvailable' && carData?.data.availabilityStatus !== 'onService' && carData?.data.availabilityStatus !== 'damaged' && carData?.data.availabilityStatus !== 'banned') ? <MakeARentalFormContainer carData={carData.data} lastRentalData={LastRentalData?.data}/> : (error === null && carData?.status==='fail' && carData?.data !== null) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={warnings} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default MakeARentalForm;
