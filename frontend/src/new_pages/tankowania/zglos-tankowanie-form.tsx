import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import RefuelingsReportTable from '../../components/refuelings/report/RefuelingsReportTable';
import {useParams} from "react-router-dom";
          

interface Props {
    documentTitle: string;
  }

const ReportRefueling = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const {id} = useParams();

    return (
      <>
      <Breadcrumb pageName="Zgłoś zatankowanie samochodu" />
      <RefuelingsReportTable/>
      <p>Chcesz zgłosić zatankowania auta o id: {id}</p>
      </>
    );
  };
  
  export default ReportRefueling