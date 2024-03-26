import { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";
import { ApiResponse } from "../../types/common";
import { useParams } from "react-router-dom";
import EditRentalAsAdminForm from "../../components/rentals/edit/EditRentalAsAdminForm";



interface Props {
    documentTitle: string;
  }


const EditRentalAdminForm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const params = useParams();


    const [data1, setData1] = useState<ApiResponse>(); //rental data
    const [data2, setData2] = useState<ApiResponse>(); //places data //ALSO BANNED
    const [data3, setData3] = useState<ApiResponse>(); //car basic data //ALSO BANNED
    const [data4, setData4] = useState<ApiResponse>(); //users data //ALSO BANNED

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);

    
  

    useEffect(() => {
      const getData = async () => {   
       
      
      const res1 = await fetchData(`${DOMAIN_NAME}/rentals/${params.rentalid}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);
      if(res1.status==='success') {
        const res2 = await fetchData(`${DOMAIN_NAME}/cars/?basicdata=true&showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
        setData2(res2);
        if(res2.status==='success') {
          const res3 = await fetchData(`${DOMAIN_NAME}/users/?showbanned=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
          setData3(res3);
          if(res3.status==='success') {
            const res4 = await fetchData(`${DOMAIN_NAME}/places?filters=%7B%7D&pagenumber=1&sortby=createdAt&sortorder=ASC&pagesize=99999999`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
            setData4(res4);
          }
        }

      }


      setLoading(false)
      }
      getData()
    }, [])

    return (
      <>
      <Breadcrumb pageName="Edycja wypożyczenia" />
      {loading === true ? <Loader/> : (!isFail && !isError) ? <EditRentalAsAdminForm rentalData={data1?.data} carsData={data2?.data} usersData={data3?.data} placesData={data4?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default EditRentalAdminForm;