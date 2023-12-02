import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import RentalsReturnCarForm from "../../components/rentals/return/RentalsReturnCarForm";



interface Props {
    documentTitle: string;
  }

interface ApiResponse {
  status: 'success' | 'fail' | 'error',
  data?: any,
  message?: any,
}

const ReturnACarForm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    const params = useParams();

    type warnings = {
      pl: string,
      en: string,
    } 
    const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])

    const [rentalData, setRentalData] = useState<ApiResponse | null>(null);
    const [carBasicData, setCarBasicData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
  
    useEffect(() => {
      const getData = async () => {
        //TODO: PASS HERE A CORRECT USER ID (CURRENTLY LOGGED IN)
        try {
          const response = await fetch(
            `${DOMAIN_NAME}/rentals/${params.rentalid}`
          );
          if (!response.ok) {
            const responseJSON = await response.json();
            if(responseJSON.status === 'fail') {
              setWarnings(responseJSON.data);
              setRentalData(responseJSON);
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
            setCarBasicData(actualData);
            setError(null);

            const response2 = await fetch(
                `${DOMAIN_NAME}/cars/${rentalData?.data.data.carID}/?basicdata=true`
              );
              if (!response2.ok) {
                const response2JSON = await response2.json();
                if(response2JSON.status === 'fail') {
                  setWarnings(response2JSON.data);
                  setCarBasicData(response2JSON);
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
                setCarBasicData(actualData2);
                setError(null);
              }


          }
        } catch(err: any) {
          setError(err.message);
          setRentalData(null);
        } finally {
          setLoading(false);
          
        }  
      }
      getData()
    }, [])


    return (
      <>
      <Breadcrumb pageName="Oddaj auto" />

      {loading === true ? <Loader/> : (error === null && rentalData?.status==='success' && rentalData?.data !== null && carBasicData?.status==='success' && carBasicData?.data !== null) ? <RentalsReturnCarForm rentalData={rentalData?.data} carBasicData={carBasicData?.data}/> : (error === null && (rentalData?.status==='fail' && rentalData?.data !== null) || (carBasicData?.status==='fail' && carBasicData?.data !== null)) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={warnings} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      
      </>
    );
  };
  
  export default ReturnACarForm;