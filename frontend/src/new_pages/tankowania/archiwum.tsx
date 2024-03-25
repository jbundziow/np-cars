import { useState, useEffect } from "react";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";
import { ApiResponse, PaginationType } from "../../types/common";
import Loader from "../../common/Loader";
import RefuelingsHistory from "../../components/refuelings/history/RefuelingsHistory";


interface Props {
    documentTitle: string;
  }



const RefuelingArchive = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const params = new URLSearchParams(window.location.search);

    

    const [data1, setData1] = useState<ApiResponse>();  //refuelings data from backend
    const [data2, setData2] = useState<ApiResponse>();  //all cars basic data
    const [data3, setData3] = useState<ApiResponse>();  //all users data
    const [filters, setFilters] = useState<string>(params.get('filters') || '%7B%7D'); //%7B%7D is an empty object {}
    const [currentPage, setCurrentPage] = useState<number>(Number(params.get('page')) || 1) //current page for pagination
    const [paginationData, setPaginationData] = useState<PaginationType>({totalCount: 1, totalPages: 1, currentPage: 1, hasPreviousPage: false, hasNextPage: false}) //pagination data

    //additional refueling data stats
    const [totalNumberOfLiters, setTotalNumberOfLiters] = useState<number>(0);
    const [averageConsumption, setAverageConsumption] = useState<number | null>(null);
    const [totalCostBrutto, setTotalCostBrutto] = useState<number>(0);
    const [averageCostPerLiter, setAverageCostPerLiter] = useState<number | null>(null);


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
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        

        const res1 = await fetchData(`${DOMAIN_NAME}/refuelings?filters=${filters}&pagenumber=${currentPage}&pagesize=8`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData1(res1);
        if(res1.pagination) {setPaginationData(res1.pagination)}

        if(res1.totalNumberOfLiters) {setTotalNumberOfLiters(res1.totalNumberOfLiters)}
        if(res1.averageConsumption) {setAverageConsumption(res1.averageConsumption)} else {setAverageConsumption(null)}
        if(res1.totalCostBrutto) {setTotalCostBrutto(res1.totalCostBrutto)}
        if(res1.averageCostPerLiter) {setAverageCostPerLiter(res1.averageCostPerLiter)}
        
        if(res1.status==='success') {
          const res2 = await fetchData(`${DOMAIN_NAME}/cars/?basicdata=true&showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
          setData2(res2);
          if(res2.status==='success') {
            const res3 = await fetchData(`${DOMAIN_NAME}/users?showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
            setData3(res3);
          }
        }

      setLoadingTable(false)
      setLoadingData(false)
      }
      getData()
    }, [filters, currentPage])


    return (
      <>
      <Breadcrumb pageName="Archiwum tankowań samochodów" />

      {loadingData ? <Loader/> : (!isFail && !isError) ? <RefuelingsHistory allCarsBasicData={data2?.data} refuelingsData={data1?.data} usersData={data3?.data} setFilters={(val: string) => setFilters(val)} setCurrentPage={(val: number) => setCurrentPage(val)} paginationData={paginationData} loadingTable={loadingTable} filters={filters} totalNumberOfLiters={totalNumberOfLiters} averageConsumption={averageConsumption} totalCostBrutto={totalCostBrutto} averageCostPerLiter={averageCostPerLiter}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default RefuelingArchive;