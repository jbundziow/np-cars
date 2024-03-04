import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import Breadcrumb from '../../components/Breadcrumb';
import RefuelingReportForm from '../../components/refuelings/report/RefuelingReportForm';
import fetchData from '../../utilities/fetchData';
import OperationResult from '../../components/general/OperationResult';
import DOMAIN_NAME from "../../utilities/domainName";
import { ApiResponse } from "../../types/common";
import useAuth from "../../hooks/useAuth";

  interface Props {
      documentTitle: string;
  }


const ReportRefuelingForm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const params = useParams();

    const [data1, setData1] = useState<ApiResponse>(); //basic car data
    const [data2, setData2] = useState<ApiResponse>(); //users data

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    const { auth } = useAuth();
    
    useEffect(() => {
      const getData = async () => {   
       
      const res1 = await fetchData(`${DOMAIN_NAME}/cars/${params.carid}/?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);

      if(res1.status === 'success' && auth.userRole === 'admin') {
        const res2 = await fetchData(`${DOMAIN_NAME}/users/?showbanned=false`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData2(res2);
      }

      setLoading(false)
      }
      getData()
    }, [])


    return (
      <>
      <Breadcrumb pageName="Zgłoś zatankowanie samochodu" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <RefuelingReportForm carData={data1?.data} usersData={data2?.data} auth={auth} /> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
     
      </>
    );
  };
  
  export default ReportRefuelingForm