import { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import Breadcrumb from '../../components/Breadcrumb';
import RefuelingsReportTable from '../../components/refuelings/report/RefuelingsReportTable';
import fetchData from '../../utilities/fetchData';
import OperationResult from '../../components/general/OperationResult';
import { BACKEND_URL } from "../../utilities/domainName";
import { ApiResponse } from "../../types/common";

  interface Props {
      documentTitle: string;
  }


const ReportRefueling = (props: Props) => {

    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const [data1, setData1] = useState<ApiResponse>(); //basic cars data

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    
    useEffect(() => {
      const getData = async () => {   
       
      const res1 = await fetchData(`${BACKEND_URL}/cars/?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);

      setLoading(false)

      }
      getData()
    }, [])

    

    return (
      <>
      <Breadcrumb pageName="Zgłoś zatankowanie samochodu" />
      {loading === true ? <Loader/> : (!isFail && !isError) ? <RefuelingsReportTable carData={data1?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
     
      </>
    );
  };
  
  export default ReportRefueling