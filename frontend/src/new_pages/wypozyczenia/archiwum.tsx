import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";
import RentalsHistory from "../../components/rentals/history/RentalsHistory";
import { ApiResponse, PaginationType } from "../../types/common";



interface Props {
    documentTitle: string;
  }

const RentalsArchive = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    

    const [data1, setData1] = useState<ApiResponse>();  //rentals data from backend
    const [data2, setData2] = useState<ApiResponse>();  //all cars basic data
    const [data3, setData3] = useState<ApiResponse>();  //all users data
    const [data4, setData4] = useState<ApiResponse>();  //all places data
    const [filters, setFilters] = useState<string>('%7B%7D'); //%7B%7D is an empty object {}
    const [currentPage, setCurrentPage] = useState<number>(1) //current page for pagination
    const [totalDistance, setTotalDistance] = useState<number>(0) //total distance from all records
    const [paginationData, setPaginationData] = useState<PaginationType>({totalCount: 1, totalPages: 1, currentPage: 1, hasPreviousPage: false, hasNextPage: false}) //pagination data


    const [failData, setFailData] = useState<ApiResponse>();
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    

    const [loadingTable, setLoadingTable] = useState<boolean>(true); //EVERY TIME WHEN updating table
    const [loadingData, setLoadingData] = useState<boolean>(true); //ONLY first fetching data


    useEffect(() => {
      const getData = async () => {
        setLoadingTable(true)

        const res1 = await fetchData(`${DOMAIN_NAME}/rentals?filters=${filters}&pagenumber=${currentPage}&pagesize=8`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData1(res1);
        if(res1.pagination) {setPaginationData(res1.pagination)}
        if(res1.totalDistance !== undefined && res1.totalDistance !== null) setTotalDistance(res1.totalDistance)
        
        if(res1.status==='success') {
          const res2 = await fetchData(`${DOMAIN_NAME}/cars/?basicdata=true&showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
          setData2(res2);
          if(res2.status==='success') {
            const res3 = await fetchData(`${DOMAIN_NAME}/users?showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
            setData3(res3);
            if(res3.status==='success') {
              const res4 = await fetchData(`${DOMAIN_NAME}/places?showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
              setData4(res4);
              }
          }
        }

      setLoadingTable(false)
      setLoadingData(false)
      }
      getData()
    }, [filters, currentPage])


    return (
      <>
      <Breadcrumb pageName="Archiwum wypożyczeń" />

      {loadingData ? <Loader/> : (!isFail && !isError) ? <RentalsHistory allCarsBasicData={data2?.data} rentalsData={data1?.data} usersData={data3?.data} placesData={data4?.data} setFilters={(val: string) => setFilters(val)} setCurrentPage={(val: number) => setCurrentPage(val)} paginationData={paginationData} totalDistance={totalDistance} loadingTable={loadingTable}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default RentalsArchive;