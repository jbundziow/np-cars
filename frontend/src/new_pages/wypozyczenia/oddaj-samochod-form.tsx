import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import RentalsReturnCarForm from "../../components/rentals/return/RentalsReturnCarForm";
import fetchData from "../../utilities/fetchData";



interface Props {
    documentTitle: string;
  }

interface ApiResponse {
  status: 'success' | 'fail' | 'error',
  data?: any,
  message?: any,
}

const ReturnACarForm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    const params = useParams();


    const [data1, setData1] = useState<ApiResponse>();
    const [data2, setData2] = useState<ApiResponse>();

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    
  

    useEffect(() => {
      const getData = async () => {   
       
      
      const res1 = await fetchData(`${DOMAIN_NAME}/rentals/${params.rentalid}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);
      //TODO: CHECK IF USERID OF RENTAL IS A CURRENT USER ID OR IF USER IS MODERATOR
      if(res1.status==='success') {
      const res2 = await fetchData(`${DOMAIN_NAME}/cars/${res1.data.carID}/?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData2(res2);
      }
      
      if(res1.data.carMileageAfter !== null) { //rental already finished
        setError(true);
      }

      setLoading(false)
      }
      getData()
    }, [])

    return (
      <>
      <Breadcrumb pageName="Oddaj auto" />
      {loading === true ? <Loader/> : (!isFail && !isError) ? <RentalsReturnCarForm rentalData={data1?.data} carBasicData={data2?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default ReturnACarForm;