import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";

import FaultsStatusDetailsContainer from '../../components/faults/status/details/FaultsStatusDetailsContainer'
import fetchData from "../../utilities/fetchData";

interface Props {
    documentTitle: string;
  }

interface ApiResponse {
  status: 'success' | 'fail' | 'error',
  data?: any,
  message?: any,
}

const RepairsStatusDetails = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const params = useParams();

      const [data1, setData1] = useState<ApiResponse>();  //car basic data and basic data of all faults of that car
  
      const [failData, setFailData] = useState<ApiResponse>();
      const [loading, setLoading] = useState<boolean>(true);
      const [isFail, setFail] = useState<boolean>(false)
      const [isError, setError] = useState<boolean>(false);
      
      useEffect(() => {
        const getData = async () => {   
  
        const res1 = await fetchData(`${DOMAIN_NAME}/faults/cars/${params.carid}?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData1(res1);
 
        if(res1.data === null) {
          setError(true)
        }
  
        setLoading(false)
        }
        getData()
      }, [])


    return (
      <>
      <Breadcrumb pageName="Status napraw" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <FaultsStatusDetailsContainer data={data1?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default RepairsStatusDetails;