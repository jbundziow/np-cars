import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import Breadcrumb from '../../components/Breadcrumb';
import RefuelingOverviewTable from '../../components/refuelings/overview/RefuelingsOverviewTable';
import fetchData from '../../utilities/fetchData';
import OperationResult from '../../components/general/OperationResult';
import DOMAIN_NAME from "../../utilities/domainName";

  interface Props {
      documentTitle: string;
  }

  interface ApiResponse {
    status: 'success' | 'fail' | 'error',
    data?: any,
    message?: any,
  }


const RefuelingOverview = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const [data1, setData1] = useState<ApiResponse>(); //basic cars data

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    
    useEffect(() => {
      const getData = async () => {   
       
      const res1 = await fetchData(`${DOMAIN_NAME}/cars/?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);

      if(res1.data.length === 0) {
        setError(true)
      }

      setLoading(false)
      }
      getData()
    }, [])


    return (
      <>
      <Breadcrumb pageName="Przegląd zatankowania aut" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <RefuelingOverviewTable carData={data1?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
     
      </>
    );
  };
  
  export default RefuelingOverview