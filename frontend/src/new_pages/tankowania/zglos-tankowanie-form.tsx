import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import Breadcrumb from '../../components/Breadcrumb';
import RefuelingReportForm from '../../components/refuelings/report/RefuelingReportForm';
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


const ReportRefuelingForm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const params = useParams();

    const [data1, setData1] = useState<ApiResponse>(); //basic car data

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    
    useEffect(() => {
      const getData = async () => {   
       
      const res1 = await fetchData(`${DOMAIN_NAME}/cars/${params.carid}/?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
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
      <Breadcrumb pageName="Zgłoś zatankowanie samochodu" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <RefuelingReportForm carID={data1?.data.id} carFullname={`${data1?.data.brand} ${data1?.data.model}`} carImg={data1?.data.imgPath}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
     
      </>
    );
  };
  
  export default ReportRefuelingForm