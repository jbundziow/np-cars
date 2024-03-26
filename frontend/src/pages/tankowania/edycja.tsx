import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader/Loader";
import Breadcrumb from '../../components/Breadcrumb';
import fetchData from '../../utilities/fetchData';
import OperationResult from '../../components/general/OperationResult';
import DOMAIN_NAME from "../../utilities/domainName";
import { ApiResponse } from "../../types/common";
import useAuth from "../../hooks/useAuth";
import RefuelingEditForm from "../../components/refuelings/edit/RefuelingEditForm";

  interface Props {
      documentTitle: string;
  }


const EditRefuelingForm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const params = useParams();
    const { auth } = useAuth();

    const [data1, setData1] = useState<ApiResponse>(); //refueling data
    const [data2, setData2] = useState<ApiResponse>(); //basic car data
    const [data3, setData3] = useState<ApiResponse>(); //users data

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    
    useEffect(() => {
      const getData = async () => {   

      const res1 = await fetchData(`${DOMAIN_NAME}/refuelings/${params.refuelingid}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);
       
      if(res1.status === 'success') {
      const res2 = await fetchData(`${DOMAIN_NAME}/cars/${res1.data.carID}/?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData2(res2);

      if(res2.status === 'success') {
        const res3 = await fetchData(`${DOMAIN_NAME}/users/?showbanned=false`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData3(res3);
      }
      }

      

      setLoading(false)
      }
      getData()
    }, [])


    return (
      <>
      <Breadcrumb pageName="Edycja tankowania" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <RefuelingEditForm refuelingData={data1?.data} carData={data2?.data} usersData={data3?.data} auth={auth}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
     
      </>
    );
  };
  
  export default EditRefuelingForm;