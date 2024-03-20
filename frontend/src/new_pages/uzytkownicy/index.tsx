import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import Breadcrumb from '../../components/Breadcrumb';
import fetchData from '../../utilities/fetchData';
import OperationResult from '../../components/general/OperationResult';
import DOMAIN_NAME from "../../utilities/domainName";
import { ApiResponse } from "../../types/common";
import { useParams } from "react-router-dom";
import UserPage from "../../components/users/UserPage";

  interface Props {
      documentTitle: string;
  }



const UserMainpage = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);


  const params = useParams();

    const [data1, setData1] = useState<ApiResponse>();  //user data
    const [data2, setData2] = useState<ApiResponse>();  //<BarChart> data - distance for every month in specified year

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    const [filterValue, setFilterValue] = useState(2024); //year to <BarChart>
    
    useEffect(() => {
      const getData = async () => {   
       
      const res1 = await fetchData(`${DOMAIN_NAME}/users/${params.userid}?showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);
      if(res1.status === 'success') {
        const res2 = await fetchData(`${DOMAIN_NAME}/stats/users/${params.userid}/distance?year=${filterValue}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData2(res2)
      }

      setLoading(false)
      }
      getData()
    }, [params.userid, filterValue])

    

    return (
      <>
      <Breadcrumb pageName="Profil użytkownika" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <UserPage userData={data1?.data} statsData={data2?.data} filterValue={filterValue} setFilterValue={(value: number) => setFilterValue(value)} /> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
     
      </>
    );
  };
  
  export default UserMainpage