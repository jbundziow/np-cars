import { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import Breadcrumb from '../../components/Breadcrumb';
import fetchData from '../../utilities/fetchData';
import OperationResult from '../../components/general/OperationResult';
import { BACKEND_URL } from "../../utilities/domainName";
import { ApiResponse } from "../../types/common";
import { useParams } from "react-router-dom";
import UserPage from "../../components/users/UserPage";

  interface Props {
      documentTitle: string;
  }



const UserMainpage = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);


  const params = useParams();
  const currentYear = new Date().getFullYear();

    const [data1, setData1] = useState<ApiResponse>();  //user data
    const [data2, setData2] = useState<ApiResponse>();  //user total stats (all existing data)
    const [data3, setData3] = useState<ApiResponse>();  //<BarChart> data - distance for every month in specified year
    const [data4, setData4] = useState<ApiResponse>();  //user total stats in current year
    const [data5, setData5] = useState<ApiResponse>();  //user places distance stats total
    const [data6, setData6] = useState<ApiResponse>();  //user car types distance stats in current year
    const [data7, setData7] = useState<ApiResponse>();  //user favourite car in current year
    const [data8, setData8] = useState<ApiResponse>();  //user favourite place in current year

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    const [filterValue, setFilterValue] = useState(2024); //year to <BarChart>


    //bar chart data
    useEffect(() => {
      const getData = async () => {   
        const res3 = await fetchData(`${BACKEND_URL}/stats/users/${params.userid}/distance?year=${filterValue}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData3(res3)
      }
      getData()
    }, [params.userid, filterValue])



    //other data
    useEffect(() => {
      const getData = async () => {  
      setLoading(true)
       
      const res1 = await fetchData(`${BACKEND_URL}/users/${params.userid}?showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);
      
      const res2 = await fetchData(`${BACKEND_URL}/stats/users/${params.userid}/total`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData2(res2)
      
      const res4 = await fetchData(`${BACKEND_URL}/stats/users/${params.userid}/total/year/${currentYear}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData4(res4)
      
      const res5 = await fetchData(`${BACKEND_URL}/stats/users/${params.userid}/distance/places`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData5(res5)
      
      const res6 = await fetchData(`${BACKEND_URL}/stats/users/${params.userid}/distance/bycartypes?year=${currentYear}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData6(res6)
      
      const res7 = await fetchData(`${BACKEND_URL}/stats/users/${params.userid}/favourite/car?year=${currentYear}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData7(res7)
      
      const res8 = await fetchData(`${BACKEND_URL}/stats/users/${params.userid}/favourite/place?year=${currentYear}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData8(res8)

      if(res1.status === 'success' && res2.status === 'success' && res4.status === 'success' && res5.status === 'success' && res6.status === 'success' && res7.status === 'success' && res8.status === 'success') {
      setLoading(false)
      }
      }
      getData()
    }, [params.userid])

    
    return (
      <>
      <Breadcrumb pageName="Profil użytkownika" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <UserPage userData={data1?.data} totalData={data2?.data} distanceYearData={data3?.data} totalYearData={data4?.data} distancePlacesData={data5?.data} distanceCarTypesYearData={data6?.data} favouriteCarInYearData={data7?.data} favouritePlaceInYearData={data8?.data} filterValue={filterValue} setFilterValue={(value: number) => setFilterValue(value)} /> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
     
      </>
    );
  };
  
  export default UserMainpage