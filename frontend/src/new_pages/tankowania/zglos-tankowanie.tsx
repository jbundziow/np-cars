import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import RefuelingsReportTable from '../../components/refuelings/report/RefuelingsReportTable';

interface Props {
    documentTitle: string;
  }

const ReportRefueling = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Zgłoś zatankowanie samochodu" />
      <RefuelingsReportTable/>
      </>
    );
  };
  
  export default ReportRefueling