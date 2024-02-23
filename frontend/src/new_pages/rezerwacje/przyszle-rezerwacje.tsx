import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";
import useAuth from '../../hooks/useAuth'
import FutureReservationsTable from "../../components/reservations/future_reservations/FutureReservationsTable";
import { ApiResponse } from "../../types/common";



interface Props {
    documentTitle: string;
  }



const FutureReservations = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    

    const [data1, setData1] = useState<ApiResponse>();  //all cars basic data

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    

    const { auth }= useAuth();
    useEffect(() => {
      const getData = async () => {   

      const res1 = await fetchData(`${DOMAIN_NAME}/reservations/users/${auth.userID}?time=future`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);


      setLoading(false)
      }
      getData()
    }, [])


    return (
      <>
      <Breadcrumb pageName="Zestawienie przyszłych rezerwacji" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <FutureReservationsTable reservationsData={data1?.data.reservations} allCarsBasicData={data1?.data.allCarsData}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default FutureReservations;