import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import RentalsReturnCarTable from "../../components/rentals/return/RentalsReturnCarTable";
import fetchData from "../../utilities/fetchData";
import useAuth from "../../hooks/useAuth";


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

    
    const [data1, setData1] = useState<ApiResponse>(); //rentals data
    const [data2, setData2] = useState<ApiResponse>(); //car basic data

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    
    const { auth } = useAuth()
    useEffect(() => {
      const getData = async () => {   
       
      
      const res1 = await fetchData(`${DOMAIN_NAME}/rentals/users/${auth.userID}?type=pending`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);
      if(res1.status === 'success') {
        const res2 = await fetchData(`${DOMAIN_NAME}/cars/?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData2(res2);
      }

      setLoading(false)
      }
      getData()
    }, [])

    return (
      <>
      <Breadcrumb pageName="Oddaj auto" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <RentalsReturnCarTable rentalsData={data1?.data} carsData={data2?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      
      </>
    );
  };
  
  export default ReturnACar;