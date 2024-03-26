import { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import RentalsReturnCarTable from "../../components/rentals/return/RentalsReturnCarTable";
import fetchData from "../../utilities/fetchData";
import useAuth from "../../hooks/useAuth";
import { ApiResponse } from "../../types/common";


interface Props {
    documentTitle: string;
  }


const ReturnACar = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    
    const [data1, setData1] = useState<ApiResponse>(); //rentals data
    const [data2, setData2] = useState<ApiResponse>(); //car basic data
    const [data3, setData3] = useState<ApiResponse>(); //users data

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    
    const { auth } = useAuth()
    useEffect(() => {
      const getData = async () => {   
       
      let url = `${DOMAIN_NAME}/rentals/users/${auth.userID}?type=pending`; //only for this user
      if(auth.userRole === 'admin') { url = `${DOMAIN_NAME}/rentals/pending`} //all pending rentals

      const res1 = await fetchData(url, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);
      if(res1.status === 'success') {
        const res2 = await fetchData(`${DOMAIN_NAME}/cars/?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData2(res2);
      }
      
      if(auth.userRole === 'admin') {
        const res3 = await fetchData(`${DOMAIN_NAME}/users/?showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData3(res3);
      }

      setLoading(false)
      }
      getData()
    }, [])

    return (
      <>
      <Breadcrumb pageName={auth.userRole === 'admin' ? "Zwrot aut wypożyczonych przeze mnie:" : "Oddaj auto"} />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <RentalsReturnCarTable rentalsData={data1?.data} carsData={data2?.data} auth={auth} usersData={data3?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      
      </>
    );
  };
  
  export default ReturnACar;