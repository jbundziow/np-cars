import { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";
import useAuth from '../../hooks/useAuth'
import { ApiResponse, PaginationType } from "../../types/common";
import MyRefuelingsTable from "../../components/refuelings/my_refuelings/MyRefuelingsTable";



interface Props {
    documentTitle: string;
  }



const MyRefuelings = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    

    const [data1, setData1] = useState<ApiResponse>();  //refuelings data of user
    const [data2, setData2] = useState<ApiResponse>();  //all cars basic data

    const [paginationData, setPaginationData] = useState<PaginationType>({totalCount: 1, totalPages: 1, currentPage: 1, hasPreviousPage: false, hasNextPage: false}) //pagination data
    const [currentPage, setCurrentPage] = useState<number>(1)

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    const { auth }= useAuth();


    useEffect(() => {
      const getData = async () => {   

      const res1 = await fetchData(`${DOMAIN_NAME}/refuelings?filters=%7B%22userIDs%22%3A%5B${auth.userID}%5D%7D&pagenumber=${currentPage}&sortby=createdAt&sortorder=DESC&pagesize=8`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);
      if(res1.pagination) {setPaginationData(res1.pagination)}
      if(res1.status==='success') {
        const res2 = await fetchData(`${DOMAIN_NAME}/cars?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData2(res2);
      }


      setLoading(false)
      }
      getData()
    }, [])


    return (
      <>
      <Breadcrumb pageName="Moje tankowania" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <MyRefuelingsTable refuelingsData={data1?.data} allCarsBasicData={data2?.data} paginationData={paginationData} setCurrentPage={(value: number) => setCurrentPage(value)}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default MyRefuelings;