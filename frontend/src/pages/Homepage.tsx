import { useState, useEffect } from "react";
import { ApiResponse } from "../types/common";
import DOMAIN_NAME from "../utilities/domainName.ts";
import fetchData from "../utilities/fetchData.ts";
import OperationResult from "../components/general/OperationResult.tsx";
import Loader from "../common/Loader/Loader.tsx";
import useAuth from "../hooks/useAuth.tsx";
import HomepageComponent from "../components/homepage/HomepageComponent.tsx";

  interface Props {
      documentTitle: string;
  }



const Homepage = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);


    const { auth } = useAuth();
    const currentYear = new Date().getFullYear();


    const [data1, setData1] = useState<ApiResponse>();  //homepage user data
    const [data2, setData2] = useState(null);  //USD rates data
    const [data3, setData3] = useState(null);  //EUR rates data
    

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    
    useEffect(() => {
      const getData = async () => {   
       
      const res1 = await fetchData(`${DOMAIN_NAME}/stats/homepage/user/${auth.userID}/?year=${currentYear}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);

      const res2 = await fetch(`https://api.nbp.pl/api/exchangerates/rates/c/usd/today/?format=json`, {
        method: 'GET',
      });
      if(res2.status === 200) {
        const res2JSON = await res2.json();
        setData2(res2JSON)
      }

      const res3 = await fetch(`https://api.nbp.pl/api/exchangerates/rates/c/eur/today/?format=json`, {
        method: 'GET',
      });
      if(res3.status === 200) {
        const res3JSON = await res3.json();
        setData3(res3JSON)
      }



      setLoading(false)
      }
      getData()
    }, [])


    return (
      <>
      {loading === true ? <Loader/> : (!isFail && !isError) ? <HomepageComponent homepageData={data1?.data} usdRates={data2} euroRates={data3}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
     
      </>
    );
  };
  
export default Homepage


