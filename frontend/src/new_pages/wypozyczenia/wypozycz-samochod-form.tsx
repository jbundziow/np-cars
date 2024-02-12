import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";

import MakeARentalFormContainer from '../../components/rentals/rent/MakeARentalFormContainer';
import fetchData from '../../utilities/fetchData';

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

    const [data1, setData1] = useState<ApiResponse>(); //car basic data
    const [data2, setData2] = useState<number>(); //number of future reservations
    const [data3, setData3] = useState<ApiResponse>(); //last rental data
    const [data4, setData4] = useState<ApiResponse>(); //last rental user data

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);



    useEffect(() => {
      const getData = async () => {   
       
      
      const res1 = await fetchData(`${DOMAIN_NAME}/cars/${params.carid}?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);
      if(res1.status === 'success') {
        const res2 = await fetchData(`${DOMAIN_NAME}/reservations/cars/${params.carid}?time=future`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData2(res2.data.reservations.length);
        if(res2.status === 'success') {
          const res3 = await fetchData(`${DOMAIN_NAME}/rentals/cars/${params.carid}/last`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
          setData3(res3);
          if(res3.status === 'success' && res3.data !== null) {
            const res4 = await fetchData(`${DOMAIN_NAME}/users/${res3.data.userID}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
            setData4(res4);
          }
        }
      }

      const forbiddenStatuses = ['notAvailable', 'onService', 'damaged', 'banned'];
      if(forbiddenStatuses.includes(res1.data.availabilityStatus)) {
        setError(true);
      }
      
      

      setLoading(false)
      }
      getData()
    }, [])


    
    
    return (
      <>
      <Breadcrumb pageName="Wypożycz samochód" />
      
      {loading === true ? <Loader/> : (!isFail && !isError) ? <MakeARentalFormContainer carData={data1?.data} numberOfFutureReservations={data2} lastRentalData={data3?.data} lastRentalUserData={data4?.data} /> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default MakeARentalForm;
