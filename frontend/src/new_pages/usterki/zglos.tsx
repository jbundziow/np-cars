import { useState, useEffect } from "react";
import Breadcrumb from '../../components/Breadcrumb';
import FaultsReportTable from '../../components/faults/report/FaultsReportTable';
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";

interface Props {
    documentTitle: string;
  }

const ReportFault = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const [data, setData] = useState<{ result: any } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:3000/cars/?basicdata=true`
          );
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          let actualData = await response.json();
          setData(actualData);
          setError(null);
        } catch(err: any) {
          setError(err.message);
          setData(null);
        } finally {
          setLoading(false);
          
        }  
      }
      getData()
    }, [])



    return (
      <>
      <Breadcrumb pageName="Zgłoś usterkę" />

      {loading === true ? <Loader/> : error === null ? <FaultsReportTable data={data}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      
      </>
    );
  };
  
  export default ReportFault