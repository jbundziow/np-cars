import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import RentalsReturnCarTable from "../../components/rentals/return/RentalsReturnCarTable";



interface Props {
    documentTitle: string;
  }

interface ApiResponse {
  status: 'success' | 'fail' | 'error',
  data?: any,
  message?: any,
}

const ReturnACar = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    type warnings = {
      pl: string,
      en: string,
    } 
    const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])

    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getData = async () => {
        //TODO: PASS HERE A CORRECT USER ID (CURRENTLY LOGGED IN)
        try {
          const response = await fetch(
            `${DOMAIN_NAME}/rentals/user/12?type=pending`
          );
          if (!response.ok) {
            const responseJSON = await response.json();
            if(responseJSON.status === 'fail') {
              setWarnings(responseJSON.data);
              setData(responseJSON);
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
            setData(actualData);
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
      <Breadcrumb pageName="Oddaj auto" />

      {loading === true ? <Loader/> : (error === null && data?.status==='success' && data?.data !== null) ? <RentalsReturnCarTable data={data.data}/> : (error === null && data?.status==='fail' && data?.data !== null) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={warnings} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      
      </>
    );
  };
  
  export default ReturnACar;