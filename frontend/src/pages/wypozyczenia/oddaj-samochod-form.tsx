import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import { BACKEND_URL } from "../../utilities/domainName";
import RentalsReturnCarForm from "../../components/rentals/return/RentalsReturnCarForm";
import fetchData from "../../utilities/fetchData";
import { ApiResponse } from "../../types/common";
import useAuth from "../../hooks/useAuth";



interface Props {
    documentTitle: string;
  }


const ReturnACarForm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    const params = useParams();
    const { auth } = useAuth();


    const [data1, setData1] = useState<ApiResponse>(); //rental data
    const [data2, setData2] = useState<ApiResponse>(); //car basic data
    const [data3, setData3] = useState<ApiResponse>(); //users data

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    
  

    useEffect(() => {
      const getData = async () => {   
       
      
      const res1 = await fetchData(`${BACKEND_URL}/rentals/${params.rentalid}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);
      if(res1.status==='success') {
        const res2 = await fetchData(`${BACKEND_URL}/cars/${res1.data.carID}/?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData2(res2);
        if(res1.status==='success') {
          const res3 = await fetchData(`${BACKEND_URL}/users/?showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
          setData3(res3);
        }

      }

      
      
      if(res1.data.carMileageAfter !== null || ((res1.data.userID !== Number(auth.userID)) && auth.userRole !== 'admin')) { //rental already finished or user is not the owner of the rental
        setError(true);
      }

      setLoading(false)
      }
      getData()
    }, [])

    return (
      <>
      <Breadcrumb pageName="Oddaj auto" />
      {loading === true ? <Loader/> : (!isFail && !isError) ? <RentalsReturnCarForm rentalData={data1?.data} carBasicData={data2?.data} usersData={data3?.data} auth={auth}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default ReturnACarForm;