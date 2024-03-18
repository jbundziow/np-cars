import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";
import { ApiResponse, PaginationType } from "../../types/common";
import RefuelingsConfirmTable from "../../components/confirm/refuelings/RefuelingsConfirmTable";



interface Props {
    documentTitle: string;
  }



const RefuelingsConfirm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    

    const [data1, setData1] = useState<ApiResponse>();  //all cars basic data
    const [data2, setData2] = useState<ApiResponse>();  //all unconfirmed refuelings
    const [data3, setData3] = useState<ApiResponse>();  //all users data

    const [failData, setFailData] = useState<ApiResponse>();
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);


    const [currentPage, setCurrentPage] = useState<number>(1) //current page for pagination
    const [paginationData, setPaginationData] = useState<PaginationType>({totalCount: 1, totalPages: 1, currentPage: 1, hasPreviousPage: false, hasNextPage: false}) //pagination data
    const [loadingTable, setLoadingTable] = useState<boolean>(true); //EVERY TIME WHEN updating table
    const [loadingData, setLoadingData] = useState<boolean>(true); //ONLY first fetching data
    


    useEffect(() => {
      const getData = async () => {  
        setLoadingTable(true)

        const res1 = await fetchData(`${DOMAIN_NAME}/cars?basicdata=true&showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData1(res1);
        if(res1.status === 'success') {
          const res2 = await fetchData(`${DOMAIN_NAME}/refuelings?filters=%7B%22carIDs%22%3A%5B%5D%2C%22userIDs%22%3A%5B%5D%2C%22carMileage_from%22%3A%22%22%2C%22carMileage_to%22%3A%22%22%2C%22numberOfLiters_from%22%3A%22%22%2C%22numberOfLiters_to%22%3A%22%22%2C%22averageConsumption_from%22%3A%22%22%2C%22averageConsumption_to%22%3A%22%22%2C%22costBrutto_from%22%3A%22%22%2C%22costBrutto_to%22%3A%22%22%2C%22costPerLiter_from%22%3A%22%22%2C%22costPerLiter_to%22%3A%22%22%2C%22invoiceNumber%22%3A%22%22%2C%22isAcknowledgedByModerator%22%3Afalse%2C%22isAcknowledgedByModeratorIDs%22%3A%5B%5D%2C%22lastEditedByModeratorIDs%22%3A%5B%5D%7D&pagenumber=${currentPage}&pagesize=8&sortfromoldest=false`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)}) //where isAcknowledgedByModerator = false(null)
          if(res2.pagination) {setPaginationData(res2.pagination)};
          setData2(res2);
          if(res2.status === 'success') {
            const res3 = await fetchData(`${DOMAIN_NAME}/users/?showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
            setData3(res3);
          }
        }


      setLoadingTable(false)
      setLoadingData(false)
      }
      getData()
    }, [currentPage])


    return (
      <>
      <Breadcrumb pageName="Tankowania użytkowników wymagające potwierdzenia" />

      {loadingData ? <Loader/> : (!isFail && !isError) ? <RefuelingsConfirmTable allCarsBasicData={data1?.data} refuelingsData={data2?.data} usersData={data3?.data} setCurrentPage={(val: number) => setCurrentPage(val)} paginationData={paginationData} loadingTable={loadingTable}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default RefuelingsConfirm;