import { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import { BACKEND_URL } from "../../utilities/domainName";

import FaultsReportTable from '../../components/faults/report/FaultsReportTable';
import fetchData from "../../utilities/fetchData";
import { ApiResponse } from "../../types/common";

interface Props {
    documentTitle: string;
  }



const ReportFault = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const [data1, setData1] = useState<ApiResponse>(); //all cars basic data and number of faults (pending/accepted/finished/cancelled)

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    
    useEffect(() => {
      const getData = async () => {   
       
      const res1 = await fetchData(`${BACKEND_URL}/faults/numbers`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);

      setLoading(false)
      }
      getData()
    }, [])


    return (
      <>
      <Breadcrumb pageName="Zgłoś usterkę" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <FaultsReportTable data={data1?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default ReportFault