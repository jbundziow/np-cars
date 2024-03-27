import { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import { BACKEND_URL } from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";
import ActualRentalsTable from "../../components/rentals/actual/ActualRentalsTable";
import { ApiResponse } from "../../types/common";


interface Props {
    documentTitle: string;
  }



const ActualRentals = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    
    const [data1, setData1] = useState<ApiResponse>(); //all pending rentals
    const [data2, setData2] = useState<ApiResponse>(); //cars basic data (with banned)
    const [data3, setData3] = useState<ApiResponse>(); //users data (with banned)

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    

    useEffect(() => {
      const getData = async () => {   
       
      
      const res1 = await fetchData(`${BACKEND_URL}/rentals/pending`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);
      if(res1.status === 'success' && Array.isArray(res1.data) && res1.data.length > 0) {
        const res2 = await fetchData(`${BACKEND_URL}/cars/?basicdata=true&showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData2(res2);
        if(res2.status === 'success') {
          const res3 = await fetchData(`${BACKEND_URL}/users/?showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
          setData3(res3);
        }
      }

      setLoading(false)
      }
      getData()
    }, [])

    return (
      <>
      <Breadcrumb pageName="Bieżące wypożyczenia wszystkich użytkowników" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <ActualRentalsTable pendingRentals={data1?.data} carsData={data2?.data} usersData={data3?.data} /> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      
      </>
    );
  };
  
  export default ActualRentals;