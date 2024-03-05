import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import Breadcrumb from '../../components/Breadcrumb';
import fetchData from '../../utilities/fetchData';
import OperationResult from '../../components/general/OperationResult';
import DOMAIN_NAME from "../../utilities/domainName";
import { ApiResponse } from "../../types/common";

  interface Props {
      documentTitle: string;
  }


const ChangeStatusOfFaultForm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const params = useParams();


    const [data1, setData1] = useState<ApiResponse>(); //fault and car basic data


    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    
    useEffect(() => {
      const getData = async () => {   

      const res1 = await fetchData(`${DOMAIN_NAME}/faults/${params.faultid}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);

      

      

      setLoading(false)
      }
      getData()
    }, [])


    return (
      <>
      <Breadcrumb pageName="Zmień status usterki" />

      {/* {loading === true ? <Loader/> : (!isFail && !isError) ? <XXXX faultAndCarBasicData={data1?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>} */}
     
      </>
    );
  };
  
  export default ChangeStatusOfFaultForm;