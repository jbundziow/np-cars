import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";
import { ApiResponse } from "../../types/common";
import AddNewRentalAsAdminForm from "../../components/rentals/rent/AddNewRentalAsAdminForm";



interface Props {
    documentTitle: string;
  }


const MakeARentalAdminForm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);




    const [data1, setData1] = useState<ApiResponse>(); //places data
    const [data2, setData2] = useState<ApiResponse>(); //car basic data
    const [data3, setData3] = useState<ApiResponse>(); //users data

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    
  

    useEffect(() => {
      const getData = async () => {   
       
      
      const res1 = await fetchData(`${DOMAIN_NAME}/places?filters=%7B%22projectCode%22%3A%22%22%2C%22placeName%22%3A%22%22%2C%22projectName%22%3A%22%22%2C%22status%22%3A%22active%22%7D&pagenumber=1&sortby=createdAt&sortorder=ASC&pagesize=99999999`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);
      if(res1.status==='success') {
        const res2 = await fetchData(`${DOMAIN_NAME}/cars/?basicdata=true&showbanned=false`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData2(res2);
        if(res1.status==='success') {
          const res3 = await fetchData(`${DOMAIN_NAME}/users/?showbanned=false`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
          setData3(res3);
        }

      }


      setLoading(false)
      }
      getData()
    }, [])

    return (
      <>
      <Breadcrumb pageName="Dokonaj dowolnego wypożyczenia jako administrator" />
      {loading === true ? <Loader/> : (!isFail && !isError) ? <AddNewRentalAsAdminForm placesData={data1?.data} carsData={data2?.data} usersData={data3?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default MakeARentalAdminForm;