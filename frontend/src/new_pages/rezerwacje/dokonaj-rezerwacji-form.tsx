import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";

import MakeAReservationFormContainer from '../../components/reservations/make/MakeAReservationFormContainer';

interface Props {
    documentTitle: string;
  }

interface ApiResponse {
  status: 'success' | 'fail' | 'error',
  data?: any,
  message?: any,
}


const MakeAReservationForm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const params = useParams();

    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch(
            `${DOMAIN_NAME}/cars/${params.carid}?basicdata=true`
          );
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          let actualData = await response.json();
          setData(actualData);
          setError(null);
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
      <Breadcrumb pageName="Dokonaj rezerwacji" />
      {loading === true ? <Loader/> : (error === null && data?.status==='success' && data?.data !== null) ? <MakeAReservationFormContainer data={data.data}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default MakeAReservationForm;