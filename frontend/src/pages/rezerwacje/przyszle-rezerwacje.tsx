import { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import { BACKEND_URL } from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";
import FutureReservationsTable from "../../components/reservations/future_reservations/FutureReservationsTable";
import { ApiResponse } from "../../types/common";
import formatDate from "../../utilities/formatDate";



interface Props {
    documentTitle: string;
  }



const FutureReservations = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    

    const [data1, setData1] = useState<ApiResponse>();  //future reservations
    const [data2, setData2] = useState<ApiResponse>();  //all cars basic data
    const [data3, setData3] = useState<ApiResponse>();  //users data

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    


    useEffect(() => {
      const getData = async () => {   
      const filtersQuery = encodeURIComponent(JSON.stringify({reservationDatesRange_from: formatDate(new Date())})); //future reservations
      const res1 = await fetchData(`${BACKEND_URL}/reservations/?filters=${filtersQuery}&pagenumber=1&sortby=dateFrom&sortorder=ASC&pagesize=9999`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);
      if(res1.status === 'success') {
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
      <Breadcrumb pageName="Zestawienie przyszłych rezerwacji" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <FutureReservationsTable reservationsData={data1?.data} allCarsBasicData={data2?.data} usersData={data3?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default FutureReservations;