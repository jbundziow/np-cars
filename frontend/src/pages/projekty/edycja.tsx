import { useState, useEffect } from "react";
import Loader from "../../common/Loader/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import fetchData from "../../utilities/fetchData";
import { useParams } from "react-router-dom";
import { ApiResponse } from "../../types/common";
import EditPlaceFormContainer from "../../components/places/forms/EditPlaceFormContainer";



interface Props {
    documentTitle: string;
  }


const EditPlace = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);



    const params = useParams();

    const [data1, setData1] = useState<ApiResponse>();  //place data

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);
    
    useEffect(() => {
      const getData = async () => {   

      const res1 = await fetchData(`${DOMAIN_NAME}/places/${params.placeid}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      setData1(res1);


      setLoading(false)
      }
      getData()
    }, [])


    return (
      <>
      <Breadcrumb pageName="Dodaj nowy projekt" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <EditPlaceFormContainer place={data1?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      </>
    );
  };
  
  export default EditPlace;