
import { useState, useEffect } from "react";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";
import { ApiResponse, PaginationType } from "../../types/common";
import Loader from "../../common/Loader";
import PlacesHistory from "../../components/places/history/PlacesHistory";



interface Props {
    documentTitle: string;
  }

const PlacesList = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    

    const [data1, setData1] = useState<ApiResponse>();  //places data from backend
    const [filters, setFilters] = useState<string>('%7B%7D'); //%7B%7D is an empty object {}
    const [currentPage, setCurrentPage] = useState<number>(1) //current page for pagination
    const [paginationData, setPaginationData] = useState<PaginationType>({totalCount: 1, totalPages: 1, currentPage: 1, hasPreviousPage: false, hasNextPage: false}) //pagination data


    const [failData, setFailData] = useState<ApiResponse>();
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    
    const [loadingTable, setLoadingTable] = useState<boolean>(true); //EVERY TIME WHEN updating table
    const [loadingData, setLoadingData] = useState<boolean>(true); //ONLY first fetching data

    useEffect(() => {
      const getData = async () => {
        setLoadingTable(true)
        
        const res1 = await fetchData(`${DOMAIN_NAME}/places?filters=${filters}&pagenumber=${currentPage}&pagesize=8`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData1(res1);
        if(res1.pagination) {setPaginationData(res1.pagination)}
        

        setLoadingTable(false)
        setLoadingData(false)
      }
      getData()
    }, [filters, currentPage])


    return (
      <>
      <Breadcrumb pageName="Lista wszystkich projektów" />

      {loadingData ? <Loader/> : (!isFail && !isError) ? <PlacesHistory placesData={data1?.data} setFilters={(val: string) => setFilters(val)} setCurrentPage={(val: number) => setCurrentPage(val)} paginationData={paginationData} loadingTable={loadingTable} filters={filters}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default PlacesList;