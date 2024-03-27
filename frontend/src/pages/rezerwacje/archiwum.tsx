import { useState, useEffect } from "react";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import { BACKEND_URL } from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";
import { ApiResponse, PaginationType } from "../../types/common";
import ReservationsHistory from "../../components/reservations/history/ReservationsHistory";
import Loader from "../../common/Loader/Loader";



interface Props {
    documentTitle: string;
  }

const ReservationArchive = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const params = new URLSearchParams(window.location.search);
    

    

    const [data1, setData1] = useState<ApiResponse>();  //reservations data from backend
    const [data2, setData2] = useState<ApiResponse>();  //all cars basic data
    const [data3, setData3] = useState<ApiResponse>();  //all users data
    const [filters, setFilters] = useState<string>(params.get('filters') || '%7B%7D'); //%7B%7D is an empty object {}
    const [currentPage, setCurrentPage] = useState<number>(Number(params.get('page')) || 1) //current page for pagination
    const [paginationData, setPaginationData] = useState<PaginationType>({totalCount: 1, totalPages: 1, currentPage: 1, hasPreviousPage: false, hasNextPage: false}) //pagination data

    const [sortBy, setSortBy] = useState<string>(params.get('sortby') || 'createdAt');
    const [sortOrder, setSortOrder] = useState<string>(params.get('sortorder') || 'DESC');
    const [pageSize, setPageSize] = useState<number>(Number(params.get('pagesize')) || 8);


    const [failData, setFailData] = useState<ApiResponse>();
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    
    const [loadingTable, setLoadingTable] = useState<boolean>(true); //EVERY TIME WHEN updating table
    const [loadingData, setLoadingData] = useState<boolean>(true); //ONLY first fetching data

    useEffect(() => {
      const getData = async () => {
        setLoadingTable(true)

        params.set('page', currentPage.toString())
        params.set('filters', filters)
        params.set('sortby', sortBy)
        params.set('sortorder', sortOrder)
        params.set('pagesize', pageSize.toString())

        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);


        const res1 = await fetchData(`${BACKEND_URL}/reservations?filters=${filters}&pagenumber=${currentPage}&sortby=${sortBy}&sortorder=${sortOrder}&pagesize=${pageSize}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData1(res1);
        if(res1.pagination) {setPaginationData(res1.pagination)}
        
        if(res1.status==='success') {
          const res2 = await fetchData(`${BACKEND_URL}/cars/?basicdata=true&showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
          setData2(res2);
          if(res2.status==='success') {
            const res3 = await fetchData(`${BACKEND_URL}/users?showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
            setData3(res3);
          }
        }
        

      setLoadingTable(false)
      setLoadingData(false)
      }
      getData()
    }, [filters, currentPage, sortBy, sortOrder, pageSize])


    return (
      <>
      <Breadcrumb pageName="Archiwum rezerwacji" />

      {loadingData ? <Loader/> : (!isFail && !isError) ? <ReservationsHistory allCarsBasicData={data2?.data} reservationsData={data1?.data} usersData={data3?.data} setFilters={(val: string) => setFilters(val)} setCurrentPage={(val: number) => setCurrentPage(val)} paginationData={paginationData} loadingTable={loadingTable} filters={filters} setSortBy={(value: string)=> setSortBy(value)} sortBy={sortBy} setSortOrder={(value: string)=> setSortOrder(value)} sortOrder={sortOrder} setPageSize={(value: number)=> setPageSize(value)} pageSize={pageSize}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default ReservationArchive;