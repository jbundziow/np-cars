import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import RentalsReturnCarTable from "../../components/rentals/return/RentalsReturnCarTable";
import fetchData from "../../utilities/fetchData";



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

    
    const [data1, setData1] = useState<ApiResponse>();

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    
    useEffect(() => {
      const getData = async () => {   
       
      //TODO: PASS HERE A CORRECT USER ID (CURRENTLY LOGGED IN)
      const res1 = await fetchData(`${DOMAIN_NAME}/rentals/user/12?type=pending`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);

      setLoading(false)
      }
      getData()
    }, [])

    return (
      <>
      <Breadcrumb pageName="Oddaj auto" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <RentalsReturnCarTable data={data1?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      
      </>
    );
  };
  
  export default ReturnACar;