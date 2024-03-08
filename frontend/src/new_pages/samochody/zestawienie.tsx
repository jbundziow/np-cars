import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import Breadcrumb from '../../components/Breadcrumb';
import fetchData from '../../utilities/fetchData';
import OperationResult from '../../components/general/OperationResult';
import DOMAIN_NAME from "../../utilities/domainName";
import { ApiResponse } from "../../types/common";
import useAuth from "../../hooks/useAuth";
import CarsListPage from "../../components/cars/list/CarsListPage";

  interface Props {
      documentTitle: string;
  }



const CarsList = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const { auth } = useAuth();


    const [data1, setData1] = useState<ApiResponse>();  //cars data


    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    
    useEffect(() => {
      const getData = async () => {   
       
      const res1 = await fetchData(`${DOMAIN_NAME}/cars/?basicdata=true&showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);


      setLoading(false)
      }
      getData()
    }, [])

    

    return (
      <>
      <Breadcrumb pageName="Lista wszystkich samochodów" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <CarsListPage cars={data1?.data} auth={auth}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
     
      </>
    );
  };
  
  export default CarsList