import { useState, useEffect } from "react";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';
import DOMAIN_NAME from "../../utilities/domainName";
import RentalsTable from "../../components/rentals/rent/RentalsTable";
import fetchData from "../../utilities/fetchData";
import { ApiResponse } from "../../types/common";

type carBasicData = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
}

interface Props {
    documentTitle: string;
  }



const RentACar = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const [data1, setData1] = useState<ApiResponse>();

    const [failData, setFailData] = useState<ApiResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [isFail, setFail] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false);


    useEffect(() => {
      const getData = async () => {   
      
      const res1 = await fetchData(`${DOMAIN_NAME}/cars/?basicdata=true`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      
      if(res1.status==='success') {
      const carIDsArr: number[] = [];
      res1.data.forEach((carData: carBasicData) => carIDsArr.push(carData.id))

      for await (const [index, id] of carIDsArr.entries()) {
      const res2 = await fetchData(`${DOMAIN_NAME}/reservations/cars/${id}?time=future`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
      res1.data[index].numberOfFutureReservations = res2.data.reservations.length;
      }
      setData1(res1);
      }
      

      setLoading(false)
      }
      getData()
    }, [])




    return (
      <>
      <Breadcrumb pageName="Wypożycz samochód" />

      {loading === true ? <Loader/> : (!isFail && !isError) ? <RentalsTable data={data1?.data}/> : (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      
      </>
    );
  };
  
  export default RentACar;
