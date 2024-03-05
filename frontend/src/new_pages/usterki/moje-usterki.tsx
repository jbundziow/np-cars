import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";
import { ApiResponse, PaginationType } from "../../types/common";
import MyFaultsTable from "../../components/faults/my_faults/MyFaultsTable";
import useAuth from "../../hooks/useAuth";

interface Props {
    documentTitle: string;
  }


const MyFaults = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const { auth } = useAuth();


    const [data1, setData1] = useState<ApiResponse>();  //all faults of user
    const [data2, setData2] = useState<ApiResponse>();  //all cars basic data
  
    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(1) //current page for pagination
    const [paginationData, setPaginationData] = useState<PaginationType>({totalCount: 1, totalPages: 1, currentPage: 1, hasPreviousPage: false, hasNextPage: false}) //pagination data
      
      useEffect(() => {
        const getData = async () => {   

        const res1 = await fetchData(`${DOMAIN_NAME}/faults/users/${auth.userID}?pagenumber=${currentPage}&pagesize=5&sortfromoldest=false`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        if(res1.pagination) {setPaginationData(res1.pagination)}
        setData1(res1);
        if(res1.status === 'success') {
          const res2 = await fetchData(`${DOMAIN_NAME}/cars?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
          setData2(res2);
        }
  
  
        setLoading(false)
        }
        getData()
      }, [currentPage])


    return (
      <>
      <Breadcrumb pageName="Usterki zgłoszone przeze mnie" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <MyFaultsTable faultsData={data1?.data} carsData={data2?.data} setCurrentPage={(val: number) => setCurrentPage(val)} paginationData={paginationData}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      
      </>
    );
  };
  
  export default MyFaults;