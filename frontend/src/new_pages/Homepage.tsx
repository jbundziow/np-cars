import { useState, useEffect } from "react";
import { ApiResponse } from "../types/common";
import DOMAIN_NAME from "../utilities/domainName.ts";
import fetchData from "../utilities/fetchData.ts";
import OperationResult from "../components/general/OperationResult.tsx";
import Loader from "../common/Loader/index.tsx";
import useAuth from "../hooks/useAuth.tsx";
import HomepageComponent from "../components/homepage/HomepageComponent.tsx";

  interface Props {
      documentTitle: string;
  }



const Homepage = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);


    const { auth } = useAuth();


    const [data1, setData1] = useState<ApiResponse>();  //user data


    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    
    useEffect(() => {
      const getData = async () => {   
       
      const res1 = await fetchData(`${DOMAIN_NAME}/users/${auth.userID}/?showbanned=false`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);


      setLoading(false)
      }
      getData()
    }, [])


    return (
      <>
      {loading === true ? <Loader/> : (!isFail && !isError) ? <HomepageComponent userData={data1?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
     
      </>
    );
  };
  
export default Homepage


