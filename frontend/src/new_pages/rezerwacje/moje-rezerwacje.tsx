import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";

import MyReservationsTable from "../../components/reservations/MyReservationsTable";



interface Props {
    documentTitle: string;
  }

interface ApiResponse {
  status: 'success' | 'fail' | 'error',
  data?: any,
  message?: any,
}

const MyReservations = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const [data1, setData1] = useState<ApiResponse>();  //all cars basic data

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    
    useEffect(() => {
      const getData = async () => {   
      // TODO: ADD CORRECT USER ID TO LINK INSTEAD '12'
      const res1 = await fetchData(`${DOMAIN_NAME}/reservations/fetchallofuser/12?time=future`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);


      setLoading(false)
      }
      getData()
    }, [])


    return (
      <>
      <Breadcrumb pageName="Moje rezerwacje" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <MyReservationsTable reservationsData={data1?.data.reservations} allCarsBasicData={data1?.data.allCarsData}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default MyReservations;