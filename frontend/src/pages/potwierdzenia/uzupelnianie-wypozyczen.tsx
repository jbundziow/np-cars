import { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";
import { ApiResponse } from "../../types/common";
import RentalsGapsTable from "../../components/confirm/rentals/RentalsGapsTable";



interface Props {
    documentTitle: string;
  }



const RentalsGapes = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    

    const [data1, setData1] = useState<ApiResponse>();  //all cars basic data
    const [data2, setData2] = useState<ApiResponse>();  //gaps data

    const [failData, setFailData] = useState<ApiResponse>();
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    


    useEffect(() => {
      const getData = async () => {  
        const res1 = await fetchData(`${DOMAIN_NAME}/cars?basicdata=true&showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData1(res1);
        if(res1.status === 'success') {
          const res2 = await fetchData(`${DOMAIN_NAME}/rentals/gaps?carid=all&excludeonerental=false`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
          setData2(res2);
        }
        setLoading(false)
      }
      getData()
    }, [])


    return (
      <>
      <Breadcrumb pageName="Uzupełnianie wypożyczeń" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <RentalsGapsTable allCarsBasicData={data1?.data} rentalsGapsData={data2?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default RentalsGapes;