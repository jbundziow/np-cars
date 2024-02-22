import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";

import FaultsStatusContainer from '../../components/faults/status/FaultsStatusContainer';
import fetchData from "../../utilities/fetchData";

interface Props {
    documentTitle: string;
  }

interface ApiResponse {
  status: 'success' | 'fail' | 'error',
  data?: any,
  message?: any,
}

const RepairsStatus = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

      const [data1, setData1] = useState<ApiResponse>();  //number of faults of all cars
  
      const [failData, setFailData] = useState<ApiResponse>();
      const [loading, setLoading] = useState<boolean>(true);
      const [isFail, setFail] = useState<boolean>(false)
      const [isError, setError] = useState<boolean>(false);
      
      useEffect(() => {
        const getData = async () => {   
  
        const res1 = await fetchData(`${DOMAIN_NAME}/faults/numbers`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData1(res1);
  
  
        setLoading(false)
        }
        getData()
      }, [])


    return (
      <>
      <Breadcrumb pageName="Status napraw" />
      {loading === true ? <Loader/> : (!isFail && !isError) ? <FaultsStatusContainer data={data1?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default RepairsStatus;