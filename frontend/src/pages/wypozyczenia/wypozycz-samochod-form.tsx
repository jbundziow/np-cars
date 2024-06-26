import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loader from "../../common/Loader/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import { BACKEND_URL } from "../../utilities/domainName";

import MakeARentalFormContainer from '../../components/rentals/rent/MakeARentalFormContainer';
import fetchData from '../../utilities/fetchData';
import { ApiResponse } from '../../types/common';

interface Props {
    documentTitle: string;
  }



const MakeARentalForm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const params = useParams();

    const [data1, setData1] = useState<ApiResponse>(); //car basic data
    const [data2, setData2] = useState<number>(); //number of future reservations
    const [data3, setData3] = useState<ApiResponse>(); //last rental data
    const [data4, setData4] = useState<ApiResponse>(); //last rental user data
    const [data5, setData5] = useState<ApiResponse>(); //two weeks reservations data for car

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);



    useEffect(() => {
      const getData = async () => {   
      
      const res1 = await fetchData(`${BACKEND_URL}/cars/${params.carid}?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);
      if(res1.status === 'success') {
        const res2 = await fetchData(`${BACKEND_URL}/reservations/cars/${params.carid}?time=future`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData2(res2.data.reservations.length);
        if(res2.status === 'success') {
          const res3 = await fetchData(`${BACKEND_URL}/rentals/cars/${params.carid}/last`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
          setData3(res3);

          if(res3.status === 'success' && res3.data !== null) {
            const res4 = await fetchData(`${BACKEND_URL}/users/${res3.data.userID}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
            setData4(res4);
          }

          const res5 = await fetchData(`${BACKEND_URL}/reservations/twoweeks/cars/${params.carid}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
          setData5(res5);
              
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
      {loading === true ? <Loader/> : (!isFail && !isError) ? <MakeARentalFormContainer carData={data1?.data} numberOfFutureReservations={data2} lastRentalData={data3?.data} lastRentalUserData={data4?.data} twoWeeksReservations={data5?.data} /> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default MakeARentalForm;
